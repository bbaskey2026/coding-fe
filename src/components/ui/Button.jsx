import React from "react";
import ButtonMui from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | outline | ghost | danger | success
  size = "md", // sm | md | lg
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
      case "success":
      case "primary":
        return {
          backgroundColor: "primary.main",
          color: "background.default",
          border: "1px solid transparent",
          boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        };
      default:
        return {};
    }
  };

  const getPadding = () => {
    switch (size) {
      case "sm":
        return { px: 1.5, py: 0.75, fontSize: "11px" };
      case "lg":
        return { px: 3, py: 1.5, fontSize: "16px" };
      default:
        return { px: 2, py: 1, fontSize: "13px" };
    }
  };

  const MotionButton = motion(ButtonMui);

  return (
    <MotionButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: size === "sm" ? 1 : 1.25,
        minWidth: 0,
        lineHeight: 1.2,
        ...getPadding(),
        ...getVariantStyles(),
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={14}
          color="inherit"
          sx={{ mr: 0.5 }}
        />
      )}
      {!loading && Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
      {children}
    </MotionButton>
  );
};

export default Button;
