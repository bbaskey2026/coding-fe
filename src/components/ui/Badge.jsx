import React from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

export const Badge = ({
  children,
  variant = "default", // default | success | warning | danger | info | primary | outline
  size = "md", // sm | md
  ...props
}) => {
  const getColors = () => {
    switch (variant) {
      case "primary":
      case "success":
      case "warning":
      case "danger":
      case "info":
        return {
          backgroundColor: "rgba(212, 175, 55, 0.08)",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          color: "primary.main",
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
      component={motion.span}
      whileHover={{ scale: 1.05 }}
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
        cursor: "default",
        ...colors,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
