import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Heatmap = ({ data = [], ...props }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getColorStyles = (count) => {
    if (count === 0) return { backgroundColor: "rgba(128, 128, 128, 0.05)", borderColor: "rgba(128, 128, 128, 0.1)" };
    if (count <= 2) return { backgroundColor: "rgba(128, 128, 128, 0.25)", borderColor: "rgba(128, 128, 128, 0.35)" };
    if (count <= 4) return { backgroundColor: "rgba(128, 128, 128, 0.5)", borderColor: "rgba(128, 128, 128, 0.6)" };
    if (count <= 6) return { backgroundColor: "rgba(128, 128, 128, 0.75)", borderColor: "rgba(128, 128, 128, 0.85)" };
    return { backgroundColor: "var(--mui-palette-text-primary)", borderColor: "var(--mui-palette-divider)" };
  };

  // Group 365 days into columns of 7
  const cols = [];
  let tempCol = [];
  for (let i = 0; i < 364; i++) {
    tempCol.push(data[i] || 0);
    if (tempCol.length === 7) {
      cols.push(tempCol);
      tempCol = [];
    }
  }

  return (
    <Box
      className="glass"
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        overflowX: "auto",
        width: "100%",
      }}
      {...props}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: "semibold", color: "text.primary" }}>
          Coding Submissions Activity
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "10px", color: "text.secondary" }}>
          <span>Less</span>
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "rgba(128, 128, 128, 0.05)", border: "1px solid rgba(128, 128, 128, 0.1)" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "rgba(128, 128, 128, 0.25)", border: "1px solid rgba(128, 128, 128, 0.35)" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "rgba(128, 128, 128, 0.5)", border: "1px solid rgba(128, 128, 128, 0.6)" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "rgba(128, 128, 128, 0.75)", border: "1px solid rgba(128, 128, 128, 0.85)" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "var(--mui-palette-text-primary)", border: "1px solid var(--mui-palette-divider)" }} />
          <span>More</span>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, userSelect: "none", minWidth: "760px" }}>
        {/* Week Day Labels */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            fontSize: "9px",
            color: "text.secondary",
            pr: 0.5,
            fontWeight: "medium",
            mt: 2.25,
            height: "90px",
          }}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </Box>

        {/* Heatmap Columns */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
          {/* Month Labels */}
          <Box sx={{ display: "flex", fontSize: "9px", color: "text.secondary", fontWeight: "medium", pl: 0.25, justifyContent: "space-between" }}>
            {months.map((m) => (
              <span key={m} style={{ width: "50px" }}>{m}</span>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: "3.5px" }}>
            {cols.map((col, cIdx) => (
              <Box key={cIdx} sx={{ display: "flex", flexDirection: "column", gap: "3.5px" }}>
                {col.map((count, rIdx) => {
                  const style = getColorStyles(count);
                  return (
                    <Box
                      key={rIdx}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "1.5px",
                        border: "0.5px solid",
                        transition: "all 0.2s",
                        "&:hover": { transform: "scale(1.25)" },
                        cursor: "pointer",
                        ...style,
                      }}
                      title={`${count} submissions`}
                    />
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Heatmap;
