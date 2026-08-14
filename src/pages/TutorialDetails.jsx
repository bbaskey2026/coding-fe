import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, GraduationCap } from "lucide-react";
import { tutorialService } from "../services/tutorial.service";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonBase from "@mui/material/ButtonBase";

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export const TutorialDetails = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        setLoading(true);
        const data = await tutorialService.getTutorialById(id);
        setTutorial(data);
      } catch (err) {
        console.error("Error fetching tutorial details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [id]);

  const handleCopyCode = async () => {
    if (!tutorial) return;
    try {
      await navigator.clipboard.writeText(tutorial.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy code snippet:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!tutorial) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Tutorial not found.
        </Typography>
        <Link to="/tutorials" style={{ color: "var(--mui-palette-text-primary)", fontWeight: "bold" }}>
          Back to Tutorials
        </Link>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ 
        maxWidth: "900px", 
        mx: "auto", 
        px: { xs: 2.5, md: 4 }, 
        pt: 12, 
        pb: 8, 
        textAlign: "left" 
      }}
    >
      {/* Back button */}
      <Link to="/tutorials" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--mui-palette-text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: "bold", marginBottom: "24px" }}>
        <ArrowLeft size={16} /> Back to Tutorials
      </Link>

      {/* Header Info */}
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box sx={{ px: 1.25, py: 0.5, borderRadius: "4px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "text.primary", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", textTransform: "uppercase" }}>
          {tutorial.language}
        </Box>
        <Box sx={{ px: 1.25, py: 0.5, borderRadius: "4px", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "text.secondary", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", textTransform: "uppercase" }}>
          {tutorial.category}
        </Box>
        <Box sx={{ px: 1.25, py: 0.5, borderRadius: "4px", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "text.secondary", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
          {tutorial.difficulty}
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 3, lineHeight: 1.25 }}>
        {tutorial.title}
      </Typography>

      <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />

      {/* Overview/Content */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: "Georgia, serif", 
            fontSize: "1.1rem", 
            lineHeight: 1.7, 
            color: "text.primary" 
          }}
        >
          {tutorial.content}
        </Typography>
      </Box>

      {/* Code Snippet block */}
      <Box sx={{ mb: 4, position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 1.5, backgroundColor: "#18181B", border: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "none", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
          <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary", fontWeight: "bold" }}>
            Code Example
          </Typography>
          <ButtonBase 
            onClick={handleCopyCode}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: "11px",
              color: copied ? "success.main" : "text.secondary",
              fontWeight: "bold",
              px: 1.25,
              py: 0.5,
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.2s",
              "&:hover": { color: "text.primary", borderColor: "rgba(255, 255, 255, 0.2)" }
            }}
          >
            {copied ? (
              <>
                <Check size={12} style={{ color: "#2E9B77" }} /> <span style={{ color: "#2E9B77" }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} /> Copy Code
              </>
            )}
          </ButtonBase>
        </Box>
        <Box 
          sx={{ 
            backgroundColor: "#09090B", 
            border: "1px solid rgba(255, 255, 255, 0.08)", 
            borderBottomLeftRadius: "8px", 
            borderBottomRightRadius: "8px", 
            p: 3, 
            overflowX: "auto" 
          }}
        >
          <pre 
            style={{ 
              margin: 0, 
              fontFamily: "monospace", 
              fontSize: "13px", 
              lineHeight: 1.6, 
              color: "#F4F4F5", 
              textAlign: "left" 
            }}
          >
            <code>{tutorial.codeExample}</code>
          </pre>
        </Box>
      </Box>

      {/* Code Explanation Details */}
      <Box sx={{ p: 4, borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.06)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <GraduationCap size={18} style={{ color: "var(--mui-palette-text-primary)" }} />
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.primary" }}>
            Logic & Code Breakdown
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            whiteSpace: "pre-line", 
            lineHeight: 1.7, 
            color: "text.secondary", 
            fontSize: "14px" 
          }}
        >
          {tutorial.explanation}
        </Typography>
      </Box>
    </Box>
  );
};

export default TutorialDetails;
