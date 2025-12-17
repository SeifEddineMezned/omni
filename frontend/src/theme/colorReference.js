/**
 * THEME COLOR REFERENCE - LOGO-ONLY PALETTE
 *
 * This theme uses ONLY the colors from your orbital logo:
 * Cyan/Teal → Purple → Pink
 *
 * NO NAVY BLUE - Everything is built from the cyan, purple, and pink gradients.
 */

// ============================================================================
// COLOR PALETTE QUICK REFERENCE
// ============================================================================

export const LOGO_COLORS = {
  // Primary: Cyan/Teal
  CYAN_VIBRANT: "#00D9FF",
  CYAN_MAIN: "#00CED1",
  CYAN_LIGHT: "#20E3E8",
  CYAN_DARKER: "#009DAF",
  CYAN_DARKEST: "#006B77",

  // Secondary: Purple
  PURPLE_LIGHT: "#A855F7",
  PURPLE_MAIN: "#9D4EDD",
  PURPLE_DARK: "#7B2CBF",
  PURPLE_DARKER: "#6A1B9A",
  PURPLE_DARKEST: "#4A0E4E",

  // Accent: Pink/Magenta
  PINK_LIGHT: "#FF1B8D",
  PINK_MAIN: "#FF006E",
  PINK_VIBRANT: "#E91E8C",
  PINK_DARKER: "#C41E6B",
  PINK_DARKEST: "#8B0052",

  // Dark mode backgrounds (DARK PURPLE & DARK CYAN - NOT NAVY)
  DARK_PURPLE_DARKEST: "#2A1B4E",
  DARK_PURPLE_DARK: "#3D2871",
  DARK_PURPLE_MEDIUM: "#4A3580",
  DARK_PURPLE_LIGHT: "#5B4691",

  DARK_CYAN_DARKEST: "#0F3B42",
  DARK_CYAN_DARK: "#134B55",
  DARK_CYAN_MEDIUM: "#1A5F6D",
  DARK_CYAN_LIGHT: "#227A87",

  // Light mode backgrounds
  LIGHT_BG: "#F5F0FF", // Light purple tint
  LIGHT_SURFACE: "#FFFFFF",
  LIGHT_ACCENT_BG: "#F0FFFF", // Light cyan tint
};

// ============================================================================
// GRADIENT QUICK REFERENCE
// ============================================================================

export const GRADIENTS = {
  // Complete orbital journey: Cyan → Purple → Pink
  logoFlow:
    "linear-gradient(135deg, #00D9FF 0%, #00CED1 20%, #A855F7 50%, #9D4EDD 75%, #FF006E 100%)",

  // Cyan → Purple
  primaryOrbit:
    "linear-gradient(135deg, #00CED1 0%, #20E3E8 25%, #A855F7 75%, #9D4EDD 100%)",

  // Purple → Pink
  accentOrbit: "linear-gradient(135deg, #9D4EDD 0%, #A855F7 50%, #FF006E 100%)",

  // Cyan → Pink
  cyanToPink: "linear-gradient(135deg, #20E3E8 0%, #FF006E 100%)",
};

// ============================================================================
// COMPONENT STYLING EXAMPLES - Use in your sx props
// ============================================================================

export const componentExamples = {
  // Gradient button with logo flow
  gradientButton: {
    background:
      "linear-gradient(135deg, #00D9FF 0%, #00CED1 20%, #A855F7 50%, #9D4EDD 75%, #FF006E 100%)",
    color: "white",
    fontWeight: 600,
    "&:hover": {
      boxShadow: "0 12px 24px rgba(0, 217, 255, 0.3)",
      transform: "translateY(-2px)",
    },
  },

  // Gradient text
  gradientText: {
    background: "linear-gradient(135deg, #00D9FF 0%, #FF006E 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 600,
  },

  // Card with cyan accent border
  cyanAccentCard: {
    borderLeft: "4px solid #20E3E8",
    paddingLeft: 2,
    background: "rgba(0, 217, 255, 0.05)",
    "&:hover": {
      boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
    },
  },

  // Purple sidebar item
  purpleSidebarItem: {
    color: "#A855F7",
    "&:hover": {
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      borderLeft: "3px solid #A855F7",
    },
  },

  // Pink accent text
  pinkAccent: {
    color: "#FF006E",
    fontWeight: 500,
  },

  // Glow effect (dark mode)
  glowEffect: {
    boxShadow: "0 0 20px rgba(0, 217, 255, 0.4)",
  },
};

// ============================================================================
// DARK MODE SPECIFIC COLORS
// ============================================================================

export const darkModeColors = {
  // Background options (choose one or alternate)
  bgPurple: "#2A1B4E", // Very dark purple
  bgCyan: "#0F3B42", // Very dark cyan

  // Primary text: White with cyan accents
  textPrimary: "#FFFFFF",
  textSecondary: "#20E3E8", // Cyan for secondary text

  // Interactive elements
  buttonGradient:
    "linear-gradient(135deg, #00D9FF 0%, #00CED1 20%, #A855F7 50%, #9D4EDD 75%, #FF006E 100%)",
  buttonHover: "linear-gradient(135deg, #20E3E8 0%, #A855F7 100%)",
};

// ============================================================================
// LIGHT MODE SPECIFIC COLORS
// ============================================================================

export const lightModeColors = {
  // Background options
  bgLight: "#F5F0FF", // Light purple tint
  bgAiry: "#FFFFFF",
  bgAccent: "#F0FFFF", // Light cyan tint

  // Text
  textPrimary: "#7B2CBF", // Dark purple
  textSecondary: "#4B5563", // Gray

  // Interactive elements
  buttonGradient:
    "linear-gradient(135deg, #00CED1 0%, #20E3E8 25%, #A855F7 75%, #9D4EDD 100%)",
  buttonHover: "linear-gradient(135deg, #20E3E8 0%, #A855F7 100%)",
};

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

const usageInstructions = `
1. IMPORT IN APP.JS:
   import { ThemeProvider } from '@mui/material/styles';
   import CssBaseline from '@mui/material/CssBaseline';
   import { themes } from './theme/theme';

2. APPLY THEME:
   <ThemeProvider theme={themes.dark}>
     <CssBaseline />
     {/* Your app */}
   </ThemeProvider>

3. USE COLOR TOKENS IN sx PROPS:
   // Gradient text
   sx={{
     background: 'linear-gradient(135deg, #00D9FF 0%, #FF006E 100%)',
     backgroundClip: 'text',
     WebkitBackgroundClip: 'text',
     WebkitTextFillColor: 'transparent',
   }}

4. USE THEME COLORS:
   sx={{
     color: 'primary.main',    // Cyan (#00CED1)
     backgroundColor: 'secondary.main', // Purple (#9D4EDD)
     '&:hover': {
       color: 'info.main',     // Cyan accent
     }
   }}

5. CUSTOM COLORS FROM PALETTE:
   sx={{
     color: theme => theme.palette.secondary.main,
     backgroundColor: theme => theme.palette.primary.dark,
   }}
`;

export default {
  LOGO_COLORS,
  GRADIENTS,
  componentExamples,
  darkModeColors,
  lightModeColors,
  usageInstructions,
};
