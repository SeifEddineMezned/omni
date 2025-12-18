from datetime import datetime

def optimize_tasks(data):
    tasks = data.get("tasks", [])

    def task_priority(task):
        deadline = task.get("deadline")
        if not deadline or deadline == "none":
            return datetime.max
        try:
            return datetime.strptime(deadline, "%Y-%m-%d")
        except ValueError:
            return datetime.max

    sorted_tasks = sorted(tasks, key=task_priority)

    return {
        "explanation": "Tasks reordered based on upcoming deadlines and urgency.",
        "optimized_tasks": sorted_tasks
    }
