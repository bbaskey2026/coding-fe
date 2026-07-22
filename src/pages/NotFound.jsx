import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal, ShieldAlert } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blur */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          backgroundColor: "rgba(211, 47, 47, 0.05)",
          borderRadius: "50%",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        sx={{ width: "100%", maxWidth: "400px", textAlign: "center" }}
      >
        <Card style={{ padding: "32px", borderColor: "rgba(211, 47, 47, 0.2)", boxShadow: "0 0 30px rgba(239,68,68,0.05)" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              color: "#D32F2F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              border: "1px solid rgba(211, 47, 47, 0.2)",
            }}
          >
            <ShieldAlert size={24} />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary", fontFamily: "monospace" }}>
            404
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#D32F2F",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              fontFamily: "monospace",
              mt: 0.5,
              display: "block",
            }}
          >
            Compilation Error: Page Not Found
          </Typography>

          <Box
            sx={{
              my: 3,
              p: 2,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: "8px",
              textAlign: "left",
              fontSize: "12px",
              fontFamily: "monospace",
              color: "text.secondary",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ color: "#D32F2F" }}>// Path validation fail</Box>
            <Box><span style={{ color: "#FFD700" }}>const</span> <span style={{ color: "#FFFFFF" }}>routeStatus</span> = getRoute(window.location.pathname);</Box>
            <Box sx={{ color: "#D32F2F" }}>throw new RouteNotFoundError(404);</Box>
          </Box>

          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: "light", maxWidth: 280, mx: "auto", mb: 3, display: "block", lineHeight: 1.6 }}
          >
            The page directory you are attempting to compile does not exist or has been shifted.
          </Typography>

          <Link to="/" style={{ textDecoration: "none", display: "block" }}>
            <Button style={{ width: "100%", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <ArrowLeft size={14} /> Return to Dashboard
            </Button>
          </Link>
        </Card>
      </Box>
    </Box>
  );
};
export default NotFound;
