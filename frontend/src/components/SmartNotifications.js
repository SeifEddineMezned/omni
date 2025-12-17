import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Button,
  Collapse,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  NotificationsActive,
  TrendingUp,
  Warning,
  CheckCircle,
  LightbulbOutlined,
  ExpandMore,
  ExpandLess,
  Close,
  AutoAwesome,
} from '@mui/icons-material';
import { useAppContext } from '../App';
import { getRelativeTime, percentage } from '../utils/helpers';

const SmartNotifications = () => {
  const { state, dispatch } = useAppContext();
  const [notifications, setNotifications] = useState([]);
  const [insights, setInsights] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    generateSmartNotifications();
    generateInsights();
  }, []);

  const generateSmartNotifications = () => {
    const smartNotifications = [
      {
        id: 'productivity_trend',
        type: 'insight',
        priority: 'high',
        title: 'Productivity Pattern Detected',
        message: 'You complete 40% more tasks on Tuesday mornings. Consider scheduling important work then.',
        icon: <TrendingUp />,
        timestamp: new Date(),
        actionable: true,
        category: 'productivity',
      },
      {
        id: 'habit_streak',
        type: 'achievement',
        priority: 'medium',
        title: 'Habit Streak Achievement!',
        message: 'You\'ve maintained your morning routine for 14 days straight! Keep it up!',
        icon: <CheckCircle />,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        category: 'habits',
      },
      {
        id: 'budget_alert',
        type: 'warning',
        priority: 'high',
        title: 'Budget Alert',
        message: 'You\'ve spent 85% of your monthly dining budget. Consider cooking at home more often.',
        icon: <Warning />,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        actionable: true,
        category: 'finance',
      },
      {
        id: 'health_reminder',
        type: 'suggestion',
        priority: 'medium',
        title: 'Health Insight',
        message: 'You haven\'t logged a workout in 3 days. How about a quick 15-minute walk?',
        icon: <LightbulbOutlined />,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        actionable: true,
        category: 'health',
      },
      {
        id: 'goal_progress',
        type: 'progress',
        priority: 'low',
        title: 'Goal Progress Update',
        message: 'You\'re 65% towards your "Learn Spanish" goal. Great progress!',
        icon: <AutoAwesome />,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        category: 'goals',
        progress: 65,
      },
    ];

    setNotifications(smartNotifications);
    dispatch({ type: 'SET_NOTIFICATIONS', payload: smartNotifications });
  };

  const generateInsights = () => {
    const aiInsights = [
      {
        id: 'weekly_summary',
        title: 'Weekly Performance Summary',
        description: 'Based on your activity patterns, here are your key metrics:',
        metrics: [
          { label: 'Tasks Completed', value: '89%', trend: 'up' },
          { label: 'Habit Consistency', value: '76%', trend: 'stable' },
          { label: 'Budget Adherence', value: '92%', trend: 'up' },
          { label: 'Health Score', value: '68%', trend: 'down' },
        ],
      },
      {
        id: 'optimization_tips',
        title: 'AI-Powered Optimization Tips',
        description: 'Personalized suggestions to improve your life management:',
        tips: [
          'Schedule your most challenging tasks between 10-11 AM when you\'re most focused.',
          'Block 30 minutes every Sunday for weekly planning - it increases success by 42%.',
          'Your workout consistency improves when scheduled right after breakfast.',
          'Consider automating your monthly budget review - you rarely miss scheduled tasks.',
        ],
      },
    ];

    setInsights(aiInsights);
  };

  const handleNotificationAction = (notificationId, action) => {
    switch (action) {
      case 'schedule_workout':
        // Add workout to calendar
        console.log('Scheduling workout...');
        break;
      case 'review_budget':
        // Navigate to budget page
        console.log('Reviewing budget...');
        break;
      case 'optimize_schedule':
        // Suggest schedule optimization
        console.log('Optimizing schedule...');
        break;
      default:
        break;
    }
    
    // Mark as acted upon
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, actedUpon: true }
          : notif
      )
    );
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const toggleExpanded = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colors[priority] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      insight: '#2196f3',
      achievement: '#4caf50',
      warning: '#ff9800',
      suggestion: '#9c27b0',
      progress: '#00bcd4'
    };
    return colors[type] || '#757575';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <NotificationsActive color="primary" />
        Smart Notifications & Insights
      </Typography>

      {/* Active Notifications */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Active Notifications ({notifications.length})
        </Typography>
        
        {notifications.length === 0 ? (
          <Alert severity="info">No new notifications at the moment!</Alert>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  borderLeft: 4,
                  borderLeftColor: getTypeColor(notification.type),
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemIcon sx={{ color: getTypeColor(notification.type) }}>
                  {notification.icon}
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.priority}
                        size="small"
                        color={getPriorityColor(notification.priority)}
                        variant="outlined"
                      />
                      <Chip
                        label={notification.category}
                        size="small"
                        variant="filled"
                        sx={{ bgcolor: getTypeColor(notification.type), color: 'white' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {notification.message}
                      </Typography>
                      
                      {notification.progress && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={notification.progress}
                            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption">
                            {notification.progress}%
                          </Typography>
                        </Box>
                      )}
                      
                      <Typography variant="caption" color="text.disabled">
                        {getRelativeTime(notification.timestamp)}
                      </Typography>
                      
                      {notification.actionable && !notification.actedUpon && (
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleNotificationAction(notification.id, 'primary_action')}
                          >
                            Take Action
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleNotificationAction(notification.id, 'dismiss')}
                          >
                            Later
                          </Button>
                        </Box>
                      )}
                    </Box>
                  }
                />
                
                <IconButton
                  size="small"
                  onClick={() => dismissNotification(notification.id)}
                  sx={{ ml: 1 }}
                >
                  <Close />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* AI Insights */}
      {insights.map((insight) => (
        <Paper key={insight.id} sx={{ mb: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => toggleExpanded(insight.id)}
          >
            <Box>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesome color="primary" />
                {insight.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {insight.description}
              </Typography>
            </Box>
            <IconButton>
              {expanded[insight.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          
          <Collapse in={expanded[insight.id]}>
            <Box sx={{ p: 2, pt: 0 }}>
              {insight.metrics && (
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
                  {insight.metrics.map((metric, index) => (
                    <Paper key={index} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main">
                        {metric.value}
                      </Typography>
                      <Typography variant="body2">
                        {metric.label}
                      </Typography>
                      <Chip
                        label={metric.trend}
                        size="small"
                        color={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'error' : 'default'}
                        sx={{ mt: 0.5 }}
                      />
                    </Paper>
                  ))}
                </Box>
              )}
              
              {insight.tips && (
                <List>
                  {insight.tips.map((tip, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <LightbulbOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default SmartNotifications;
