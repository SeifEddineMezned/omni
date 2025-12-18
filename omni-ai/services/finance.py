def _to_float(x, default=0.0):
    try:
        if x is None:
            return default
        return float(x)
    except Exception:
        return default


def analyze_finances(data: dict):
    data = data or {}

    # Accept multiple shapes:
    # 1) expenses at root: {"rent":900,"food":400,...,"savings_goal":500}
    # 2) nested: {"expenses": {...}, "savings_goal":500}
    nested = data.get("expenses")
    if isinstance(nested, dict):
        expenses = dict(nested)
    else:
        # take numeric expense-like fields from root
        expenses = {}
        for k, v in data.items():
            if k in ("savings_goal", "income", "monthly_income"):
                continue
            if isinstance(v, (int, float, str)):
                # only keep values that look numeric
                fv = _to_float(v, None)
                if fv is not None:
                    expenses[k] = fv

    savings_goal = _to_float(data.get("savings_goal", 0))
    income = data.get("income", data.get("monthly_income", None))
    monthly_income = _to_float(income, None) if income is not None else None

    # Clean expenses: keep only positive numbers
    cleaned = {}
    for k, v in expenses.items():
        fv = _to_float(v, 0.0)
        if fv > 0:
            cleaned[k] = fv

    total_spent = sum(cleaned.values())

    # If income not provided: compute the income needed to hit savings goal
    required_income = total_spent + savings_goal if savings_goal > 0 else None
    disposable_after_expenses = (monthly_income - total_spent) if monthly_income is not None else None
    savings_feasible = (disposable_after_expenses >= savings_goal) if disposable_after_expenses is not None else None

    # Percent breakdown
    breakdown = []
    for k, v in sorted(cleaned.items(), key=lambda x: x[1], reverse=True):
        pct = (v / total_spent * 100.0) if total_spent > 0 else 0.0
        breakdown.append({"category": k, "amount": round(v, 2), "percent": round(pct, 1)})

    # Insights + actions (ranked)
    insights = []
    actions = []

    if total_spent == 0:
        return {
            "risk_level": "unknown",
            "summary": {
                "total_spent": 0,
                "savings_goal": round(savings_goal, 2),
                "monthly_income": None if monthly_income is None else round(monthly_income, 2),
            },
            "key_insights": ["No expenses detected. Send expenses at root or under `expenses:{...}`."],
            "breakdown": [],
            "action_plan": [
                {
                    "priority": 1,
                    "action": "Send your monthly expenses (e.g. rent, food, transport, subscriptions).",
                    "expected_impact": "Enables real analysis"
                }
            ]
        }

    # Find top categories
    top1 = breakdown[0] if breakdown else None
    top2 = breakdown[1] if len(breakdown) > 1 else None

    if top1 and top1["percent"] >= 40:
        insights.append(f"'{top1['category']}' is {top1['percent']}% of your spending (very dominant).")
        actions.append({
            "priority": 1,
            "action": f"Try reducing '{top1['category']}' by 10–15%",
            "expected_impact": f"Save about {round(cleaned[top1['category']] * 0.1, 2)} to {round(cleaned[top1['category']] * 0.15, 2)} / month"
        })

    # Subscriptions sanity check if present
    if "subscriptions" in cleaned and cleaned["subscriptions"] > 0:
        sub_pct = cleaned["subscriptions"] / total_spent * 100.0
        if sub_pct >= 10:
            insights.append(f"Subscriptions are {round(sub_pct,1)}% of your spending.")
            actions.append({
                "priority": 2,
                "action": "Cancel/downgrade unused subscriptions (audit list)",
                "expected_impact": f"Save about {round(cleaned['subscriptions'] * 0.2, 2)} / month (typical)"
            })

    # Savings feasibility
    if savings_goal > 0:
        if monthly_income is None:
            insights.append(f"To save {round(savings_goal,2)} / month, you need income ≈ {round(required_income,2)} / month.")
            actions.append({
                "priority": 3,
                "action": "Add `monthly_income` to get feasibility + exact gap",
                "expected_impact": "Accurate risk scoring + plan"
            })
        else:
            if not savings_feasible:
                gap = savings_goal - disposable_after_expenses
                insights.append(f"With income {round(monthly_income,2)}, you’re short by {round(gap,2)} to hit your savings goal.")
                actions.append({
                    "priority": 0,
                    "action": f"Reduce spending by at least {round(gap,2)} or lower savings goal",
                    "expected_impact": "Makes the plan feasible"
                })

    # Risk level
    if monthly_income is None:
        risk_level = "medium" if savings_goal > 0 else "low"
    else:
        if disposable_after_expenses < 0:
            risk_level = "high"
        elif savings_goal > 0 and not savings_feasible:
            risk_level = "high"
        elif savings_goal > 0 and disposable_after_expenses < savings_goal * 1.2:
            risk_level = "medium"
        else:
            risk_level = "low"

    # Always add a concrete default action
    if not actions:
        actions.append({
            "priority": 5,
            "action": "Automate savings transfer on payday",
            "expected_impact": "Consistency and less overspending"
        })

    return {
        "risk_level": risk_level,
        "summary": {
            "monthly_income": None if monthly_income is None else round(monthly_income, 2),
            "total_spent": round(total_spent, 2),
            "savings_goal": round(savings_goal, 2),
            "required_income_for_goal": None if required_income is None else round(required_income, 2),
            "disposable_after_expenses": None if disposable_after_expenses is None else round(disposable_after_expenses, 2),
        },
        "breakdown": breakdown,
        "key_insights": insights,
        "action_plan": sorted(actions, key=lambda x: x["priority"]),
    }
