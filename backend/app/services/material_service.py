def estimate_materials(category: str, weight_grams: float, condition: str = "good"):
    # Reference profiles for material composition based on category
    # percentage of total weight
    profiles = {
        "smartphone": {
            "Aluminum": 0.25,
            "Lithium-ion Battery": 0.20,
            "Glass": 0.18,
            "Plastic": 0.15,
            "Copper": 0.10,
            "Iron/Steel": 0.05,
            "Silicon": 0.069,
            "Precious Metals": 0.001, # placeholder percentage
            "Other": 0.001
        },
        "laptop": {
            "Aluminum": 0.30,
            "Plastic": 0.20,
            "Copper": 0.12,
            "Glass": 0.10,
            "Lithium-ion Battery": 0.15,
            "Iron/Steel": 0.10,
            "Silicon": 0.029,
            "Precious Metals": 0.001,
            "Other": 0.001
        },
        "tablet": {
            "Aluminum": 0.28,
            "Lithium-ion Battery": 0.22,
            "Glass": 0.20,
            "Plastic": 0.12,
            "Copper": 0.10,
            "Silicon": 0.079,
            "Precious Metals": 0.001,
            "Other": 0.001
        },
        "television": {
            "Glass": 0.40,
            "Plastic": 0.30,
            "Iron/Steel": 0.15,
            "Copper": 0.08,
            "Aluminum": 0.05,
            "Silicon": 0.019,
            "Precious Metals": 0.0005,
            "Other": 0.0005
        },
        "generic": {
            "Plastic": 0.35,
            "Iron/Steel": 0.30,
            "Aluminum": 0.15,
            "Copper": 0.10,
            "Glass": 0.05,
            "Silicon": 0.04,
            "Precious Metals": 0.0005,
            "Other": 0.0095
        }
    }
    
    profile = profiles.get(category.lower(), profiles["generic"])
    
    # Specific precious metal composition in grams
    precious_metals_profiles = {
        "smartphone": [
            {"name": "Gold", "grams": 0.03, "confidence": 0.92},
            {"name": "Silver", "grams": 0.25, "confidence": 0.88},
            {"name": "Palladium", "grams": 0.015, "confidence": 0.85}
        ],
        "laptop": [
            {"name": "Gold", "grams": 0.10, "confidence": 0.94},
            {"name": "Silver", "grams": 0.80, "confidence": 0.90},
            {"name": "Palladium", "grams": 0.04, "confidence": 0.87}
        ],
        "tablet": [
            {"name": "Gold", "grams": 0.05, "confidence": 0.91},
            {"name": "Silver", "grams": 0.40, "confidence": 0.89},
            {"name": "Palladium", "grams": 0.02, "confidence": 0.86}
        ],
        "television": [
            {"name": "Gold", "grams": 0.15, "confidence": 0.88},
            {"name": "Silver", "grams": 1.20, "confidence": 0.85},
            {"name": "Palladium", "grams": 0.05, "confidence": 0.80}
        ],
        "generic": [
            {"name": "Gold", "grams": 0.01, "confidence": 0.80},
            {"name": "Silver", "grams": 0.10, "confidence": 0.75},
            {"name": "Palladium", "grams": 0.005, "confidence": 0.70}
        ]
    }
    
    precious_metals = precious_metals_profiles.get(category.lower(), precious_metals_profiles["generic"])
    
    materials_list = []
    for mat, pct in profile.items():
        if mat == "Precious Metals":
            continue
        est_grams = weight_grams * pct
        # adjust confidence slightly based on condition
        confidence = 0.95 if condition.lower() == "excellent" else 0.88 if condition.lower() == "good" else 0.75
        materials_list.append({
            "material": mat,
            "percentage": pct * 100,
            "estimatedGrams": round(est_grams, 2),
            "confidence": confidence
        })
        
    return {
        "composition": materials_list,
        "preciousMetals": precious_metals
    }
