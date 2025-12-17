import React, { Suspense, createContext, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { themes } from "./theme/theme";
import BrandBackground from "./components/BrandBackground";

// Layout Components
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";

// Code splitting with lazy loading for better performance
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const VideoTransition = React.lazy(() =>
  import("./components/VideoTransition")
);
const TaskManager = React.lazy(() => import("./components/TaskManager"));
const HabitTracker = React.lazy(() => import("./components/HabitTracker"));
const FinanceHub = React.lazy(() => import("./components/FinanceHub"));
const HealthTracker = React.lazy(() => import("./components/HealthTracker"));
const GoalManager = React.lazy(() => import("./components/GoalManager"));
const RelationshipManager = React.lazy(() =>
  import("./components/RelationshipManager")
);
const HomeLifestyle = React.lazy(() => import("./components/HomeLifestyle"));
const KnowledgeBase = React.lazy(() => import("./components/KnowledgeBase"));
const Analytics = React.lazy(() => import("./components/Analytics"));
const SmartNotifications = React.lazy(() =>
  import("./components/SmartNotifications")
);

// Auth Components
const Login = React.lazy(() => import("./components/Auth/Login"));
const Register = React.lazy(() => import("./components/Auth/Register"));
const Profile = React.lazy(() => import("./components/Auth/Profile"));

// Styles
import "./App.css";

// Auth Service
import authService from "./services/auth";

// Global App Context for state management
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// Enhanced theme with dark mode support
import "./theme/gradients.css";

// App state reducer for better state management
const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME_MODE":
      return { ...state, themeMode: action.payload };
    case "SET_SIDEBAR_OPEN":
      return { ...state, sidebarOpen: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  themeMode: "light",
  sidebarOpen: false, // Sidebar starts closed - user clicks button to open
  loading: false,
  notifications: [],
};

// Loading component
const LoadingSpinner = () => (
  <Backdrop open sx={{ color: "#fff", zIndex: 9999 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, themeMode, sidebarOpen, loading } = state;
  const theme = React.useMemo(
    () => (themeMode === "dark" ? themes.dark : themes.light),
    [themeMode]
  );

  React.useEffect(() => {
    // Initialize auth service and check backend session
    const initializeAuth = async () => {
      const storedTheme = localStorage.getItem("themeMode") || "light";
      dispatch({ type: "SET_THEME_MODE", payload: storedTheme });

      // Initialize auth service (checks backend for valid session)
      await authService.init();

      // Get current user from auth service (init already fetched it)
      const currentUser =
        authService.user || (await authService.getCurrentUser());

      if (currentUser) {
        // User is authenticated, set user in state
        const userData = {
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.email?.split("@")[0] || "User",
          role: currentUser.role,
        };
        dispatch({ type: "SET_USER", payload: userData });
      } else {
        // No valid session, clear any stale data
        localStorage.removeItem("user");
        dispatch({ type: "SET_USER", payload: null });
      }
    };

    initializeAuth();
  }, []);

  const handleSidebarToggle = React.useCallback(() => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: !sidebarOpen });
  }, [sidebarOpen]);

  const toggleTheme = React.useCallback(() => {
    const newMode = themeMode === "light" ? "dark" : "light";
    dispatch({ type: "SET_THEME_MODE", payload: newMode });
    localStorage.setItem("themeMode", newMode);
  }, [themeMode]);

  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,
      toggleTheme,
    }),
    [state, toggleTheme]
  );

  // Wrapper to provide navigation to the VideoTransition route
  function VideoTransitionWrapper() {
    const navigate = useNavigate();
    return (
      <VideoTransition
        onComplete={() => navigate("/dashboard")}
        videoPath={"/video.mp4"}
      />
    );
  }

  if (!user) {
    return (
      <>
        <BrandBackground />
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
      </>
    );
  }

  return (
    <>
      <BrandBackground />
      <AppContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading && <LoadingSpinner />}
          <Router>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Header onMenuClick={handleSidebarToggle} />

              <Box sx={{ display: "flex", flex: 1 }}>
                <Sidebar
                  open={sidebarOpen}
                  onClose={() =>
                    dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })
                  }
                />

                <Box component="main" sx={{ flex: 1, p: 3, mt: 8 }}>
                  <Suspense
                    fallback={
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="400px"
                      >
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <Routes>
                      <Route
                        path="/video"
                        element={
                          <React.Suspense>
                            <VideoTransitionWrapper />
                          </React.Suspense>
                        }
                      />
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tasks" element={<TaskManager />} />
                      <Route path="/habits" element={<HabitTracker />} />
                      <Route path="/finance" element={<FinanceHub />} />
                      <Route path="/health" element={<HealthTracker />} />
                      <Route path="/goals" element={<GoalManager />} />
                      <Route
                        path="/relationships"
                        element={<RelationshipManager />}
                      />
                      <Route path="/home" element={<HomeLifestyle />} />
                      <Route path="/knowledge" element={<KnowledgeBase />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route
                        path="/notifications"
                        element={<SmartNotifications />}
                      />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </Suspense>
                </Box>
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
