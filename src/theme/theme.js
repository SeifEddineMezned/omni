import { createTheme } from "@mui/material/styles";

// ============================================================================
// COLOR PALETTE DEFINITIONS - LOGO COLORS ONLY
// ============================================================================

const colorTokens = {
  // Cyan/Teal - Primary (from logo)
  cyan: {
    light: "#20E3E8", // Vibrant
    main: "#00CED1", // Main
    dark: "#00D9FF", // Alternative
    darker: "#009DAF", // Darker variant
    darkest: "#006B77", // For dark backgrounds
  },
  // Purple - Secondary (from logo)
  purple: {
    light: "#A855F7", // Light variant
    main: "#9D4EDD", // Main
    dark: "#7B2CBF", // Dark variant
    darker: "#6A1B9A", // Darker for backgrounds
    darkest: "#4A0E4E", // Very dark for backgrounds
  },
  // Pink/Magenta - Accent (from logo)
  pink: {
    light: "#FF1B8D", // Light
    main: "#FF006E", // Main
    vibrant: "#E91E8C", // Alternative
    darker: "#C41E6B", // Darker variant
    darkest: "#8B0052", // For dark mode
  },
  // Dark mode backgrounds - DARK PURPLES & DARK CYANS (NOT NAVY)
  darkBg: {
    darkest: "#2A1B4E", // Very dark purple
    dark: "#3D2871", // Dark purple
    medium: "#4A3580", // Medium purple
    light: "#5B4691", // Light purple
  },
  // Alternative dark backgrounds using dark cyan
  darkCyan: {
    darkest: "#0F3B42", // Very dark cyan
    dark: "#134B55", // Dark cyan
    medium: "#1A5F6D", // Medium cyan
    light: "#227A87", // Light cyan
  },
  // Light mode backgrounds
  light: {
    background: "#F5F0FF", // Very light purple tint
    surface: "#FFFFFF",
    surfaceAlt: "#F9F6FF", // Light purple tint
    accentBg: "#F0FFFF", // Light cyan tint
  },
  // Neutral colors
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
};

// ============================================================================
// GRADIENT DEFINITIONS - CYAN → PURPLE → PINK
// ============================================================================

export const gradients = {
  // Logo inspired: Cyan → Purple → Pink orbital flow
  logoFlow:
    "linear-gradient(135deg, #00D9FF 0%, #00CED1 20%, #A855F7 50%, #9D4EDD 75%, #FF006E 100%)",

  // Primary gradient: Cyan → Purple
  primaryOrbit:
    "linear-gradient(135deg, #00CED1 0%, #20E3E8 25%, #A855F7 75%, #9D4EDD 100%)",

  // Accent gradient: Purple → Pink
  accentOrbit: "linear-gradient(135deg, #9D4EDD 0%, #A855F7 50%, #FF006E 100%)",

  // Cyan → Pink focal point
  cyanToPink: "linear-gradient(135deg, #20E3E8 0%, #FF006E 100%)",

  // Center glow: Multi-color focal point
  centerGlow: "radial-gradient(circle, #20E3E8 0%, #FF006E 50%, #9D4EDD 100%)",

  // Dark mode: Subtle purple gradient background
  darkPurpleBg:
    "linear-gradient(135deg, #2A1B4E 0%, #3D2871 50%, #4A3580 100%)",

  // Dark mode: Subtle cyan gradient background
  darkCyanBg: "linear-gradient(135deg, #0F3B42 0%, #134B55 50%, #1A5F6D 100%)",

  // Light mode: Subtle purple-tinted background
  lightPurpleBg: "linear-gradient(135deg, #F5F0FF 0%, #F9F6FF 100%)",

  // Light mode: Subtle cyan-tinted background
  lightCyanBg: "linear-gradient(135deg, #F0FFFF 0%, #F5F0FF 100%)",

  // Hover states
  primaryHover: "linear-gradient(135deg, #20E3E8 0%, #A855F7 100%)",
  accentHover: "linear-gradient(135deg, #9D4EDD 0%, #FF1B8D 100%)",

  // Text gradients
  textGradient: "linear-gradient(135deg, #00D9FF 0%, #FF006E 100%)",
  purpleTextGradient: "linear-gradient(135deg, #A855F7 0%, #9D4EDD 100%)",
};

