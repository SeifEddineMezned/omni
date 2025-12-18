import json
import re
from typing import Any, Dict, List

from utils.gemini import client
from utils.image_utils import extract_image_from_response, render_schedule_image

# ---------- helpers ----------
def _hhmm_to_min(s: str) -> int:
    h, m = s.split(":")
    return int(h) * 60 + int(m)

def _min_to_hhmm(m: int) -> str:
    h = m // 60
    mm = m % 60
    return f"{h:02d}:{mm:02d}"

def _extract_json(text: str) -> Dict[str, Any]:
    """
    Gemini sometimes wraps JSON with text. We pull the first {...} block.
    """
    text = text.strip()
    # Try direct parse
    try:
        return json.loads(text)
    except Exception:
        pass

    # Find first JSON object block
    m = re.search(r"\{.*\}", text, flags=re.DOTALL)
    if not m:
        raise ValueError("No JSON object found in Gemini output.")
    return json.loads(m.group(0))

def _validate_schedule(schedule: List[Dict[str, str]], day_start: str, day_end: str) -> None:
    ds = _hhmm_to_min(day_start)
    de = _hhmm_to_min(day_end)
    last_end = ds

    for item in schedule:
        if not all(k in item for k in ["start", "end", "activity"]):
            raise ValueError("Schedule item missing keys.")
        s = _hhmm_to_min(item["start"])
        e = _hhmm_to_min(item["end"])
        if not (ds <= s < e <= de):
            raise ValueError("Schedule time out of bounds.")
        if s < last_end:
            raise ValueError("Schedule overlaps or is not ordered.")
        last_end = e

def _fallback_schedule(activities: List[Dict[str, Any]], day_start: str, day_end: str, break_every_min: int = 50, break_len_min: int = 10):
    """
    Deterministic fallback: priority sort + breaks.
    """
    ds = _hhmm_to_min(day_start)
    de = _hhmm_to_min(day_end)

    def prio(a):
        p = str(a.get("priority", "medium")).lower()
        return {"low": 1, "medium": 2, "high": 3}.get(p, 2)

    # Focus tasks first, then others
    acts = sorted(activities, key=lambda a: (prio(a), a.get("type", "") == "focus"), reverse=True)

    cur = ds
    out = []
    focus_counter = 0

    for a in acts:
        dur = int(a.get("duration", 30))
        name = a.get("name") or a.get("title") or "Activity"

        if cur + dur > de:
            break

        out.append({"start": _min_to_hhmm(cur), "end": _min_to_hhmm(cur + dur), "activity": name})
        cur += dur

        # insert breaks after focus-y work
        typ = str(a.get("type", "")).lower()
        if typ in ["focus", "study", "work"]:
            focus_counter += dur
            if focus_counter >= break_every_min and cur + break_len_min <= de:
                out.append({"start": _min_to_hhmm(cur), "end": _min_to_hhmm(cur + break_len_min), "activity": "Break"})
                cur += break_len_min
                focus_counter = 0

    return out

# ---------- main ----------
def generate_schedule(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Input (recommended):
    {
      "day_start":"08:00",
      "day_end":"22:00",
      "energy":"morning",
      "activities":[
        {"name":"Study AI","duration":120,"type":"focus","priority":"high"},
        ...
      ]
    }
    """
    day_start = data.get("day_start", "08:00")
    day_end = data.get("day_end", "22:00")
    energy = data.get("energy", "balanced")

    activities = data.get("activities")
    if activities is None:
        # Backward compatible with your old "tasks" shape
        tasks = data.get("tasks", [])
        activities = [{"name": t.get("title"), "duration": t.get("duration", 60), "type": "focus", "priority": "medium"} for t in tasks]

    # 1) Ask Gemini to create an optimized schedule as STRICT JSON
    gemini_prompt = f"""
You are an expert personal scheduler.

Create an optimized daily schedule from the provided activities and constraints.

Constraints:
- Day start: {day_start}
- Day end: {day_end}
- Energy profile: {energy}
- Insert breaks (5–15 minutes) after long focus periods.
- Avoid back-to-back heavy focus blocks.
- Keep the schedule realistic and ordered.

Activities (name, duration minutes, type, priority):
{json.dumps(activities, ensure_ascii=False)}

Return ONLY valid JSON in exactly this format (no markdown, no extra text):
{{
  "schedule": [
    {{"start":"HH:MM","end":"HH:MM","activity":"..." }}
  ],
  "reasoning": [
    "short bullet reason 1",
    "short bullet reason 2"
  ]
}}
"""

    schedule = None
    reasoning = None

    try:
        resp = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[gemini_prompt]
        )

        parsed = _extract_json(getattr(resp, "text", "") or "")
        schedule = parsed.get("schedule")
        reasoning = parsed.get("reasoning")

        if not isinstance(schedule, list) or not schedule:
            raise ValueError("Gemini returned empty schedule.")

        _validate_schedule(schedule, day_start, day_end)

        if not isinstance(reasoning, list):
            reasoning = ["Schedule optimized based on energy, priorities, and breaks."]

    except Exception as e:
        # 2) Fallback deterministic scheduling if Gemini output is malformed
        schedule = _fallback_schedule(activities, day_start, day_end)
        reasoning = [
            "Used deterministic fallback scheduling due to AI output/format limits.",
            f"Fallback reason: {type(e).__name__}"
        ]

    # 3) Generate a nice background with Gemini image (optional), then overlay the true schedule with PIL
    base_bytes = None
    try:
        bg_prompt = (
            "Generate a clean minimal planner background (no text), white/light theme, "
            "modern UI paper texture, subtle lines, professional, visally appealing."
            "the activities font size has to be respective to the slot they re in."
        )
        img_resp = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=[bg_prompt]
        )
        base_bytes = extract_image_from_response(img_resp)
    except Exception:
        base_bytes = None

    visual_schedule = render_schedule_image(schedule, base_image_bytes=base_bytes)

    return {
        "schedule": schedule,
        "reasoning": reasoning,
        "visual_schedule": visual_schedule
    }
