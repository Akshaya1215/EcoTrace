from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId
from app.database import db, clean_db_doc, clean_db_list

router = APIRouter(prefix="/pickups", tags=["Pickups"])

@router.post("")
async def schedule_pickup(payload: dict):
    listing_id = payload.get("listingId")
    seller_id = payload.get("sellerId")
    recycler_id = payload.get("recyclerId")
    pickup_address = payload.get("pickupAddress")
    pickup_date = payload.get("pickupDate")
    pickup_time = payload.get("pickupTime")
    
    if not all([listing_id, recycler_id, pickup_address, pickup_date, pickup_time]):
        raise HTTPException(status_code=400, detail="Missing required pickup details")
        
    try:
        # Check listing
        listing = db.listings.find_one({"_id": listing_id})
        if not listing:
            raise HTTPException(status_code=404, detail="Listing not found")
            
        # Get seller_id from listing if not provided
        if not seller_id:
            seller_id = listing.get("sellerId")
            
        pickup_doc = {
            "_id": str(ObjectId()),
            "listingId": listing_id,
            "sellerId": seller_id,
            "recyclerId": recycler_id,
            "pickupAddress": pickup_address,
            "pickupDate": pickup_date,
            "pickupTime": pickup_time,
            "status": "SCHEDULED",
            "createdAt": datetime.utcnow().isoformat()
        }
        
        # Save pickup
        db.pickups.insert_one(pickup_doc)
        
        # Update listing status and pickupDetails
        db.listings.update_one(
            {"_id": listing_id},
            {"$set": {
                "status": "PICKUP_SCHEDULED",
                "pickupDetails": {
                    "pickupId": pickup_doc["_id"],
                    "pickupDate": pickup_date,
                    "pickupTime": pickup_time,
                    "pickupAddress": pickup_address
                }
            }}
        )
        
        return {"success": True, "pickupId": pickup_doc["_id"], "status": "PICKUP_SCHEDULED"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to schedule pickup: {str(e)}")

@router.get("/listing/{listing_id}")
async def get_pickup_by_listing(listing_id: str):
    try:
        pickup = db.pickups.find_one({"listingId": listing_id})
        if not pickup:
            raise HTTPException(status_code=404, detail="Pickup details not found for listing")
        return clean_db_doc(pickup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch pickup details: {str(e)}")
