def calculate_impact(category: str, weight_grams: float, materials_composition):
    # E-waste diverted is the weight in kg
    ewaste_diverted_kg = round(weight_grams / 1000.0, 3)
    
    # Calculate CO2 saved based on material weights (in kg)
    # CO2 saved factors (kg CO2 per kg material recycled)
    co2_factors = {
        "Aluminum": 11.5,
        "Copper": 3.8,
        "Iron/Steel": 1.6,
        "Plastic": 2.0,
        "Glass": 0.5,
        "Lithium-ion Battery": 5.2,
        "Silicon": 12.0
    }
    
    total_co2_saved = 0.0
    for mat in materials_composition:
        name = mat["material"]
        weight_kg = mat["estimatedGrams"] / 1000.0
        factor = co2_factors.get(name, 1.0)
        total_co2_saved += weight_kg * factor
        
    # Standard overrides or defaults for categories if composition is too small
    if total_co2_saved < 0.1:
        if category == "smartphone":
            total_co2_saved = 12.6
        elif category == "laptop":
            total_co2_saved = 85.0
        elif category == "tablet":
            total_co2_saved = 35.0
        elif category == "television":
            total_co2_saved = 150.0
        else:
            total_co2_saved = ewaste_diverted_kg * 5.0
            
    # Energy saved: typically 15 kWh per kg of generic e-waste, Al and batteries have higher factors
    energy_saved_kwh = round(total_co2_saved * 1.5, 1)
    
    # Water saved: typically 40 L per kg of generic e-waste
    water_saved_liters = round(ewaste_diverted_kg * 250.0, 1)
    if category == "smartphone":
        water_saved_liters = 48.0
    elif category == "laptop":
        water_saved_liters = 350.0
    
    # Trees equivalent: 1 tree absorbs ~22 kg of CO2 per year
    trees_equivalent = max(1, round(total_co2_saved / 22.0, 1))
    
    return {
        "co2AvoidedKg": round(total_co2_saved, 2),
        "ewasteDivertedKg": ewaste_diverted_kg,
        "energySavedKwh": energy_saved_kwh,
        "waterSavedLiters": water_saved_liters,
        "treesEquivalent": trees_equivalent
    }
