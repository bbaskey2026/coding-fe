import React from "react";
import { X } from "lucide-react";

// MUI Imports
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md", // sm | md | lg | xl
  drawer = false, // If true, behaves like a slide-out drawer from the right
  ...props
}) => {
  const muiMaxWidth = {
    sm: "xs", // max-w-md -> xs/sm
    md: "sm", // max-w-xl -> sm
    lg: "md", // max-w-3xl -> md
    xl: "lg", // max-w-5xl -> lg
  }[size] || "sm";

  const renderInnerContent = () => (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {title && (
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
            {title}
          </Typography>
        )}
        <IconButton
          onClick={onClose}
          sx={{
            color: "text.secondary",
            borderRadius: "8px",
            p: 0.75,
            "&:hover": {
              color: "text.primary",
              backgroundColor: "background.card",
            },
          }}
        >
          <X size={18} />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 2.5,
          fontSize: "14px",
          color: "text.secondary",
          lineHeight: 1.6,
        }}
      >
        {children}
      </Box>
    </>
  );

  if (drawer) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 512, // max-w-lg in Tailwind is 32rem = 512px
            backgroundColor: "background.paper",
            borderLeft: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
            backgroundImage: "none",
          },
        }}
        {...props}
      >
        {renderInnerContent()}
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={muiMaxWidth}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
          m: 2,
          backgroundImage: "none",
        },
      }}
      {...props}
    >
      {renderInnerContent()}
    </Dialog>
  );
};

export default Modal;
