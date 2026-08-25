from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId
from app.database import db, clean_db_doc, clean_db_list

router = APIRouter(prefix="/users", tags=["Users & Profiles"])

@router.get("")
async def get_users():
    # Fetch all user accounts (mocking system users)
    try:
        users = db.users.find()
        # Seed users if empty
        if not users:
            default_users = [
                {
                    "_id": "seller_demo_001",
                    "name": "Demo Seller",
                    "email": "seller@ecotrace.com",
                    "role": "seller",
                    "createdAt": "2024-01-01T00:00:00"
                },
                {
                    "_id": "corporate_demo_001",
                    "name": "EcoCorp Solutions",
                    "email": "sustainability@ecocorp.com",
                    "role": "corporate",
                    "createdAt": "2024-01-01T00:00:00"
                },
                {
                    "_id": "recycler_demo_001",
                    "name": "GreenCycle Pvt Ltd",
                    "email": "contact@greencycle.com",
                    "role": "recycler",
                    "status": "VERIFIED",
                    "createdAt": "2024-01-01T00:00:00"
                }
            ]
            for u in default_users:
                db.users.insert_one(u)
            users = db.users.find()
        return clean_db_list(users)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch users: {str(e)}")

@router.get("/recyclers")
async def get_recyclers():
    try:
        # Recyclers are users with role "recycler"
        # Or we can maintain them separately in a recyclers collection
        recyclers = db.recyclers.find()
        if not recyclers:
            # Seed default recyclers
            default_recyclers = [
                {
                    "_id": "recycler_demo_001",
                    "name": "GreenCycle Pvt Ltd",
                    "email": "contact@greencycle.com",
                    "location": "Chennai, TN",
                    "status": "VERIFIED",
                    "devices": 234,
                    "revenue": 124847,
                    "joined": "2024-01-01"
                },
                {
                    "_id": "recycler_demo_002",
                    "name": "EcoMetal Recyclers",
                    "email": "info@ecometal.in",
                    "location": "Mumbai, MH",
                    "status": "PENDING",
                    "devices": 0,
                    "revenue": 0,
                    "joined": "2024-02-10"
                },
                {
                    "_id": "recycler_demo_003",
                    "name": "Urban Scrap Solutions",
                    "email": "scrap@urban.org",
                    "location": "Delhi, DL",
                    "status": "VERIFIED",
                    "devices": 45,
                    "revenue": 6700,
                    "joined": "2024-01-20"
                }
            ]
            for r in default_recyclers:
                db.recyclers.insert_one(r)
            recyclers = db.recyclers.find()
            
        return clean_db_list(recyclers)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch recyclers: {str(e)}")

@router.put("/recyclers/{recycler_id}/verify")
async def verify_recycler(recycler_id: str, payload: dict):
    status = payload.get("status")
    if status not in ["PENDING", "VERIFIED", "REJECTED"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be PENDING, VERIFIED or REJECTED")
        
    try:
        res = db.recyclers.update_one(
            {"_id": recycler_id},
            {"$set": {"status": status}}
        )
        if res.matched_count == 0:
            raise HTTPException(status_code=404, detail="Recycler not found")
        return {"success": True, "status": status}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to verify recycler: {str(e)}")

@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    try:
        profile = db.users.find_one({"_id": user_id})
        if not profile:
            # Create a default blank profile based on ID
            role = "seller"
            name = "Demo Seller"
            if "corporate" in user_id:
                role = "corporate"
                name = "EcoCorp Solutions"
            elif "recycler" in user_id:
                role = "recycler"
                name = "GreenCycle Pvt Ltd"
            elif "admin" in user_id:
                role = "admin"
                name = "Admin User"
                
            profile = {
                "_id": user_id,
                "name": name,
                "email": f"{role}@ecotrace.com",
                "role": role,
                "createdAt": datetime.utcnow().isoformat()
            }
            db.users.insert_one(profile)
        return clean_db_doc(profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {str(e)}")

@router.put("/profile/{user_id}")
async def update_profile(user_id: str, payload: dict):
    try:
        db.users.update_one(
            {"_id": user_id},
            {"$set": payload},
            upsert=True
        )
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")
