import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = "primary", // primary | accent | success | danger | warning
  showLabel = false,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getColors = () => {
    return {
      barColor: "primary.main",
      glow: "none",
    };
  };

  const colors = getColors();

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }} {...props}>
      {showLabel && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Progress</Typography>
          <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>{Math.round(percentage)}%</Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "background.card",
          border: "1px solid",
          borderColor: "rgba(44, 44, 44, 0.4)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
            backgroundColor: colors.barColor,
            boxShadow: colors.glow,
          },
        }}
      />
    </Box>
  );
};

export const ProgressRing = ({
  value = 0,
  max = 100,
  size = 60,
  strokeWidth = 5,
  color = "primary.main", // Default to theme primary main
  label = "",
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyCenter: "center" }} {...props}>
      {/* Background circle track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={strokeWidth}
        sx={{
          color: "rgba(44, 44, 44, 0.6)",
          position: "absolute",
        }}
      />
      {/* Foreground progress circle */}
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={strokeWidth}
        sx={{
          color: color,
          transform: "rotate(-90deg) !important",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      {/* Centered label */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" sx={{ fontSize: "12px", fontWeight: "bold", color: "text.primary" }}>
          {label || `${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
