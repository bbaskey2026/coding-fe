import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Trophy, Target, Users, ArrowUpRight, Check, HelpCircle } from "lucide-react";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";

export const Landing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { number: "12M+", label: "Submissions Compiled" },
    { number: "450K+", label: "Platform Members" },
    { number: "120+", label: "Partner Companies" },
    { number: "98.4%", label: "Satisfaction Rate" }
  ];

  const features = [
    {
      title: "Interactive Roadmaps",
      desc: "Structured paths going from core arrays to complex dynamic networks step-by-step.",
      icon: Target
    },
    {
      title: "Monaco Code Playground",
      desc: "High fidelity sandboxed execution console with code template completions.",
      icon: Code
    },
    {
      title: "Simulated Mock Interviews",
      desc: "Timeline-based interview rounds complete with audio prompts and feedback loops.",
      icon: Users
    },
    {
      title: "Real-time Leaderboards",
      desc: "Participate in weekly sprints, rank top, and claim verifiable accomplishment badges.",
      icon: Trophy
    }
  ];

  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Access basic problem lists and roadmap structures.",
      features: ["Access to 100+ coding problems", "Standard code console compiler", "Personal notes workspace", "Basic weekly ranking access"],
      cta: "Start Practicing",
      popular: false
    },
    {
      name: "CodeForge Premium",
      price: "$29",
      desc: "The ultimate preparation suite for top tier technical interviews.",
      features: [
        "Unrestricted access to all 1000+ problems",
        "Curated roadmaps & automated certificates",
        "Structured Audio Mock Interview simulation",
        "Inside insights from 100+ company experience logs",
        "Priority support & advanced performance analytics"
      ],
      cta: "Go Premium",
      popular: true
    },
    {
      name: "Enterprise Team",
      price: "$99",
      desc: "Empower university clubs or engineering teams to learn.",
      features: ["Custom group contests & private tables", "Group analytics & admin panels", "Dedicated coaching boards", "API key compilation slots"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    { q: "Is the compiler code editor fully functional?", a: "Yes, CodeForge integrates an advanced Monaco Editor layout supporting JavaScript, Python, C++, and Java execution pipelines complete with console logs." },
    { q: "Can I claim shareable completion certificates?", a: "Absolutely! Completing any of the Premium Study Plans unlocks an interactive SVG-rendered certification card with unique metadata codes." },
    { q: "How do mock interviews work?", a: "Mock interviews provide step-by-step timeline sessions. The system reads questions via mock audio synthesis, letting you write code under mock timers, finishing with feedback grids." }
  ];

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        color: "text.primary",
        overflowX: "hidden",
        pt: 8,
        position: "relative",
      }}
    >
      {/* Background gradients */}
      <Box sx={{ position: "absolute", top: 0, left: "25%", width: 500, height: 500, backgroundColor: "rgba(212, 175, 55, 0.06)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", top: "33%", right: "25%", width: 450, height: 450, backgroundColor: "rgba(255, 215, 0, 0.04)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />
      {/* M3 morphing blobs */}
      <Box className="animate-blob-morph" sx={{ position: "absolute", top: "15%", right: 0, width: 224, height: 224, background: "linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(255,215,0,0.05) 100%)", pointerEvents: "none" }} />
      <Box className="animate-blob-morph" sx={{ position: "absolute", bottom: "20%", left: 0, width: 160, height: 160, background: "linear-gradient(45deg, rgba(255,215,0,0.04) 0%, rgba(212,175,55,0.04) 100%)", pointerEvents: "none", animationDelay: "4s" }} />

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        component="section"
        sx={{
          pt: 8,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            px: 1.5,
            py: 0.5,
            borderRadius: "50px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "primary.main",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            mb: 3,
          }}
        >
          <span>Announcing CodeForge Studio v1.0</span>
          <ArrowUpRight size={12} />
        </Box>

        <Typography
          component={motion.h1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "36px", sm: "60px" },
            letterSpacing: "-0.02em",
            maxWidth: 896,
            lineHeight: 1.15,
          }}
        >
          Forge Your Coding Skills. <br />
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
            Conquer Technical Interviews.
          </Box>
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "14px", sm: "18px" },
            maxWidth: "600px",
            fontWeight: "light",
            mt: 3,
            lineHeight: 1.625,
          }}
        >
          An ultra-premium coding preparation platform mimicking actual interview loops. Solve challenges with Monaco editor layouts, track plans, and master simulated technical questions.
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.75,
            mt: 5,
          }}
        >
          <Link to="/auth?mode=register" style={{ textDecoration: "none" }}>
            <Button size="lg" style={{ width: "100%", fontWeight: "bold" }}>
              Get Started Free <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </Button>
          </Link>
          <Link to="/problems" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="lg" style={{ width: "100%" }}>
              Explore Problems
            </Button>
          </Link>
        </Box>

        {/* Floating Code Illustration */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          sx={{
            width: "100%",
            maxWidth: "896px",
            mt: 8,
            borderRadius: "12px",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "rgba(17, 17, 17, 0.5)",
            p: 1.25,
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.5)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 0.75,
              pb: 1,
              px: 0.5,
              borderBottom: "1px solid rgba(44, 44, 44, 0.4)",
              mb: 1.5,
              fontSize: "12px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#D32F2F" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFD700" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#2E7D32" }} />
            <Box component="span" sx={{ fontFamily: "monospace", ml: 2, fontSize: "10px", color: "text.secondary" }}>
              solution.js — CodeForge Sandbox
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "primary.main",
              lineHeight: 1.6,
              p: 2,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "8px",
              overflowX: "auto",
              minHeight: "140px",
            }}
          >
            <span style={{ color: "#CFCFCF" }}>// Problem: Find K-th Largest Element</span><br />
            <span style={{ color: "#FFD700" }}>function</span> <span style={{ color: "#FFFFFF" }}>findKthLargest</span>(nums, k) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#FFD700" }}>const</span> minHeap = <span style={{ color: "#FFD700" }}>new</span> <span style={{ color: "#FFFFFF" }}>MinHeap</span>();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;nums.forEach(num =&gt; &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minHeap.push(num);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#FFD700" }}>if</span> (minHeap.size() &gt; k) minHeap.pop();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#FFD700" }}>return</span> minHeap.peek();<br />
            &#125;
          </Box>
        </Box>
      </Container>

      {/* Companies hiring banner */}
      <Box
        component="section"
        className="pattern-stripes"
        sx={{
          backgroundColor: "rgba(26, 26, 26, 0.3)",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 4,
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.1em",
            color: "text.secondary",
            textTransform: "uppercase",
            fontSize: "10px",
          }}
        >
          Empowering engineers at companies globally
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 4, sm: 7 },
            alignItems: "center",
            mt: 3,
            px: 3,
            opacity: 0.6,
          }}
        >
          {["Google", "Stripe", "Netflix", "Amazon", "Apple", "Microsoft"].map((c) => (
            <Typography key={c} variant="body1" sx={{ fontWeight: "bold", letterSpacing: "0.05em", color: "text.primary" }}>
              {c}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Statistics Section */}
      <Container
        maxWidth="lg"
        component="section"
        className="pattern-dots-lg"
        sx={{ py: 10, position: "relative", zIndex: 10 }}
      >
        <Grid container spacing={3} sx={{ textAlign: "center" }}>
          {stats.map((s, idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "rgba(44, 44, 44, 0.4)",
                  borderRadius: "12px",
                  backgroundColor: "rgba(26, 26, 26, 0.2)",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>
                  {s.number}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light" }}>
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Feature grid */}
      <Container
        maxWidth="lg"
        component="section"
        className="pattern-diamond"
        sx={{ py: 6, position: "relative", zIndex: 10 }}
      >
        <Box sx={{ textAlign: "center", maxWidth: "600px", mx: "auto", mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
            Designed for high performers.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1.5, lineHeight: 1.6 }}>
            Everything you need to level up your programming, organize folders of notes, and prepare interview experiences.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Grid item xs={12} sm={6} lg={3} key={idx} sx={{ display: "flex" }}>
                <Card hoverGlow glowColor="primary" style={{ width: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      mb: 2,
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                    }}
                  >
                    <Icon size={20} />
                  </Box>
                  <CardBody style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
                      {f.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5 }}>
                      {f.desc}
                    </Typography>
                  </CardBody>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Pricing Matrix */}
      <Container
        maxWidth="lg"
        component="section"
        className="pattern-rings"
        sx={{ py: 10, position: "relative", zIndex: 10 }}
      >
        <Box sx={{ textAlign: "center", maxWidth: "600px", mx: "auto", mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
            Transparent Pricing Plans
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1.5 }}>
            Invest in your career. Upgrade anytime, cancel in a click.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {tiers.map((t, idx) => (
            <Grid item xs={12} md={4} key={idx} sx={{ display: "flex" }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: t.popular ? "primary.main" : "divider",
                  backgroundColor: t.popular ? "background.paper" : "rgba(26, 26, 26, 0.4)",
                  boxShadow: t.popular ? "0 0 30px rgba(212, 175, 55, 0.15)" : "none",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {t.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      px: 1.5,
                      py: 0.25,
                      borderRadius: "50px",
                      backgroundColor: "primary.main",
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "background.default",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>{t.name}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      mt: 0.5,
                      display: "block",
                      minHeight: 30,
                      fontWeight: "light",
                      lineHeight: 1.5,
                    }}
                  >
                    {t.desc}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mt: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>{t.price}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>/month</Typography>
                  </Box>

                  <Divider sx={{ my: 3, borderColor: "rgba(44, 44, 44, 0.4)" }} />

                  <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {t.features.map((feat, fIdx) => (
                      <Box
                        component="li"
                        key={fIdx}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.25,
                          fontSize: "12px",
                          color: "text.secondary",
                          fontWeight: "light",
                        }}
                      >
                        <Check size={14} style={{ color: "#2E7D32", marginTop: "2px", flexShrink: 0 }} />
                        <span>{feat}</span>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Link to="/auth?mode=register" style={{ textDecoration: "none" }}>
                    <Button variant={t.popular ? "primary" : "outline"} style={{ width: "100%", fontWeight: "bold" }}>
                      {t.cta}
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQs */}
      <Container maxWidth="md" sx={{ py: 6, position: "relative", zIndex: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", color: "text.primary", mb: 6 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((faq, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid rgba(44, 44, 44, 0.6)",
                borderRadius: "12px",
                backgroundColor: "rgba(26, 26, 26, 0.25)",
                overflow: "hidden",
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(26, 26, 26, 0.4)",
                },
              }}
            >
              <ButtonBase
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2.5,
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                <span>{faq.q}</span>
                <HelpCircle size={14} style={{ color: "#CFCFCF" }} />
              </ButtonBase>
              {activeFaq === index && (
                <Box
                  sx={{
                    px: 2.5,
                    pb: 2.5,
                    fontSize: "12px",
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontWeight: "light",
                    borderTop: "1px solid rgba(44, 44, 44, 0.4)",
                    pt: 1.5,
                  }}
                >
                  {faq.a}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Container>

      {/* Platform Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(17, 17, 17, 0.6)",
          py: 6,
          textAlign: "center",
          fontSize: "12px",
          color: "text.secondary",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 24, height: 24, borderRadius: "4px", backgroundColor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "background.default", fontSize: "10px" }}>
              CF
            </Box>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>
              CodeForge
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3, fontWeight: "light" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#FFFFFF"} onMouseLeave={(e) => e.target.style.color = "inherit"}>Terms of Service</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#FFFFFF"} onMouseLeave={(e) => e.target.style.color = "inherit"}>Privacy Policy</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#FFFFFF"} onMouseLeave={(e) => e.target.style.color = "inherit"}>Contact Support</a>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © 2026 CodeForge Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
