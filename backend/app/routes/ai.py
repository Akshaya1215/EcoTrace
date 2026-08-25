import time
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from app.services.ai_service import analyze_device_data

router = APIRouter(prefix="/ai", tags=["AI Analysis"])

@router.post("/analyze")
async def analyze_device(
    modelName: str = Form(...),
    place: str = Form(""),
    contactDetails: str = Form(""),
    ewasteDescription: str = Form(""),
    condition: str = Form("good"),
    image: UploadFile = File(None)
):
    try:
        start_time = time.time()
        
        # In a real model, we would save or process the image
        # image_bytes = await image.read() if image else None
        
        # Analyze device metadata
        analysis = analyze_device_data(modelName, ewasteDescription, condition)
        
        # Add metadata context info
        analysis["metadata"] = {
            "place": place,
            "contactDetails": contactDetails,
            "ewasteDescription": ewasteDescription
        }
        analysis["inferenceTimeSeconds"] = round(time.time() - start_time, 2)
        
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")
