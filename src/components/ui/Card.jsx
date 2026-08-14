import React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { motion } from "framer-motion";

export const Card = ({
  children,
  hoverGlow = false,
  glowColor = "primary", // primary | accent | success | danger | warning
  onClick,
  ...props
}) => {
  const getGlowStyles = () => {
    if (!hoverGlow) return {};
    return {
      "&:hover": {
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        borderColor: "text.primary",
      },
    };
  };

  const cardStyles = {
    backgroundColor: "background.paper",
    boxShadow: "none",
    p: 3,
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    textAlign: "left",
    border: "1.5px solid",
    borderColor: "divider",
    transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
    ...getGlowStyles(),
  };

  if (onClick) {
    const MotionButtonBase = motion(ButtonBase);
    return (
      <MotionButtonBase
        onClick={onClick}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
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
      </MotionButtonBase>
    );
  }

  return (
    <Box
      component={motion.div}
      whileHover={hoverGlow ? { y: -4, scale: 1.01 } : undefined}
      sx={cardStyles}
      {...props}
    >
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
