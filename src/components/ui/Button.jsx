import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | outline | ghost | danger | success
  size = "md", // sm | md | lg
  className = "",
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-text-primary hover:bg-primary-dark shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    secondary: "bg-surface border border-border text-text-primary hover:bg-card",
    outline: "bg-transparent border border-border text-text-primary hover:bg-card hover:border-text-secondary",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-card/40",
    danger: "bg-danger text-text-primary hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] focus:ring-danger",
    success: "bg-success text-text-primary hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)] focus:ring-success"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
      {children}
    </motion.button>
  );
};
