import React from "react";
import ButtonMui from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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
      case "secondary":
        return {
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "background.card",
          },
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "background.card",
            borderColor: "text.secondary",
          },
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "text.secondary",
          border: "1px solid transparent",
          "&:hover": {
            color: "text.primary",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        };
      case "danger":
        return {
          backgroundColor: "#D32F2F",
          color: "#FFFFFF",
          border: "1px solid transparent",
          boxShadow: "0 0 15px rgba(211, 47, 47, 0.3)",
          "&:hover": {
            backgroundColor: "#C62828",
          },
        };
      case "success":
        return {
          backgroundColor: "#2E7D32",
          color: "#FFFFFF",
          border: "1px solid transparent",
          boxShadow: "0 0 15px rgba(46, 125, 50, 0.3)",
          "&:hover": {
            backgroundColor: "#1B5E20",
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

  return (
    <ButtonMui
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
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
    </ButtonMui>
  );
};

export default Button;
