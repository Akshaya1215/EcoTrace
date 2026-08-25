# Market rates in INR per gram
MARKET_RATES = {
    "Copper": 0.75,         # ~750 INR/kg
    "Aluminum": 0.22,       # ~220 INR/kg
    "Iron/Steel": 0.05,     # ~50 INR/kg
    "Plastic": 0.03,        # ~30 INR/kg
    "Glass": 0.02,          # ~20 INR/kg
    "Lithium-ion Battery": 0.15,
    "Silicon": 0.10,
    "Gold": 6500.0,
    "Silver": 75.0,
    "Palladium": 3200.0,
    "Other": 0.01
}

def get_market_rates():
    # Helper to return rate info
    return [{"material": mat, "rate": rate, "unit": "gram", "currency": "INR"} for mat, rate in MARKET_RATES.items()]

def calculate_value(materials_composition, precious_metals):
    total_val = 0.0
    
    # Calculate base materials value
    for mat_item in materials_composition:
        name = mat_item["material"]
        weight = mat_item["estimatedGrams"]
        rate = MARKET_RATES.get(name, MARKET_RATES["Other"])
        total_val += weight * rate
        
    # Calculate precious metals value
    for pm_item in precious_metals:
        name = pm_item["name"]
        weight = pm_item["grams"]
        rate = MARKET_RATES.get(name, MARKET_RATES["Other"])
        total_val += weight * rate

    # Round to integer
    estimated_recovery_value = round(total_val, 2)
    
    # Estimated Min and Max ranges (e.g. -10% to +10%)
    min_val = round(estimated_recovery_value * 0.9, 0)
    max_val = round(estimated_recovery_value * 1.1, 0)
    
    return {
        "estimatedValue": estimated_recovery_value,
        "minValue": int(min_val),
        "maxValue": int(max_val),
        "currency": "INR",
        "ratesApplied": MARKET_RATES
    }
