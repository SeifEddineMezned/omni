import React from "react";
import { Box, Typography } from "@mui/material";
import { MenuBook } from "@mui/icons-material";
import Loader from "./Loader";
import "./KnowledgeBase.css";

const KnowledgeBase = () => {
  return (
    <Box className="kb-container" sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <MenuBook sx={{ mr: 2, color: "primary.main" }} />
        <Typography variant="h4" component="h1">
          Knowledge Base
        </Typography>
      </Box>

      {/* Inline loader placed immediately after the heading */}
      <Box className="kb-loader" sx={{ mb: 4 }}>
        <Loader />
      </Box>

      {/* Card removed per request */}
    </Box>
  );
};

export default KnowledgeBase;
