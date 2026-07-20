import React from "react";

export const Input = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  error,
  icon: Icon,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-text-secondary">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-text-secondary">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 rounded-lg text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary ${
            Icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5"
          } ${error ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
    </div>
  );
};

export const TextArea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  className = "",
  error,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-text-secondary">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className={`w-full bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 rounded-lg text-sm py-2.5 px-4 transition-all focus:border-primary focus:ring-1 focus:ring-primary resize-none ${
          error ? "border-danger focus:border-danger focus:ring-danger" : ""
        }`}
        {...props}
      />
      {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
    </div>
  );
};
