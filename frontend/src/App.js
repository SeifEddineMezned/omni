import React, {
  useState,
  Suspense,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
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

/* Layout Components */
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";

/* Lazy-loaded Pages */
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
const HomeLifestyle = React.lazy(() =>
  import("./components/HomeLifestyle")
);
const KnowledgeBase = React.lazy(() =>
  import("./components/KnowledgeBase")
);
const Analytics = React.lazy(() => import("./components/Analytics"));
const SmartNotifications = React.lazy(() =>
  import("./components/SmartNotifications")
);

/* Auth */
const Login = React.lazy(() => import("./components/Auth/Login"));
const Register = React.lazy(() => import("./components/Auth/Register"));
const Profile = React.lazy(() => import("./components/Auth/Profile"));

/* Styles */
import "./App.css";
import "./theme/gradients.css";

/* Auth Service */
import authService from "./services/auth";

/* Global App Context */
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

/* Reducer */
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
  sidebarOpen: false,
  loading: false,
  notifications: [],
};

/* Loading */
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

  useEffect(() => {
    const initializeAuth = async () => {
      const storedTheme = localStorage.getItem("themeMode") || "light";
      dispatch({ type: "SET_THEME_MODE", payload: storedTheme });

      await authService.init();
      const currentUser =
        authService.user || (await authService.getCurrentUser());

      if (currentUser) {
        dispatch({
          type: "SET_USER",
          payload: {
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.email?.split("@")[0] || "User",
            role: currentUser.role,
          },
        });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    };

    initializeAuth();
  }, []);

  /* 🤖 Load ElevenLabs widget ONLY when authenticated */
  useEffect(() => {
    if (!user) return;

    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, [user]);

  function VideoTransitionWrapper() {
    const navigate = useNavigate();
    return (
      <VideoTransition
        onComplete={() => navigate("/dashboard")}
        videoPath="/video.mp4"
      />
    );
  }

  /* 🔐 UNAUTHENTICATED */
  if (!user) {
    return (
      <>
        <BrandBackground />
        <AppContext.Provider value={{ state, dispatch }}>
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

  /* ✅ AUTHENTICATED APP */
  return (
    <>
      <BrandBackground />
      <AppContext.Provider value={{ state, dispatch }}>
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
              <Header
                onMenuClick={() =>
                  dispatch({
                    type: "SET_SIDEBAR_OPEN",
                    payload: !sidebarOpen,
                  })
                }
              />

              <Box sx={{ display: "flex", flex: 1 }}>
                <Sidebar
                  open={sidebarOpen}
                  onClose={() =>
                    dispatch({
                      type: "SET_SIDEBAR_OPEN",
                      payload: false,
                    })
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
                      <Route path="/video" element={<VideoTransitionWrapper />} />
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

            {/* 🤖 ElevenLabs Assistant – AUTHENTICATED ONLY */}
            <elevenlabs-convai agent-id="agent_6901kcq11vzbffm9bvf4pv3h4kym" />
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
