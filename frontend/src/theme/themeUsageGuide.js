import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { gradients, colorTokens } from "./theme";

/**
 * THEME USAGE GUIDE
 *
 * This file documents how to use the theme throughout your app
 */

// ============================================================================
// 1. SETUP: Import in App.js
// ============================================================================

const appJsExample = `
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from './theme/theme';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
`;

// ============================================================================
// 2. COLOR TOKENS - Direct access to colors
// ============================================================================

export const ColorTokenExample = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Color Tokens
    </Typography>

    {/* Using primary color */}
    <Box
      sx={{
        backgroundColor: colorTokens.cyan.main,
        color: colorTokens.neutral.white,
        p: 2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      Primary Cyan: {colorTokens.cyan.main}
    </Box>

    {/* Using secondary color */}
    <Box
      sx={{
        backgroundColor: colorTokens.pink.main,
        color: colorTokens.neutral.white,
        p: 2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      Secondary Pink: {colorTokens.pink.main}
    </Box>

    {/* Using navy background */}
    <Box
      sx={{
        backgroundColor: colorTokens.navy.dark,
        color: colorTokens.neutral.white,
        p: 2,
        borderRadius: 1,
      }}
    >
      Navy Background: {colorTokens.navy.dark}
    </Box>
  </Box>
);

// ============================================================================
// 3. GRADIENT USAGE - Multiple ways to apply gradients
// ============================================================================

export const GradientExample = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Gradient Examples
    </Typography>

    {/* Method 1: Primary orbital gradient background */}
    <Box
      sx={{
        background: gradients.primaryOrbit,
        height: 120,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        color: "white",
        fontWeight: "bold",
      }}
    >
      Primary Orbit Gradient
    </Box>

    {/* Method 2: Accent orbital gradient */}
    <Box
      sx={{
        background: gradients.accentOrbit,
        height: 120,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        color: "white",
        fontWeight: "bold",
      }}
    >
      Accent Orbit Gradient
    </Box>

    {/* Method 3: Center glow gradient */}
    <Box
      sx={{
        background: gradients.centerGlow,
        height: 120,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        color: "white",
        fontWeight: "bold",
      }}
    >
      Center Glow Gradient
    </Box>
  </Box>
);

// ============================================================================
// 4. COMPONENT STYLING EXAMPLES
// ============================================================================

export const ComponentStylingExample = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Styled Components
    </Typography>

    {/* Gradient Button */}
    <Button
      variant="contained"
      sx={{
        background: gradients.primaryOrbit,
        mb: 2,
        display: "block",
        width: "100%",
      }}
    >
      Gradient Primary Button
    </Button>

    {/* Accent Button */}
    <Button
      variant="contained"
      sx={{
        background: gradients.accentHover,
        mb: 2,
        display: "block",
        width: "100%",
      }}
    >
      Gradient Accent Button
    </Button>

    {/* Card with gradient border effect */}
    <Card
      sx={{
        background:
          "linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(157, 78, 221, 0.1))",
        border: `1px solid rgba(0, 217, 255, 0.2)`,
        mb: 2,
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: `0 0 20px rgba(0, 217, 255, 0.3)`,
          borderColor: "rgba(0, 217, 255, 0.4)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">Card with Cyan Border</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Hover to see the glow effect
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

// ============================================================================
// 5. THEME-AWARE STYLING - Works in both light and dark modes
// ============================================================================

export const ThemeAwareStylingExample = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Theme-Aware Styling
    </Typography>

    {/* This automatically adapts to light/dark mode */}
    <Card
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: "background.paper",
        borderLeft: `4px solid`,
        borderLeftColor: "primary.main",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: (theme) => `0 8px 16px ${theme.palette.primary.main}33`,
        },
      }}
    >
      <Typography variant="body1" sx={{ color: "text.primary" }}>
        This card uses theme colors
      </Typography>
    </Card>

    {/* Using MUI theme tokens */}
    <Box
      sx={{
        p: 2,
        backgroundColor: "action.hover",
        borderRadius: 1,
        color: "text.secondary",
      }}
    >
      Uses MUI theme action.hover color
    </Box>
  </Box>
);

