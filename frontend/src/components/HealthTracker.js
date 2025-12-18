import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  TextField,
} from '@mui/material';
import {
  Favorite,
  FitnessCenter,
  LocalDining,
  Bedtime,
  MonitorWeight,
} from '@mui/icons-material';
import axios from 'axios';

const HealthTracker = () => {
  // -------------------------
  // USER INPUT STATE
  // -------------------------
  const [sleep, setSleep] = useState(3);
  const [water, setWater] = useState(5);
  const [exercise, setExercise] = useState(11);
  const [stress, setStress] = useState('high');

  // -------------------------
  // AI OUTPUT STATE
  // -------------------------
  const [burnoutRisk, setBurnoutRisk] = useState(null);
  const [priorityAction, setPriorityAction] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [riskFactors, setRiskFactors] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------------------------
  // SEND TO BACKEND
  // -------------------------
  const analyzeHealth = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/ai/health/analyze', {
        sleep_hours: sleep,
        water_liters: water,
        exercise_minutes: exercise,
        stress_level: stress,
      });

      setBurnoutRisk(res.data.burnout_risk);
      setPriorityAction(res.data.priority_action);
      setRecommendations(res.data.recommendations || []);
      setRiskFactors(res.data.risk_factors || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // METRIC CARDS
  // -------------------------
  const metrics = [
    {
      title: 'Sleep',
      value: sleep,
      target: 8,
      unit: 'hours',
      icon: <Bedtime />,
    },
    {
      title: 'Water',
      value: water,
      target: 2.5,
      unit: 'liters',
      icon: <LocalDining />,
    },
    {
      title: 'Exercise',
      value: exercise,
      target: 30,
      unit: 'min',
      icon: <FitnessCenter />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Favorite sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">Health Tracker</Typography>
      </Box>

      {/* INPUTS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Daily Health Inputs
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sleep (hours)"
                type="number"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Water (liters)"
                type="number"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Exercise (minutes)"
                type="number"
                value={exercise}
                onChange={(e) => setExercise(Number(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography gutterBottom>Stress Level</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['low', 'medium', 'high'].map((lvl) => (
                  <Chip
                    key={lvl}
                    label={lvl}
                    clickable
                    color={stress === lvl ? 'primary' : 'default'}
                    onClick={() => setStress(lvl)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={analyzeHealth}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Health with AI'}
          </Button>
        </CardContent>
      </Card>

      {/* METRIC VISUALS */}
      <Grid container spacing={3}>
        {metrics.map((metric) => {
          const progress = Math.min(
            (metric.value / metric.target) * 100,
            100
          );

          return (
            <Grid item xs={12} md={4} key={metric.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {metric.icon}
                    <Typography sx={{ ml: 1 }}>{metric.title}</Typography>
                  </Box>

                  <Typography variant="h4">
                    {metric.value} {metric.unit}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                  />

                  <Typography variant="caption">
                    Target: {metric.target} {metric.unit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* AI INSIGHTS */}
      {burnoutRisk && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">AI Health Insight</Typography>

            <Chip
              label={`Burnout Risk: ${burnoutRisk}`}
              color={
                burnoutRisk === 'high'
                  ? 'error'
                  : burnoutRisk === 'medium'
                  ? 'warning'
                  : 'success'
              }
              sx={{ mt: 1 }}
            />

            {priorityAction && (
              <Typography sx={{ mt: 2 }}>
                <strong>Priority Action:</strong> {priorityAction}
              </Typography>
            )}

            {Array.isArray(recommendations) && recommendations.length > 0 && (
              <>
                <Typography sx={{ mt: 2 }}>
                  <strong>Recommendations:</strong>
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {recommendations.map((rec, idx) => (
                    <Chip key={idx} label={rec} color="info" />
                  ))}
                </Box>
              </>
            )}

            {riskFactors && typeof riskFactors === 'object' && (
              <>
                <Typography sx={{ mt: 2 }}>
                  <strong>Risk Factors:</strong>
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Object.entries(riskFactors).map(([key, value], idx) => (
                    <Chip
                      key={idx}
                      label={`${key}: ${value}`}
                      color="warning"
                    />
                  ))}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default HealthTracker;
