import React, { useState, useEffect, useRef } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { SkipNext } from "@mui/icons-material";

/**
 * VideoTransition Component
 *
 * Plays a loading/transition video after login and before dashboard.
 * Features:
 * - Full-screen overlay with fade animations
 * - Auto-play and auto-advance to dashboard on video end
 * - Skip button appears after 2 seconds
 * - Error handling with fallback
 * - Smooth transitions between states
 */

const VideoTransition = ({ onComplete, videoPath = "/video.mp4" }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [fade, setFade] = useState(false);
  const skipTimeoutRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  // Show skip button after 2 seconds
  useEffect(() => {
    skipTimeoutRef.current = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => {
      if (skipTimeoutRef.current) {
        clearTimeout(skipTimeoutRef.current);
      }
    };
  }, []);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoEnded = () => {
    // Fade out before transition
    setFade(false);
    fadeTimeoutRef.current = setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
    setVideoError(true);
    setIsLoading(false);
    // Auto-complete after 2 seconds if video fails
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleSkip = () => {
    setFade(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: fade ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        overflow: "hidden",
      }}
    >
      {/* Background gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #2A1B4E 0%, #3D2871 50%, #4A3580 100%)",
          zIndex: 0,
        }}
      />

      {/* Video container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              zIndex: 2,
            }}
          >
            <CircularProgress
              sx={{
                color: "primary.main",
                size: 60,
              }}
            />
          </Box>
        )}

        {videoError && (
          <Box
            sx={{
              position: "absolute",
              textAlign: "center",
              color: "text.primary",
              zIndex: 2,
              px: 2,
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              Loading your experience...
            </div>
            <CircularProgress sx={{ color: "primary.main" }} />
          </Box>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          onLoadedData={handleVideoLoaded}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          autoPlay
          muted
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Skip button */}
        {showSkip && !videoError && (
          <Button
            onClick={handleSkip}
            startIcon={<SkipNext />}
            sx={{
              position: "absolute",
              bottom: 40,
              right: 40,
              backgroundColor: "rgba(0, 217, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600,
              transition: "all 0.3s ease",
              zIndex: 3,
              "&:hover": {
                backgroundColor: "rgba(0, 217, 255, 0.3)",
                boxShadow: "0 0 20px rgba(0, 217, 255, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Skip
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default VideoTransition;
