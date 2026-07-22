import React from "react";
import TooltipMui from "@mui/material/Tooltip";

export const Tooltip = ({
  children,
  content,
  position = "top", // top | bottom | left | right
  ...props
}) => {
  return (
    <TooltipMui
      title={content || ""}
      placement={position}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
            fontSize: "11px",
            fontWeight: "medium",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
            borderRadius: "8px",
            px: 1.5,
            py: 0.5,
          },
        },
        arrow: {
          sx: {
            color: "background.paper",
            "&::before": {
              border: "1px solid",
              borderColor: "divider",
            },
          },
        },
      }}
      {...props}
    >
      <span style={{ display: "inline-block" }}>{children}</span>
    </TooltipMui>
  );
};

export default Tooltip;
