def analyze_health(data):
    sleep = data.get("sleep_hours", 0)
    water = data.get("water_intake_liters", 0)
    exercise = data.get("exercise_minutes", 0)
    stress = data.get("stress_level", "unknown")

    risk_score = 0
    factors = {}

    # Sleep
    if sleep < 6:
        risk_score += 3
        factors["sleep"] = "critically low"
    elif sleep < 7:
        risk_score += 2
        factors["sleep"] = "below recommended minimum"
    else:
        factors["sleep"] = "adequate"

    # Stress
    if stress == "high":
        risk_score += 3
        factors["stress"] = "high stress reported"
    elif stress == "medium":
        risk_score += 1
        factors["stress"] = "moderate stress"
    else:
        factors["stress"] = "low stress"

    # Hydration
    if water < 1.5:
        risk_score += 2
        factors["hydration"] = "low hydration"
    elif water < 2:
        risk_score += 1
        factors["hydration"] = "slightly low hydration"
    else:
        factors["hydration"] = "good hydration"

    # Exercise
    if exercise < 10:
        risk_score += 2
        factors["exercise"] = "very low activity"
    elif exercise < 30:
        factors["exercise"] = "light activity"
    else:
        factors["exercise"] = "good activity level"

    # Risk level
    if risk_score >= 7:
        risk = "high"
    elif risk_score >= 4:
        risk = "medium"
    else:
        risk = "low"

    recommendations = []

    if sleep < 7:
        recommendations.append("Increase sleep to 7–8 hours per night")
    if stress == "high":
        recommendations.append("Add daily stress-reduction activities (10–15 minutes)")
    if water < 2:
        recommendations.append("Increase water intake to 2–2.5 liters per day")
    if exercise < 30:
        recommendations.append("Aim for at least 30 minutes of light exercise per day")

    return {
        "burnout_risk": risk,
        "risk_factors": factors,
        "recommendations": recommendations,
        "priority_action": recommendations[0] if recommendations else "Maintain current habits"
    }
