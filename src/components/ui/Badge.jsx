import React from "react";

export const Badge = ({
  children,
  variant = "default", // default | success | warning | danger | info | primary | outline
  className = "",
  size = "md", // sm | md
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full select-none";

  const variants = {
    default: "bg-card border border-border text-text-secondary",
    primary: "bg-primary/10 border border-primary/20 text-primary",
    success: "bg-success/10 border border-success/20 text-success",
    warning: "bg-warning/10 border border-warning/20 text-warning",
    danger: "bg-danger/10 border border-danger/20 text-danger",
    info: "bg-accent/10 border border-accent/20 text-accent",
    outline: "bg-transparent border border-border text-text-primary"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs"
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
