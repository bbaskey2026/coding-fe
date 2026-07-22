import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export const Dropdown = ({
  label,
  options = [], // [{ value, label, icon: Icon }]
  selected,
  onSelect,
  placeholder = "Select option",
  align = "left", // left | right
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    onSelect(value);
    handleClose();
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <Box sx={{ position: "relative" }} {...props}>
      <Button
        onClick={handleClick}
        endIcon={
          <ChevronDown
            size={14}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        }
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1,
          fontSize: "14px",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          color: "text.primary",
          textTransform: "none",
          width: "100%",
          textAlign: "left",
          "&:hover": {
            backgroundColor: "background.card",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selectedOption?.icon && <selectedOption.icon size={16} style={{ color: "#CFCFCF" }} />}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: align === "right" ? "right" : "left", vertical: "top" }}
        anchorOrigin={{ horizontal: align === "right" ? "right" : "left", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.5)",
            p: 0.75,
          },
        }}
      >
        {options.length === 0 ? (
          <MenuItem disabled sx={{ justifyContent: "center", py: 1.5 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>No options available</Typography>
          </MenuItem>
        ) : (
          options.map((opt) => {
            const isSel = opt.value === selected;
            return (
              <MenuItem
                key={opt.value}
                selected={isSel}
                onClick={() => handleSelect(opt.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  fontSize: "14px",
                  borderRadius: "8px",
                  py: 1,
                  px: 1.5,
                  color: isSel ? "background.default" : "text.secondary",
                  backgroundColor: isSel ? "primary.main" : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "background.default",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                  "&:hover": {
                    color: isSel ? "background.default" : "text.primary",
                    backgroundColor: isSel ? "primary.main" : "background.card",
                  },
                }}
              >
                {opt.icon && <opt.icon size={16} style={{ color: isSel ? "inherit" : "#CFCFCF" }} />}
                <Typography variant="body2" sx={{ flexGrow: 1, fontSize: "inherit", fontWeight: isSel ? "bold" : "normal" }}>
                  {opt.label}
                </Typography>
              </MenuItem>
            );
          })
        )}
      </Menu>
    </Box>
  );
};

export default Dropdown;
