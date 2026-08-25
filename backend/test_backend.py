import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:8000"

def test_endpoint(path, method="GET", data=None, headers=None, form_data=False):
    url = f"{BASE_URL}{path}"
    headers = headers or {}
    
    req_data = None
    if data:
        if form_data:
            # simple multipart form-data or urlencoded
            boundary = "---Boundary"
            body = []
            for k, v in data.items():
                body.append(f"--{boundary}")
                body.append(f'Content-Disposition: form-data; name="{k}"')
                body.append('')
                body.append(str(v))
            body.append(f"--{boundary}--")
            body.append('')
            req_data = "\r\n".join(body).encode('utf-8')
            headers['Content-Type'] = f'multipart/form-data; boundary={boundary}'
        else:
            req_data = json.dumps(data).encode('utf-8')
            headers['Content-Type'] = 'application/json'
            
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            code = response.getcode()
            res_body = response.read().decode('utf-8')
            print(f"SUCCESS: {method} {path} -> Status {code}")
            try:
                parsed = json.loads(res_body)
                print(f"JSON parsed. Keys: {list(parsed.keys()) if isinstance(parsed, dict) else len(parsed)}")
                return parsed
            except:
                print("Response is not JSON")
                return res_body
    except urllib.error.HTTPError as e:
        print(f"FAILED: {method} {path} -> HTTP Error {e.code}: {e.reason}")
        print(e.read().decode('utf-8'))
        return None
    except Exception as e:
        print(f"ERROR: {method} {path} -> {e}")
        return None

print("=== Running Backend Verification Tests ===")

# Test root
print("\n1. Root Endpoint")
test_endpoint("/")

# Test user seed & list
print("\n2. Users List & Seeding")
users = test_endpoint("/api/users")

# Test recyclers seed & list
print("\n3. Recyclers List & Seeding")
recyclers = test_endpoint("/api/users/recyclers")

# Test AI analysis
print("\n4. AI Device Analysis Form Submission")
analysis = test_endpoint("/api/ai/analyze", method="POST", data={
    "modelName": "iPhone 13 Pro Max",
    "place": "Bangalore, KA",
    "contactDetails": "9876543210",
    "ewasteDescription": "Cracked back screen, battery health 78%",
    "condition": "good"
}, form_data=True)

# Test listing creation
if analysis:
    print("\n5. Listings Creation")
    listing_payload = {
        "sellerId": "seller_demo_001",
        "sellerName": "Demo Seller",
        "deviceName": "iPhone 13 Pro Max",
        "brand": "Apple",
        "category": "smartphone",
        "condition": "good",
        "location": "Bangalore, KA",
        "contactDetails": "9876543210",
        "aiAnalysis": analysis,
        "estimatedWeight": analysis["estimatedWeightGrams"],
        "materials": analysis["materials"],
        "estimatedRecoveryValue": analysis["valuation"],
        "environmentalImpact": analysis["environmentalImpact"],
        "status": "AVAILABLE"
    }
    listing_res = test_endpoint("/api/listings", method="POST", data=listing_payload)
    
    if listing_res:
        listing_id = listing_res["id"]
        
        # Test available listings
        print("\n6. Available Listings List")
        test_endpoint("/api/listings/available")
        
        # Test accept listing
        print("\n7. Accept Listing")
        test_endpoint(f"/api/listings/{listing_id}/accept", method="PUT", data={"recyclerId": "recycler_demo_001"})
        
        # Test get accepted listings for recycler
        print("\n8. Recycler Accepted Listings")
        test_endpoint("/api/listings/accepted/recycler_demo_001")
        
        # Test schedule pickup
        print("\n9. Schedule Pickup")
        test_endpoint("/api/pickups", method="POST", data={
            "listingId": listing_id,
            "sellerId": "seller_demo_001",
            "recyclerId": "recycler_demo_001",
            "pickupAddress": "Bangalore Office",
            "pickupDate": "2026-08-15",
            "pickupTime": "11:00 AM"
        })
        
        # Test update listing status to processing
        print("\n10. Start Processing Listing")
        test_endpoint(f"/api/listings/{listing_id}/status", method="PUT", data={"status": "PROCESSING"})
        
        # Test record recovered materials
        print("\n11. Record Recovered Materials Yields")
        materials_payload = {
            "materials": [
                {"material": "Copper", "estimatedWeight": 15, "recoveredWeight": 16.2},
                {"material": "Aluminum", "estimatedWeight": 30, "recoveredWeight": 28.5},
                {"material": "Gold", "estimatedWeight": 0.05, "recoveredWeight": 0.052}
            ]
        }
        test_endpoint(f"/api/listings/{listing_id}/recover-materials", method="POST", data=materials_payload)
        
        # Test complete transaction (complete payment)
        print("\n12. Fetch and complete payments")
        txns = test_endpoint("/api/transactions/recycler/recycler_demo_001")
        if txns and len(txns) > 0:
            txn_id = txns[0]["id"]
            test_endpoint(f"/api/transactions/{txn_id}/complete", method="PUT")
            
        # Test admin analytics
        print("\n13. Admin Analytics Summary")
        test_endpoint("/api/analytics/admin")
        
        # Test recycler analytics
        print("\n14. Recycler Analytics Summary")
        test_endpoint("/api/analytics/recycler/recycler_demo_001")

print("\n=== Backend Verification Finished ===")
