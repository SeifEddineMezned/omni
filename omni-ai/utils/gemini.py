import os
from google import genai

# Load .env for local development (Docker --env-file still works)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

API_KEY = os.getenv("GENAI_API_KEY")

if not API_KEY:
    raise RuntimeError("GENAI_API_KEY not set")

client = genai.Client(api_key=API_KEY)
