import base64
import logging
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

logger = logging.getLogger(__name__)

def extract_image_from_response(response):
    try:
        for cand in response.candidates:
            for part in cand.content.parts:
                if getattr(part, "inline_data", None):
                    return part.inline_data.data
    except Exception as e:
        logger.error(f"Image extraction failed: {e}")
    return None

def to_data_url(raw_bytes: bytes) -> str:
    return "data:image/png;base64," + base64.b64encode(raw_bytes).decode("utf-8")

def _parse_hhmm(s: str) -> int:
    # "09:30" -> minutes since 00:00
    h, m = s.split(":")
    return int(h) * 60 + int(m)

def render_schedule_image(schedule, base_image_bytes: bytes | None = None) -> str:
    """
    schedule: list of {start:"HH:MM", end:"HH:MM", activity:"..."}
    base_image_bytes: optional PNG/JPEG bytes (we'll draw over it)
    returns: data:image/png;base64,...
    """
    W, H = 900, 600

    if base_image_bytes:
        try:
            img = Image.open(BytesIO(base_image_bytes)).convert("RGB").resize((W, H))
        except Exception:
            img = Image.new("RGB", (W, H), "white")
    else:
        img = Image.new("RGB", (W, H), "white")

    draw = ImageDraw.Draw(img)

    # Fonts (fallback safe)
    try:
        font_title = ImageFont.truetype("arial.ttf", 28)
        font_text = ImageFont.truetype("arial.ttf", 18)
        font_small = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_title = ImageFont.load_default()
        font_text = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Header
    draw.text((30, 20), "OMNI — AI Daily Schedule", fill="black", font=font_title)

    # Timeline area
    left = 40
    top = 80
    right = W - 40
    bottom = H - 40

    # Background panel
    draw.rounded_rectangle((left, top, right, bottom), radius=18, outline="black", width=2)

    # Determine time range from schedule
    starts = [_parse_hhmm(x["start"]) for x in schedule]
    ends = [_parse_hhmm(x["end"]) for x in schedule]
    day_start = min(starts) if starts else 9 * 60
    day_end = max(ends) if ends else 17 * 60
    total = max(1, day_end - day_start)

    # Draw hour ticks
    for t in range(day_start, day_end + 1, 60):
        y = top + int((t - day_start) / total * (bottom - top))
        draw.line((left, y, right, y), fill="#dddddd", width=1)
        hh = t // 60
        draw.text((left + 10, y - 10), f"{hh:02d}:00", fill="black", font=font_small)

    # Draw blocks
    for item in schedule:
        s = _parse_hhmm(item["start"])
        e = _parse_hhmm(item["end"])
        y1 = top + int((s - day_start) / total * (bottom - top))
        y2 = top + int((e - day_start) / total * (bottom - top))
        y2 = max(y2, y1 + 28)  # ensure visible

        block_left = left + 120
        block_right = right - 20

        draw.rounded_rectangle((block_left, y1 + 2, block_right, y2 - 2), radius=14, outline="black", width=2, fill="#f7f7f7")
        draw.text((block_left + 14, y1 + 8), f"{item['start']}–{item['end']}  {item['activity']}", fill="black", font=font_text)

    # Export
    buf = BytesIO()
    img.save(buf, format="PNG")
    return to_data_url(buf.getvalue())