// ============================================================================
// LIGHT MODE THEME
// ============================================================================

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colorTokens.cyan.main, // #00CED1
      light: colorTokens.cyan.light, // #20E3E8
      dark: colorTokens.purple.main, // #9D4EDD
      contrastText: colorTokens.neutral.white,
    },
    secondary: {
      main: colorTokens.purple.main, // #9D4EDD
      light: colorTokens.purple.light, // #A855F7
      dark: colorTokens.purple.dark, // #7B2CBF
      contrastText: colorTokens.neutral.white,
    },
    background: {
      default: colorTokens.light.background, // #F5F0FF (light purple tint)
      paper: colorTokens.light.surface, // #FFFFFF
    },
    surface: {
      main: colorTokens.light.surface,
      alt: colorTokens.light.surfaceAlt,
    },
    text: {
      primary: colorTokens.purple.dark, // #7B2CBF (dark purple text)
      secondary: colorTokens.gray600,
      disabled: colorTokens.gray400,
    },
    divider: colorTokens.cyan.darker,
    error: {
      main: "#EF4444",
      light: "#FCA5A5",
      dark: "#B91C1C",
      contrastText: colorTokens.neutral.white,
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#92400E",
      contrastText: colorTokens.neutral.white,
    },
    success: {
      main: "#10B981",
      light: "#86EFAC",
      dark: "#065F46",
      contrastText: colorTokens.neutral.white,
    },
    info: {
      main: colorTokens.cyan.main, // #00CED1
      light: colorTokens.cyan.light, // #20E3E8
      dark: colorTokens.cyan.darker,
      contrastText: colorTokens.neutral.white,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(0, 217, 255, 0.2)",
          },
        },
        contained: {
          background: gradients.primaryOrbit,
          boxShadow: "0 4px 12px rgba(0, 217, 255, 0.15)",
          "&:hover": {
            background: gradients.primaryHover,
            boxShadow: "0 8px 20px rgba(0, 217, 255, 0.25)",
          },
        },
        outlined: {
          borderColor: colorTokens.cyan.main,
          color: colorTokens.cyan.main,
          "&:hover": {
            backgroundColor: "rgba(0, 217, 255, 0.08)",
            borderColor: colorTokens.purple.main,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${colorTokens.cyan.darker}33`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 217, 255, 0.1)",
            borderColor: colorTokens.cyan.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.2s ease",
            "&:hover fieldset": {
              borderColor: colorTokens.cyan.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: colorTokens.cyan.main,
              boxShadow: `inset 0 0 0 2px rgba(0, 217, 255, 0.1)`,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colorTokens.light.surface,
          color: colorTokens.purple.dark,
          boxShadow: "0 2px 8px rgba(157, 78, 221, 0.1)",
          borderBottom: `1px solid ${colorTokens.cyan.darker}33`,
        },
      },
    },
  },
});

// ============================================================================
// DARK MODE THEME
// ============================================================================

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colorTokens.cyan.light, // #20E3E8
      light: colorTokens.cyan.dark, // #00D9FF
      dark: colorTokens.purple.dark, // #7B2CBF (darker purple)
      contrastText: colorTokens.darkBg.darkest,
    },
    secondary: {
      main: colorTokens.purple.dark, // #7B2CBF (darker)
      light: colorTokens.purple.main, // #9D4EDD
      dark: colorTokens.purple.darker, // #6A1B9A (even darker)
      contrastText: colorTokens.neutral.white,
    },
    background: {
      default: colorTokens.darkBg.darkest, // #2A1B4E (dark purple)
      paper: colorTokens.darkBg.medium, // #4A3580 (medium purple)
    },
    surface: {
      main: colorTokens.darkBg.medium,
      alt: colorTokens.darkBg.light,
    },
    text: {
      primary: colorTokens.neutral.white,
      secondary: colorTokens.cyan.light, // #20E3E8 (cyan accent for secondary text)
      disabled: colorTokens.gray500,
    },
    divider: "rgba(0, 217, 255, 0.12)",
    error: {
      main: "#FF6B6B",
      light: "#FFB3B3",
      dark: "#C92A2A",
      contrastText: colorTokens.neutral.white,
    },
    warning: {
      main: "#FFB921",
      light: "#FFD666",
      dark: "#FF8C42",
      contrastText: colorTokens.neutral.white,
    },
    success: {
      main: "#51CF66",
      light: "#94D82D",
      dark: "#2F9E44",
      contrastText: colorTokens.neutral.white,
    },
    info: {
      main: colorTokens.cyan.light, // #20E3E8
      light: colorTokens.cyan.dark, // #00D9FF
      dark: colorTokens.cyan.main, // #00CED1
      contrastText: colorTokens.darkBg.darkest,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 12px 24px rgba(0, 217, 255, 0.3)`,
          },
        },
        contained: {
          background: gradients.logoFlow,
          boxShadow: `0 4px 12px rgba(0, 217, 255, 0.25)`,
          "&:hover": {
            background: gradients.primaryHover,
            boxShadow: `0 12px 24px rgba(0, 217, 255, 0.35)`,
          },
        },
        outlined: {
          borderColor: colorTokens.cyan.light,
          color: colorTokens.cyan.light,
          "&:hover": {
            backgroundColor: "rgba(0, 217, 255, 0.12)",
            borderColor: colorTokens.cyan.dark,
            boxShadow: `0 0 12px rgba(0, 217, 255, 0.2)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: colorTokens.darkBg.medium,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 1px rgba(0, 217, 255, 0.15)`,
          border: `1px solid rgba(0, 217, 255, 0.2)`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 12px 24px rgba(0, 217, 255, 0.2), inset 0 0 1px rgba(0, 217, 255, 0.3)`,
            borderColor: "rgba(0, 217, 255, 0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundImage: "none",
          backgroundColor: colorTokens.darkBg.medium,
        },
        elevation1: {
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "rgba(0, 217, 255, 0.05)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 217, 255, 0.08)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(0, 217, 255, 0.1)",
              boxShadow: `0 0 12px rgba(0, 217, 255, 0.3)`,
            },
            "&.Mui-focused fieldset": {
              borderColor: colorTokens.cyan.light,
              boxShadow: `inset 0 0 8px rgba(0, 217, 255, 0.2)`,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colorTokens.darkBg.dark,
          boxShadow: `0 4px 12px rgba(0, 217, 255, 0.1)`,
          borderBottom: `1px solid rgba(0, 217, 255, 0.2)`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colorTokens.darkBg.dark,
          backgroundImage: gradients.darkPurpleBg,
          borderRight: `1px solid rgba(0, 217, 255, 0.15)`,
        },
      },
    },
  },
});

// ============================================================================
// EXPORT THEMES
// ============================================================================

export { colorTokens };

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default darkTheme;