// ============================================================================
// 6. SIDEBAR WITH GRADIENTS
// ============================================================================

export const SidebarGradientExample = () => (
  <Box
    sx={{
      width: 280,
      background: gradients.darkBg,
      p: 2,
      borderRadius: 2,
      color: "white",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        background: gradients.primaryOrbit,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mb: 2,
      }}
    >
      Sidebar with Gradient Text
    </Typography>

    {["Dashboard", "Analytics", "Settings"].map((item) => (
      <Box
        key={item}
        sx={{
          p: 1.5,
          borderRadius: 1,
          mb: 1,
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            borderLeft: `3px solid ${colorTokens.cyan.vibrant}`,
            paddingLeft: "12px",
          },
        }}
      >
        {item}
      </Box>
    ))}
  </Box>
);

// ============================================================================
// 7. CSS VARIABLES FOR GLOBAL USE
// ============================================================================

export const getCssVariables = () => `
:root {
  /* Cyan/Teal */
  --color-cyan-light: ${colorTokens.cyan.light};
  --color-cyan-main: ${colorTokens.cyan.main};
  --color-cyan-vibrant: ${colorTokens.cyan.vibrant};

  /* Purple */
  --color-purple-light: ${colorTokens.purple.light};
  --color-purple-main: ${colorTokens.purple.main};
  --color-purple-dark: ${colorTokens.purple.dark};

  /* Pink */
  --color-pink-light: ${colorTokens.pink.light};
  --color-pink-main: ${colorTokens.pink.main};
  --color-pink-vibrant: ${colorTokens.pink.vibrant};

  /* Gradients */
  --gradient-primary-orbit: ${gradients.primaryOrbit};
  --gradient-accent-orbit: ${gradients.accentOrbit};
  --gradient-center-glow: ${gradients.centerGlow};
  --gradient-dark-bg: ${gradients.darkBg};
}
`;

// ============================================================================
// 8. QUICK REFERENCE: Common sx Props Patterns
// ============================================================================

export const SxPropsReference = {
  // Gradient text
  gradientText: {
    background: gradients.primaryOrbit,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  // Glow effect (dark mode)
  glowEffect: {
    boxShadow: `0 0 20px rgba(0, 217, 255, 0.4)`,
  },

  // Gradient background hover
  gradientHover: {
    transition: "all 0.3s ease",
    "&:hover": {
      background: gradients.primaryHover,
      boxShadow: `0 8px 20px rgba(0, 217, 255, 0.25)`,
    },
  },

  // Cyan border accent
  cyanBorder: {
    borderLeft: `4px solid ${colorTokens.cyan.main}`,
    paddingLeft: 2,
  },

  // Card with orbital gradient
  orbitCard: {
    background: gradients.primaryOrbit,
    backgroundClip: "padding-box",
    border: "1px solid transparent",
  },
};

// ============================================================================
// 9. COLOR ACCESSIBILITY GUIDE
// ============================================================================

export const AccessibilityGuide = {
  "Cyan on Dark": {
    foreground: colorTokens.cyan.vibrant,
    background: colorTokens.navy.darkest,
    ratio: 11.5, // WCAG AAA
  },
  "White on Navy": {
    foreground: colorTokens.neutral.white,
    background: colorTokens.navy.dark,
    ratio: 11.2, // WCAG AAA
  },
  "Pink on Dark": {
    foreground: colorTokens.pink.light,
    background: colorTokens.navy.darkest,
    ratio: 7.8, // WCAG AA
  },
  "Dark Gray on Light": {
    foreground: colorTokens.gray800,
    background: colorTokens.light.background,
    ratio: 12.6, // WCAG AAA
  },
};

export default {
  appJsExample,
  ColorTokenExample,
  GradientExample,
  ComponentStylingExample,
  ThemeAwareStylingExample,
  SidebarGradientExample,
  getCssVariables,
  SxPropsReference,
  AccessibilityGuide,
};
