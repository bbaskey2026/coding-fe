import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiGo,
  SiRust,
} from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const textOptions = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Dynamic Programming",
    "Graph Theory",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { icon: <FaPython />, color: "#F59E0B", size: "30px", style: { top: "128px", left: "10%" } },
    { icon: <FaJava />, color: "#F87171", size: "30px", style: { top: "192px", right: "12%" } },
    { icon: <SiCplusplus />, color: "#3B82F6", size: "30px", style: { bottom: "160px", left: "8%" } },
    { icon: <FaJs />, color: "#FACC15", size: "24px", style: { top: "240px", left: "20%" } },
    { icon: <SiTypescript />, color: "#2563EB", size: "24px", style: { bottom: "208px", right: "15%" } },
    { icon: <SiGo />, color: "#06B6D4", size: "24px", style: { top: "160px", left: "35%" } },
    { icon: <FaReact />, color: "#22D3EE", size: "30px", style: { bottom: "144px", right: "30%" } },
    { icon: <SiRust />, color: "#F97316", size: "24px", style: { top: "288px", right: "8%" } },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: 10,
      }}
    >
      {/* ── Background Pattern Layers ── */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        {/* Radial gradients */}
        <Box sx={{ position: "absolute", inset: 0, bg: "radial-gradient(ellipse at top, rgba(212,175,55,0.08), transparent 50%)" }} />
        <Box sx={{ position: "absolute", inset: 0, bg: "radial-gradient(ellipse at bottom right, rgba(255,215,0,0.06), transparent 50%)" }} />

        {/* M3 Dot grid pattern overlay */}
        <Box className="pattern-dots" sx={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* Animated morphing blobs */}
        <Box
          className="animate-pulse-slow"
          sx={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: 384,
            height: 384,
            backgroundColor: "rgba(212, 175, 55, 0.08)",
            borderRadius: "50%",
            filter: "blur(72px)",
          }}
        />
        <Box
          className="animate-pulse-slow"
          sx={{
            position: "absolute",
            bottom: "25%",
            right: "25%",
            width: 320,
            height: 320,
            backgroundColor: "rgba(255, 215, 0, 0.08)",
            borderRadius: "50%",
            filter: "blur(72px)",
            animationDelay: "2s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            backgroundColor: "rgba(212, 175, 55, 0.03)",
            borderRadius: "50%",
            filter: "blur(72px)",
          }}
        />

        {/* M3 Morphing blob decoration */}
        <Box
          className="animate-blob-morph"
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 256,
            height: 256,
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)",
            pointerEvents: "none",
          }}
        />
        <Box
          className="animate-blob-morph"
          sx={{
            position: "absolute",
            bottom: -64,
            left: -64,
            width: 192,
            height: 192,
            background: "linear-gradient(45deg, rgba(255, 215, 0, 0.08) 0%, rgba(212, 175, 55, 0.08) 100%)",
            pointerEvents: "none",
            animationDelay: "4s",
          }}
        />
      </Box>

      {/* Floating Language Icons */}
      {floatingIcons.map((item, index) => (
        <Box
          key={index}
          className="animate-float"
          sx={{
            position: "absolute",
            display: { xs: "none", lg: "block" },
            color: item.color,
            fontSize: item.size,
            opacity: 0.15,
            ...item.style,
          }}
        >
          {item.icon}
        </Box>
      ))}

      {/* ── Hero Content ── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          maxWidth: "896px",
          mx: "auto",
          px: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "32px", sm: "48px", lg: "60px" },
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "text.primary",
          }}
        >
          Master{" "}
          <Box
            component="span"
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {textOptions[currentText]}
            </Box>
            <Box
              component="span"
              sx={{
                position: "absolute",
                bottom: -2,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, rgba(212, 175, 55, 0.4), rgba(255, 215, 0, 0.4))",
                borderRadius: "9999px",
              }}
            />
          </Box>
          <br />
          <Box component="span" sx={{ color: "text.secondary", fontWeight: "bold" }}>
            Like Never Before.
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: "600px",
            mt: 3,
            lineHeight: 1.6,
            fontWeight: "light",
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          Solve real interview challenges with a Monaco code editor, track your preparation roadmaps, and compete in weekly coding sprints.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 5 }}>
          <Link to="/auth?mode=register" style={{ textDecoration: "none" }}>
            <Button size="lg" style={{ width: "100%", fontWeight: "bold", boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)" }}>
              Start Coding Free <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </Button>
          </Link>
          <Link to="/landing" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="lg" style={{ width: "100%" }}>
              Explore Platform
            </Button>
          </Link>
        </Box>

        {/* Stats row */}
        <Box sx={{ display: "flex", gap: { xs: 4, sm: 6 }, mt: 7, alignItems: "center", justifyContent: "center" }}>
          {[
            { value: "1K+", label: "Problems" },
            { value: "450K+", label: "Users" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;