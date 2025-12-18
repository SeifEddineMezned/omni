from flask import Flask, request, jsonify
from flask_cors import CORS

from services.schedule import generate_schedule
from services.summary import generate_daily_summary
from services.tasks import optimize_tasks
from services.health import analyze_health

app = Flask(__name__)
CORS(app)

@app.route("/ai/schedule/generate", methods=["POST"])
def schedule():
    data = request.get_json(force=True) or {}
    return jsonify(generate_schedule(data))

@app.route("/ai/summary/daily", methods=["POST"])
def summary():
    data = request.get_json(force=True) or {}
    return jsonify(generate_daily_summary(data))

@app.route("/ai/tasks/optimize", methods=["POST"])
def tasks():
    data = request.get_json(force=True) or {}
    return jsonify(optimize_tasks(data))

@app.route("/ai/health/analyze", methods=["POST"])
def health():
    data = request.get_json(force=True) or {}
    return jsonify(analyze_health(data))

@app.route("/health", methods=["GET"])
def healthcheck():
    return {"status": "OMNI AI running"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
