import React from "react";
import { useTheme } from "@mui/material";
import "./brandBackground.css";

// BrandBackground
// - Expects the logo file to be available at /logo-bg.png (place it into frontend/public/)
// - Adjusts opacity / blend mode based on theme
// - Non-interactive, positioned behind all UI

const BrandBackground = ({ imagePath = "/logo192.png" }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const opacity = isDark ? 0.25 : 0.3; // Much more visible
  const blur = isDark ? "8px" : "6px";
  const mixBlend = isDark ? "screen" : "soft-light";

  return (
    <div
      className="brand-bg"
      style={{
        "--brand-opacity": opacity,
        "--brand-blur": blur,
        "--brand-blend": mixBlend,
      }}
      role="img"
      aria-label="Brand background"
    >
      <div
        className="brand-bg__image"
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default BrandBackground;
