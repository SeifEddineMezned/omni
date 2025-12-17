import React, { Suspense, createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { Box, CircularProgress, Backdrop } from '@mui/material';

// Layout Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

// Code splitting with lazy loading for better performance
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const TaskManager = React.lazy(() => import('./components/TaskManager'));
const HabitTracker = React.lazy(() => import('./components/HabitTracker'));
const FinanceHub = React.lazy(() => import('./components/FinanceHub'));
const HealthTracker = React.lazy(() => import('./components/HealthTracker'));
const GoalManager = React.lazy(() => import('./components/GoalManager'));
const RelationshipManager = React.lazy(() => import('./components/RelationshipManager'));
const HomeLifestyle = React.lazy(() => import('./components/HomeLifestyle'));
const KnowledgeBase = React.lazy(() => import('./components/KnowledgeBase'));
const Analytics = React.lazy(() => import('./components/Analytics'));
const SmartNotifications = React.lazy(() => import('./components/SmartNotifications'));

// Auth Components
const Login = React.lazy(() => import('./components/Auth/Login'));
const Register = React.lazy(() => import('./components/Auth/Register'));
const Profile = React.lazy(() => import('./components/Auth/Profile'));

// Styles
import './App.css';

// Global App Context for state management
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// Enhanced theme with dark mode support
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// App state reducer for better state management
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME_MODE':
      return { ...state, themeMode: action.payload };
    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  themeMode: 'light',
  sidebarOpen: false,
  loading: false,
  notifications: [],
};

// Loading component
const LoadingSpinner = () => (
  <Backdrop open sx={{ color: '#fff', zIndex: 9999 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, themeMode, sidebarOpen, loading } = state;
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode]);

  React.useEffect(() => {
    // Check for stored user session and theme preference
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('themeMode') || 'light';
    
    if (storedUser) {
      try {
        dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    
    dispatch({ type: 'SET_THEME_MODE', payload: storedTheme });
  }, []);

  const handleSidebarToggle = React.useCallback(() => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: !sidebarOpen });
  }, [sidebarOpen]);

  const toggleTheme = React.useCallback(() => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME_MODE', payload: newMode });
    localStorage.setItem('themeMode', newMode);
  }, [themeMode]);

  const contextValue = React.useMemo(() => ({
    state,
    dispatch,
    toggleTheme,
  }), [state, toggleTheme]);

  if (!user) {
    return (
      <AppContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading && <LoadingSpinner />}
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Login />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading && <LoadingSpinner />}
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onMenuClick={handleSidebarToggle} />
            
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Sidebar 
                open={sidebarOpen} 
                onClose={() => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })} 
              />
              
              <Box component="main" sx={{ flex: 1, p: 3, mt: 8 }}>
                <Suspense fallback={
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                  </Box>
                }>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<TaskManager />} />
                    <Route path="/habits" element={<HabitTracker />} />
                    <Route path="/finance" element={<FinanceHub />} />
                    <Route path="/health" element={<HealthTracker />} />
                    <Route path="/goals" element={<GoalManager />} />
                    <Route path="/relationships" element={<RelationshipManager />} />
                    <Route path="/home" element={<HomeLifestyle />} />
                    <Route path="/knowledge" element={<KnowledgeBase />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/notifications" element={<SmartNotifications />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Suspense>
              </Box>
            </Box>
            
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
