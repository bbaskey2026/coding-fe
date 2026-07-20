import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  className = "",
  hoverGlow = false,
  glowColor = "primary", // primary | accent | success | danger | warning
  onClick,
  animated = true,
  ...props
}) => {
  const glowClasses = {
    primary: "glow-primary",
    accent: "glow-accent",
    success: "hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:border-success/40",
    danger: "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-danger/40",
    warning: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-warning/40"
  };

  const Component = onClick ? motion.button : (animated ? motion.div : "div");
  const interactiveProps = onClick
    ? {
        onClick,
        whileHover: { y: -4, scale: 1.01 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    : (animated ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
      } : {});

  return (
    <Component
      className={`glass-card p-6 rounded-xl flex flex-col justify-between overflow-hidden text-left ${
        hoverGlow ? glowClasses[glowColor] : ""
      } ${onClick ? "cursor-pointer focus:outline-none w-full" : ""} ${className}`}
      {...interactiveProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 flex items-center justify-between border-b border-border/40 pb-3 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`flex-1 text-text-secondary text-sm leading-relaxed ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs ${className}`}>
    {children}
  </div>
);
