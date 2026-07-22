import React from "react";
import Box from "@mui/material/Box";

/**
 * M3ScallopShape - A beautiful Material 3 style scalloped cloud/flower badge.
 * Uses a mathematically calculated 8-point scalloped SVG layout.
 */
export const M3ScallopShape = ({
  fill = "rgba(212, 175, 55, 0.2)",
  stroke = "rgba(212, 175, 55, 0.3)",
  children,
  size = 200,
  ...props
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        width: size,
        height: size,
      }}
      {...props}
    >
      <svg
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
        }}
      >
        {/* Scalloped circle path with 8 outer lobes */}
        <path
          d="M 100 15 
             A 28 28 0 0 1 145 28 
             A 28 28 0 0 1 172 73 
             A 28 28 0 0 1 185 118 
             A 28 28 0 0 1 145 163 
             A 28 28 0 0 1 100 185 
             A 28 28 0 0 1 55 163 
             A 28 28 0 0 1 15 118 
             A 28 28 0 0 1 28 73 
             A 28 28 0 0 1 55 28 
             A 28 28 0 0 1 100 15 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Box sx={{ position: "relative", zIndex: 10, p: 2, textAlign: "center", fontWeight: "bold", letterSpacing: "-0.02em" }}>
        {children}
      </Box>
    </Box>
  );
};

/**
 * M3BlobShape - An organic, asymmetrical fluid blob layout using border-radius configs.
 */
export const M3BlobShape = ({
  children,
  variant = 1, // 1 | 2 | 3
  ...props
}) => {
  const blobStyles = {
    1: {
      borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.15) 100%)",
      border: "1px solid rgba(212, 175, 55, 0.2)",
    },
    2: {
      borderRadius: "70% 30% 52% 48% / 60% 40% 60% 40%",
      background: "linear-gradient(45deg, rgba(255, 215, 0, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%)",
      border: "1px solid rgba(255, 215, 0, 0.2)",
    },
    3: {
      borderRadius: "30% 70% 70% 30% / 50% 60% 40% 50%",
      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(184, 134, 11, 0.1) 100%)",
      border: "1px solid rgba(212, 175, 55, 0.25)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        transition: "all 0.5s ease",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.15)",
        ...blobStyles[variant],
      }}
      {...props}
    >
      <Box sx={{ textAlign: "center" }}>{children}</Box>
    </Box>
  );
};

/**
 * M3WaveShape - Renders the right-hand wavy tab design from the design kit image.
 */
export const M3WaveShape = ({
  fill = "rgba(212, 175, 55, 0.2)",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 100 200"
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M 100,0 
           L 100,200 
           L 0,200 
           C 30,170 50,150 20,120 
           C -10,90 20,70 40,40 
           C 50,25 30,10 0,0 
           Z"
        fill={fill}
      />
    </svg>
  );
};
