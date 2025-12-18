import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import { Home, Download } from '@mui/icons-material';

const HomeLifestyle = () => {
  // 🔹 Day preferences (RESTORED)
  const [dayStart, setDayStart] = useState('08:00');
  const [dayEnd, setDayEnd] = useState('22:00');
  const [energy, setEnergy] = useState('morning');

  // 🔹 Activities
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState(60);
  const [type, setType] = useState('focus');
  const [priority, setPriority] = useState('medium');

  // 🔹 AI Output
  const [schedule, setSchedule] = useState([]);
  const [reasoning, setReasoning] = useState([]);
  const [visualSchedule, setVisualSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const addActivity = () => {
    if (!activityName.trim()) return;

    setActivities([
      ...activities,
      { name: activityName, duration, type, priority },
    ]);

    setActivityName('');
    setDuration(60);
    setType('focus');
    setPriority('medium');
  };

  const generateSchedule = async () => {
    if (!activities.length) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/ai/schedule/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day_start: dayStart,
          day_end: dayEnd,
          energy,
          activities,
        }),
      });

      const data = await res.json();
      setSchedule(data.schedule || []);
      setReasoning(data.reasoning || []);
      setVisualSchedule(data.visual_schedule || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!visualSchedule) return;
    const link = document.createElement('a');
    link.href = visualSchedule;
    link.download = 'ai_schedule.png';
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Home sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">Home & Lifestyle</Typography>
      </Box>

      {/* 🕒 Day Preferences */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Day Preferences
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                type="time"
                fullWidth
                label="Day Start"
                value={dayStart}
                onChange={(e) => setDayStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                type="time"
                fullWidth
                label="Day End"
                value={dayEnd}
                onChange={(e) => setDayEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Energy Profile"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
              >
                <MenuItem value="morning">Morning person</MenuItem>
                <MenuItem value="afternoon">Afternoon peak</MenuItem>
                <MenuItem value="evening">Night owl</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ➕ Add Activities */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Add Activities</Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Activity Name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                type="number"
                fullWidth
                label="Duration (min)"
                value={duration}
                onChange={(e) => setDuration(+e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                select
                fullWidth
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="focus">Focus</MenuItem>
                <MenuItem value="physical">Physical</MenuItem>
                <MenuItem value="relax">Relax</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                select
                fullWidth
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: '56px' }}
                onClick={addActivity}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            {activities.map((a, i) => (
              <Chip
                key={i}
                label={`${a.name} • ${a.duration}m • ${a.type} • ${a.priority}`}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={generateSchedule}
            disabled={loading}
          >
            ✨ Generate AI Schedule
          </Button>
        </CardContent>
      </Card>

      {/* 🧠 Reasoning */}
      {reasoning.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">AI Reasoning</Typography>
            {reasoning.map((r, i) => (
              <Typography key={i}>• {r}</Typography>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 🖼 Visual Schedule */}
      {visualSchedule && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Visual Schedule</Typography>
              <Button startIcon={<Download />} onClick={downloadImage}>
                Download
              </Button>
            </Box>

            <Box
              component="img"
              src={visualSchedule}
              alt="Schedule"
              sx={{ mt: 2, width: '100%', borderRadius: 2 }}
            />
          </CardContent>
        </Card>
      )}

      {/* ⏰ Timeline */}
      {schedule.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6">Your Optimized Day</Typography>
            {schedule.map((s, i) => (
              <Box
                key={i}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  background:
                    s.activity === 'Break'
                      ? 'linear-gradient(135deg,#43cea2,#185a9d)'
                      : 'linear-gradient(135deg,#667eea,#764ba2)',
                  color: 'white',
                }}
              >
                <strong>{s.start} – {s.end}</strong>
                <div>{s.activity}</div>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default HomeLifestyle;
