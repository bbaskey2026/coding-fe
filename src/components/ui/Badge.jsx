import React from "react";
import Box from "@mui/material/Box";

export const Badge = ({
  children,
  variant = "default", // default | success | warning | danger | info | primary | outline
  size = "md", // sm | md
  ...props
}) => {
  const getColors = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          color: "primary.main",
        };
      case "success":
        return {
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          color: "primary.main",
        };
      case "warning":
        return {
          backgroundColor: "rgba(255, 215, 0, 0.1)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          color: "#FFD700",
        };
      case "danger":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#FFFFFF",
        };
      case "info":
        return {
          backgroundColor: "rgba(255, 215, 0, 0.08)",
          border: "1px solid rgba(255, 215, 0, 0.15)",
          color: "#FFD700",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        };
      default:
        return {
          backgroundColor: "background.card",
          border: "1px solid",
          borderColor: "divider",
          color: "text.secondary",
        };
    }
  };

  const colors = getColors();

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        borderRadius: "9999px",
        userSelect: "none",
        px: size === "sm" ? 1 : 1.25,
        py: size === "sm" ? 0.25 : 0.5,
        fontSize: size === "sm" ? "10px" : "12px",
        lineHeight: 1,
        ...colors,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
