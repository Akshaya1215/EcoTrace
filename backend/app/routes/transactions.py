from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId
from app.database import db, clean_db_doc, clean_db_list

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("")
async def create_transaction(payload: dict):
    listing_id = payload.get("listingId")
    seller_id = payload.get("sellerId")
    recycler_id = payload.get("recyclerId")
    amount = payload.get("amount")
    
    if not all([listing_id, seller_id, recycler_id, amount]):
        raise HTTPException(status_code=400, detail="Missing required transaction parameters")
        
    try:
        listing = db.listings.find_one({"_id": listing_id})
        if not listing:
            raise HTTPException(status_code=404, detail="Listing not found")
            
        txn_doc = {
            "_id": f"TXN-{str(ObjectId())[:8].upper()}",
            "listingId": listing_id,
            "sellerId": seller_id,
            "recyclerId": recycler_id,
            "amount": float(amount),
            "currency": "INR",
            "status": "PENDING",
            "deviceName": listing.get("deviceName"),
            "createdAt": datetime.utcnow().isoformat(),
            "completedAt": None
        }
        
        db.transactions.insert_one(txn_doc)
        
        # Link listing to transaction and update status to PAYMENT_PENDING
        db.listings.update_one(
            {"_id": listing_id},
            {"$set": {
                "status": "PAYMENT_PENDING",
                "transactionId": txn_doc["_id"]
            }}
        )
        
        return {"success": True, "transaction": clean_db_doc(txn_doc)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create transaction: {str(e)}")

@router.get("")
async def get_all_transactions():
    try:
        txns = db.transactions.find()
        txns = sorted(txns, key=lambda x: x.get("createdAt", ""), reverse=True)
        return clean_db_list(txns)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch transactions: {str(e)}")

@router.get("/seller/{seller_id}")
async def get_seller_transactions(seller_id: str):
    try:
        txns = db.transactions.find({"sellerId": seller_id})
        txns = sorted(txns, key=lambda x: x.get("createdAt", ""), reverse=True)
        return clean_db_list(txns)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch seller transactions: {str(e)}")

@router.get("/recycler/{recycler_id}")
async def get_recycler_transactions(recycler_id: str):
    try:
        txns = db.transactions.find({"recyclerId": recycler_id})
        txns = sorted(txns, key=lambda x: x.get("createdAt", ""), reverse=True)
        return clean_db_list(txns)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch recycler transactions: {str(e)}")

@router.put("/{txn_id}/complete")
async def complete_transaction(txn_id: str):
    try:
        txn = db.transactions.find_one({"_id": txn_id})
        if not txn:
            raise HTTPException(status_code=404, detail="Transaction not found")
            
        completed_time = datetime.utcnow().isoformat()
        db.transactions.update_one(
            {"_id": txn_id},
            {"$set": {
                "status": "COMPLETED",
                "completedAt": completed_time
            }}
        )
        
        # Advance listing status to COMPLETED
        db.listings.update_one(
            {"_id": txn.get("listingId")},
            {"$set": {
                "status": "COMPLETED",
                "completedAt": completed_time
            }}
        )
        
        # Calculate environmental impact rewards
        listing = db.listings.find_one({"_id": txn.get("listingId")})
        if listing:
            # Update seller impact record
            seller_id = listing.get("sellerId")
            impact = listing.get("environmentalImpact", {})
            ewaste_kg = float(impact.get("ewasteDivertedKg", 0))
            co2_kg = float(impact.get("co2AvoidedKg", 0))
            energy_kwh = float(impact.get("energySavedKwh", 0))
            
            # Simple reward points: 10 points per kg ewaste + 5 points per kg co2 avoided
            pts_earned = int((ewaste_kg * 10) + (co2_kg * 5))
            
            db.impact_records.update_one(
                {"sellerId": seller_id},
                {
                    "$inc": {
                        "totalCO2Avoided": co2_kg,
                        "totalEWasteRecycled": ewaste_kg,
                        "totalEnergySaved": energy_kwh,
                        "totalPoints": pts_earned,
                        "devicesRecycled": 1
                    },
                    "$set": {
                        "lastUpdated": datetime.utcnow().isoformat()
                    }
                },
                upsert=True
            )
            
        return {"success": True, "status": "COMPLETED"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to complete transaction: {str(e)}")
