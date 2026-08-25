import re
from app.services.material_service import estimate_materials
from app.services.valuation_service import calculate_value
from app.services.impact_service import calculate_impact

def analyze_device_data(model_name: str, description: str = "", condition: str = "good"):
    # Clean text for matching
    text = (model_name + " " + description).lower()
    
    # 1. Determine Category
    category = "generic"
    if any(kw in text for kw in ["iphone", "galaxy", "phone", "pixel", "samsung", "oneplus", "smartphone"]):
        # Samsung can be phone or other, but check for phone first
        category = "smartphone"
    if any(kw in text for kw in ["macbook", "laptop", "notebook", "thinkpad", "dell xps", "latitude", "hp pavilion", "chromebook"]):
        category = "laptop"
    elif any(kw in text for kw in ["ipad", "galaxy tab", "tablet", "surface go", "media pad"]):
        category = "tablet"
    elif any(kw in text for kw in ["tv", "television", "monitor", "display", "screen"]):
        category = "television"
    elif any(kw in text for kw in ["desktop", "pc", "tower", "server", "workstation"]):
        category = "desktop"
        
    # 2. Determine Brand
    brand = "Generic"
    if "apple" in text or "iphone" in text or "macbook" in text or "ipad" in text:
        brand = "Apple"
    elif "samsung" in text or "galaxy" in text:
        brand = "Samsung"
    elif "dell" in text:
        brand = "Dell"
    elif "hp" in text or "hewlett" in text:
        brand = "HP"
    elif "lenovo" in text or "thinkpad" in text:
        brand = "Lenovo"
    elif "sony" in text:
        brand = "Sony"
    elif "oneplus" in text:
        brand = "OnePlus"
    elif "google" in text or "pixel" in text:
        brand = "Google"

    # 3. Determine Weight (grams)
    weights = {
        "smartphone": 190.0,
        "laptop": 1500.0,
        "tablet": 460.0,
        "television": 12000.0,
        "desktop": 7500.0,
        "generic": 500.0
    }
    base_weight = weights[category]
    
    # Simple variations based on keywords
    if "pro max" in text or "ultra" in text:
        base_weight *= 1.25
    elif "mini" in text or "lite" in text:
        base_weight *= 0.85
        
    # 4. Perform material analysis, valuation, and impact analysis
    materials_data = estimate_materials(category, base_weight, condition)
    valuation_data = calculate_value(materials_data["composition"], materials_data["preciousMetals"])
    impact_data = calculate_impact(category, base_weight, materials_data["composition"])
    
    # 5. Risk Assessment (realistic looking scores)
    battery_risk = 85 if "old" in text or "broken" in text else 50
    if category == "smartphone" or category == "laptop" or category == "tablet":
        battery_risk = battery_risk + 10 if condition == "poor" or condition == "non_functional" else battery_risk
    else:
        battery_risk = 0  # devices without Li-batteries have lower battery risk
        
    resale_score = 15 if condition == "non_functional" else 75 if condition == "excellent" else 45
    metal_recovery = 90 if category in ["smartphone", "laptop"] else 70
    
    # Confidence scores
    classify_confidence = 0.94 if category != "generic" else 0.65
    condition_confidence = 0.88 if condition != "good" else 0.70
    
    # Clean classification name
    class_name = f"{brand} {category.capitalize()}" if brand != "Generic" else f"Generic {category.capitalize()}"
    if category == "smartphone" and brand == "Apple":
        class_name = "Apple iPhone"
    elif category == "smartphone" and brand == "Samsung":
        class_name = "Samsung Galaxy"
        
    return {
        "device": {
            "brand": brand,
            "model": model_name,
            "category": category,
            "className": class_name
        },
        "classificationConfidence": classify_confidence,
        "condition": condition,
        "conditionConfidence": condition_confidence,
        "estimatedWeightGrams": round(base_weight, 1),
        "materials": materials_data["composition"],
        "preciousMetals": materials_data["preciousMetals"],
        "valuation": valuation_data,
        "environmentalImpact": impact_data,
        "riskAssessment": {
            "batteryDegradation": battery_risk,
            "metalRecovery": metal_recovery,
            "resale": resale_score
        },
        "aiProvider": "demo-reference-profiles"
    }
