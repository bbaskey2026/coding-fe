import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const footerLinks = {
  Platform: [
    { label: "Problems",      to: "/problems" },
    { label: "Study Plans",   to: "/study-plans" },
    { label: "Contests",      to: "/contests" },
    { label: "Leaderboard",   to: "/leaderboard" },
  ],
  Community: [
    { label: "Forum",         to: "/forum" },
    { label: "Interviews",    to: "/interviews" },
    { label: "Mock Interview",to: "/mock-interview" },
  ],
  Account: [
    { label: "Profile",       to: "/profile" },
    { label: "Dashboard",     to: "/dashbaord" },
    { label: "Notes",         to: "/notes" },
    { label: "Certificates",  to: "/certificates" },
  ],
};

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "rgba(17, 17, 17, 0.6)",
      backdropFilter: "blur(8px)",
      mt: "auto",
    }}
  >
    <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
      {/* Top row */}
      <Grid container spacing={4}>
        {/* Brand */}
        <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "background.card",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <img
                src={logo}
                alt="CodeX86 Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                transition: "color 0.2s",
                "&:hover": { color: "primary.main" },
              }}
            >
              CodeX86
            </Typography>
          </Link>
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.5, maxWidth: 200 }}>
            The platform built for competitive programmers and interview-ready engineers.
          </Typography>
          {/* Social icons */}
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            {[
              { Icon: FaGithub,    href: "#" },
              { Icon: FaTwitter,   href: "#" },
              { Icon: FaLinkedinIn,href: "#" },
            ].map(({ Icon, href }, i) => (
              <IconButton
                key={i}
                component="a"
                href={href}
                target="_blank"
                rel="noreferrer"
                size="small"
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
                <Icon size={15} />
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <Grid item xs={6} sm={4} md={3} key={heading} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "text.secondary",
                opacity: 0.7,
              }}
            >
              {heading}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
              {links.map(({ label, to }) => (
                <Box component="li" key={label}>
                  <Link
                    to={to}
                    style={{
                      fontSize: "12px",
                      color: "#CFCFCF",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--mui-palette-text-primary)")}
                    onMouseLeave={(e) => (e.target.style.color = "#CFCFCF")}
                  >
                    {label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Bottom bar */}
      <Box
        sx={{
          mt: 5,
          pt: 3,
          borderTop: "1px solid rgba(44, 44, 44, 0.4)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(207, 207, 207, 0.6)" }}>
          © 2026 CodeX86 Inc. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.primary" }}>
          <Code2 size={12} style={{ color: "currentColor" }} />
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer;
