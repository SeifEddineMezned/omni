from utils.gemini import client
from utils.image_utils import extract_image_from_response, to_data_url

def generate_daily_summary(data):
    mood = data.get("mood", "productive")

    summary = (
        f"You had a {mood} day. You maintained progress toward your goals "
        "and stayed consistent with your habits."
    )

    prompt = (
        f"Create a calm, minimal illustration representing a {mood} and balanced day. "
        "Soft lighting, modern aesthetic."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=[prompt]
    )

    raw = extract_image_from_response(response)
    image = to_data_url(raw) if raw else None

    return {
        "summary": summary,
        "visual": image
    }
