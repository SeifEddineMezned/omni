import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Fade,
} from "@mui/material";
import { Add, Assignment } from "@mui/icons-material";
import { format } from "date-fns";

const API_URL = "http://localhost:8000/ai/tasks/optimize";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
  });

  /* ✅ BETTER COMPLETION ANIMATION */
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const addTask = () => {
    if (!formData.title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: formData.title,
        deadline: formData.deadline || "none",
        completed: false,
      },
    ]);

    setFormData({ title: "", deadline: "" });
    setOpen(false);
  };

  const optimizeWithAI = async () => {
    if (!tasks.length) return;

    setLoadingAI(true);
    try {
      const payload = {
        tasks: tasks.map((t) => ({
          title: t.title,
          deadline: t.deadline,
        })),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setAiInsight(
        result.explanation ||
          "Tasks reordered based on deadlines and urgency."
      );

      if (result.optimized_tasks) {
        setTasks(
          result.optimized_tasks.map((t, i) => ({
            id: Date.now() + i,
            title: t.title,
            deadline: t.deadline,
            completed: false,
          }))
        );
      }
    } catch {
      setAiInsight("AI optimization failed.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Assignment sx={{ mr: 2 }} />
        <Typography variant="h4">Task Manager</Typography>
      </Box>

      {/* AI BUTTON */}
      <Button
        onClick={optimizeWithAI}
        disabled={loadingAI || tasks.length === 0}
        sx={{
          mb: 2,
          background: "linear-gradient(135deg,#00f5d4,#7b2cbf)",
          color: "#000",
          fontWeight: "bold",
        }}
        variant="contained"
      >
        ⚡ Optimize Tasks with AI
      </Button>

      {/* AI INSIGHT */}
      <Fade in={!!aiInsight}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography fontWeight="bold">AI Insight</Typography>
            <Typography>{aiInsight}</Typography>
          </CardContent>
        </Card>
      </Fade>

      {/* TASK LIST */}
      <Card>
        <CardContent>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                divider
                sx={{
                  transition: "all 0.35s ease",
                  borderLeft: task.completed
                    ? "5px solid #4caf50"
                    : "5px solid transparent",
                  backgroundColor: task.completed
                    ? "rgba(76,175,80,0.08)"
                    : "transparent",
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  sx={{
                    "&.Mui-checked": {
                      color: "#4caf50",
                      transform: "scale(1.1)",
                    },
                  }}
                />

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 500,
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        opacity: task.completed ? 0.75 : 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    task.deadline !== "none" &&
                    `Due: ${format(
                      new Date(task.deadline),
                      "MMM dd, yyyy"
                    )}`
                  }
                />

                <Chip
                  size="small"
                  label={task.completed ? "Completed" : "Pending"}
                  color={task.completed ? "success" : "default"}
                />
              </ListItem>
            ))}
          </List>

          {tasks.length === 0 && (
            <Typography textAlign="center" color="text.secondary">
              No tasks yet
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* ✅ FAB — BOTTOM LEFT */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 2000, // ABOVE ElevenLabs widget
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>

      {/* ADD TASK DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Deadline (optional)"
                InputLabelProps={{ shrink: true }}
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={addTask}
            disabled={!formData.title.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManager;
