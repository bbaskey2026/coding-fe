import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

export const Input = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  ...props
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, width: "100%" }}>
      {label && (
        <Box component="label" htmlFor={id} sx={{ fontSize: "12px", fontWeight: "bold", color: "text.secondary" }}>
          {label} {required && <Box component="span" sx={{ color: "#FFFFFF" }}>*</Box>}
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: error ? "#D32F2F" : "divider",
          borderRadius: "8px",
          px: 1.5,
          py: 1,
          transition: "border-color 0.2s",
          "&:focus-within": {
            borderColor: error ? "#D32F2F" : "primary.main",
            boxShadow: `0 0 0 1px ${error ? "#D32F2F" : "var(--mui-palette-primary-main)"}`,
          },
        }}
      >
        {Icon && (
          <Box sx={{ mr: 1.25, display: "flex", alignItems: "center", color: "text.secondary" }}>
            <Icon size={16} />
          </Box>
        )}
        <InputBase
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          fullWidth
          sx={{
            fontSize: "14px",
            color: "text.primary",
            "& .MuiInputBase-input": {
              p: 0,
            },
          }}
          {...props}
        />
      </Box>
      {error && (
        <Typography variant="caption" sx={{ color: "#D32F2F", fontWeight: "medium", mt: 0.25 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export const TextArea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  required = false,
  ...props
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, width: "100%" }}>
      {label && (
        <Box component="label" htmlFor={id} sx={{ fontSize: "12px", fontWeight: "bold", color: "text.secondary" }}>
          {label} {required && <Box component="span" sx={{ color: "#FFFFFF" }}>*</Box>}
        </Box>
      )}
      <InputBase
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        multiline
        rows={rows}
        fullWidth
        sx={{
          fontSize: "14px",
          color: "text.primary",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: error ? "#D32F2F" : "divider",
          borderRadius: "8px",
          px: 1.5,
          py: 1.25,
          transition: "border-color 0.2s",
          "&:focus-within": {
            borderColor: error ? "#D32F2F" : "primary.main",
            boxShadow: `0 0 0 1px ${error ? "#D32F2F" : "var(--mui-palette-primary-main)"}`,
          },
        }}
        {...props}
      />
      {error && (
        <Typography variant="caption" sx={{ color: "#D32F2F", fontWeight: "medium", mt: 0.25 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
