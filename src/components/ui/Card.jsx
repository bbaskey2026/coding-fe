import React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

export const Card = ({
  children,
  hoverGlow = false,
  glowColor = "primary", // primary | accent | success | danger | warning
  onClick,
  ...props
}) => {
  const getGlowStyles = () => {
    if (!hoverGlow) return {};
    switch (glowColor) {
      case "primary":
        return {
          "&:hover": {
            boxShadow: "0 0 25px rgba(212, 175, 55, 0.15)",
            borderColor: "rgba(212, 175, 55, 0.3)",
          },
        };
      case "accent":
        return {
          "&:hover": {
            boxShadow: "0 0 25px rgba(255, 215, 0, 0.15)",
            borderColor: "rgba(255, 215, 0, 0.3)",
          },
        };
      case "success":
        return {
          "&:hover": {
            boxShadow: "0 0 25px rgba(212, 175, 55, 0.15)",
            borderColor: "rgba(212, 175, 55, 0.4)",
          },
        };
      case "danger":
        return {
          "&:hover": {
            boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.4)",
          },
        };
      case "warning":
        return {
          "&:hover": {
            boxShadow: "0 0 25px rgba(255, 215, 0, 0.15)",
            borderColor: "rgba(255, 215, 0, 0.4)",
          },
        };
      default:
        return {};
    }
  };

  const cardStyles = {
    backgroundColor: "background.paper",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
    p: 3,
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    textAlign: "left",
    border: "1px solid",
    borderColor: "divider",
    transition: "all 0.3s ease",
    ...getGlowStyles(),
  };

  if (onClick) {
    return (
      <ButtonBase
        onClick={onClick}
        sx={{
          ...cardStyles,
          width: "100%",
          cursor: "pointer",
          "&:focus-visible": {
            outline: "2px solid #D4AF37",
          },
        }}
        {...props}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {children}
        </Box>
      </ButtonBase>
    );
  }

  return (
    <Box sx={cardStyles} {...props}>
      {children}
    </Box>
  );
};

export const CardHeader = ({ children, ...props }) => (
  <Box
    sx={{
      mb: 2,
      pb: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(44, 44, 44, 0.4)",
    }}
    {...props}
  >
    {children}
  </Box>
);

export const CardBody = ({ children, ...props }) => (
  <Box
    sx={{
      flex: 1,
      color: "text.secondary",
      fontSize: "14px",
      lineHeight: 1.6,
    }}
    {...props}
  >
    {children}
  </Box>
);

export const CardFooter = ({ children, ...props }) => (
  <Box
    sx={{
      mt: 2,
      pt: 1.5,
      borderTop: "1px solid rgba(44, 44, 44, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "12px",
    }}
    {...props}
  >
    {children}
  </Box>
);

export default Card;
