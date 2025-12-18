import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  AccountBalance,
} from '@mui/icons-material';
import axios from 'axios';

// 🔹 Recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8dd1e1',
  '#d0ed57',
];

const FinanceHub = () => {
  /* -------------------- USER INPUT -------------------- */
  const [expenses, setExpenses] = useState({
    rent: 900,
    food: 400,
    transport: 150,
    subscriptions: 80,
  });
  const [savingsGoal, setSavingsGoal] = useState(500);
  const [monthlyIncome, setMonthlyIncome] = useState(3000);

  /* -------------------- AI OUTPUT -------------------- */
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------- HANDLERS -------------------- */
  const analyzeFinances = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8000/ai/finance/analyze',
        {
          expenses,
          savings_goal: savingsGoal,
          monthly_income: monthlyIncome,
        }
      );
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseChange = (key, value) => {
    setExpenses({ ...expenses, [key]: Number(value) });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">Finance Hub</Typography>
      </Box>

      {/* INPUT CARD */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Monthly Finances</Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.entries(expenses).map(([key, value]) => (
              <Grid item xs={12} md={3} key={key}>
                <Typography variant="caption">
                  {key.toUpperCase()}
                </Typography>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleExpenseChange(key, e.target.value)
                  }
                  style={inputStyle}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={3}>
              <Typography variant="caption">Monthly Income</Typography>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                style={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="caption">Savings Goal</Typography>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                style={inputStyle}
              />
            </Grid>
          </Grid>

          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={analyzeFinances}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Finances with AI'}
          </Button>
        </CardContent>
      </Card>

      {/* AI RESULTS */}
      {analysis && (
        <>
          {/* SUMMARY CARDS */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <TrendingUp />
                  <Typography>Total Spent</Typography>
                  <Typography variant="h4">
                    ${analysis.summary.total_spent}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <TrendingDown />
                  <Typography>Savings Goal</Typography>
                  <Typography variant="h4">
                    ${analysis.summary.savings_goal}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <AccountBalance />
                  <Typography>Disposable</Typography>
                  <Typography variant="h4">
                    {analysis.summary.disposable_after_expenses ?? '—'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* RISK */}
          <Box sx={{ mt: 3 }}>
            <Chip
              label={`Risk Level: ${analysis.risk_level}`}
              color={
                analysis.risk_level === 'high'
                  ? 'error'
                  : analysis.risk_level === 'medium'
                  ? 'warning'
                  : 'success'
              }
            />
          </Box>

          {/* PIE CHART */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Spending Breakdown
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysis.breakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ category, percent }) =>
                      `${category} (${percent}%)`
                    }
                  >
                    {analysis.breakdown.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* INSIGHTS */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Key Insights</Typography>
              {analysis.key_insights.map((insight, i) => (
                <Typography key={i} sx={{ mt: 1 }}>
                  • {insight}
                </Typography>
              ))}
            </CardContent>
          </Card>

          {/* ACTION PLAN */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Action Plan</Typography>
              {analysis.action_plan.map((a, i) => (
                <Box key={i} sx={{ mt: 2 }}>
                  <Chip
                    label={`Priority ${a.priority}`}
                    size="small"
                    color="primary"
                  />
                  <Typography sx={{ mt: 1 }}>
                    {a.action}
                  </Typography>
                  <Typography variant="caption">
                    Expected impact: {a.expected_impact}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

const inputStyle = {
  width: '100%',
  padding: 10,
  borderRadius: 6,
  border: '1px solid #444',
  background: '#2a1f4a',
  color: '#fff',
};

export default FinanceHub;
