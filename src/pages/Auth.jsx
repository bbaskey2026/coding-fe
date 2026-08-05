import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Mail, Lock, User, ArrowLeft, KeyRound, Terminal, CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

// MUI Imports
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import ButtonBase from "@mui/material/ButtonBase";

export const Auth = () => {
  const [screen,      setScreen]      = useState("login"); // login | register | forgot | otp | reset
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [username,    setUsername]    = useState("");
  const [otp,         setOtp]         = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [otpFlow,     setOtpFlow]     = useState("register"); // "register" | "forgot"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError,   setFieldError]   = useState("");

  const { addNotification }                             = useApp();
  const { login, register, verifyOtp, forgotPassword, resetPassword } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Redirect back to the page the user originally tried to visit
  const from = location.state?.from?.pathname || "/";

  // Parse mode query parameter on mount or route update
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode && ["login", "register", "forgot", "otp", "reset"].includes(mode)) {
      setScreen(mode);
      setFieldError("");
    }
  }, [location.search]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const withLoading = async (fn) => {
    setIsSubmitting(true);
    setFieldError("");
    try {
      await fn();
    } catch (err) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setFieldError(msg);
      addNotification("Error", msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    withLoading(async () => {
      await login({ email, password });
      addNotification("Welcome back!", "Session started successfully.", "success");
      navigate(from, { replace: true });
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    withLoading(async () => {
      await register({ username, email, password });
      setOtpFlow("register");
      setScreen("otp");
      addNotification("OTP Sent", `A 4-digit code was dispatched to ${email}.`, "info");
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!email) return;
    withLoading(async () => {
      await forgotPassword({ email });
      setOtpFlow("forgot");
      setScreen("otp");
      addNotification("Reset Code Sent", `OTP dispatched to ${email}.`, "info");
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;
    withLoading(async () => {
      await verifyOtp({ email, otp: code, flow: otpFlow });
      if (otpFlow === "forgot") {
        setScreen("reset");
      } else {
        addNotification("Account Verified!", "Welcome to CodeX86!", "success");
        navigate(from, { replace: true });
      }
    });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) return;
    const code = otp.join("");
    withLoading(async () => {
      await resetPassword({ email, otp: code, newPassword });
      addNotification("Password Reset", "Log in with your new password.", "success");
      setScreen("login");
      setOtp(["", "", "", ""]);
    });
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const next = [...otp];
    next[index] = value.substring(value.length - 1);
    setOtp(next);
    if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  // ── Animation variants ────────────────────────────────────────────────────
  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0,  transition: { duration: 0.35, ease: "easeOut" } },
    exit:    { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // ── Shared error banner ───────────────────────────────────────────────────
  const ErrorBanner = () =>
    fieldError ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderRadius: "8px",
          backgroundColor: "rgba(211, 47, 47, 0.1)",
          border: "1px solid rgba(211, 47, 47, 0.3)",
          fontSize: "12px",
          color: "#D32F2F",
        }}
      >
        <ShieldAlert size={14} />
        <span>{fieldError}</span>
      </Box>
    ) : null;

  return (
    <Grid container sx={{ minHeight: "100vh", backgroundColor: "background.default", color: "text.primary", overflowX: "hidden" }}>
      {/* ── Left branding side ── */}
      <Grid
        item
        xs={false}
        lg={5}
        sx={{
          display: { xs: "none", lg: "flex" },
          backgroundColor: "rgba(255, 255, 255, 0.01)",
          borderRight: "1px solid",
          borderColor: "divider",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern background overlay */}
        <Box className="pattern-grid" sx={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", width: 450, height: 450, backgroundColor: "rgba(212, 175, 55, 0.04)", borderRadius: "50%", filter: "blur(100px)", top: -96, left: -96, pointerEvents: "none" }} />

        {/* Brand logo header */}
        <Box sx={{ position: "relative", zIndex: 10 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "12px",
                background: "linear-gradient(45deg, #D4AF37 0%, #FFD700 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "background.default",
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.25)",
              }}
            >
              CF
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
              CodeX86
            </Typography>
          </Link>
        </Box>

        {/* Feature info stack / testimony */}
        <Box sx={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: 4, my: "auto", maxWidth: 380, textAlign: "left" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, tracking: "-0.02em", color: "text.primary", lineHeight: 1.25 }}>
              Elevate Your Coding Competence.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.5, lineHeight: 1.6, fontWeight: "light" }}>
              Explore dynamic roadmaps, run and compile code inside a Monaco editor, and finish premium timelines built for tech interviews.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <CheckCircle2 size={16} style={{ color: "#D4AF37", marginTop: "2px", flexShrink: 0 }} />
              <Box>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>1,000+ Curated Problems</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light" }}>Top-tier patterns matching direct corporate interviews.</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <CheckCircle2 size={16} style={{ color: "#D4AF37", marginTop: "2px", flexShrink: 0 }} />
              <Box>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>Audio Mock Sessions</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light" }}>Mock synthesis timers that track solution attempts.</Typography>
              </Box>
            </Box>
          </Box>

          {/* Codebox display snippet */}
          <Box sx={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", border: "1px solid", borderColor: "divider", borderRadius: "12px", p: 2, boxShadow: 2, fontFamily: "monospace", fontSize: "10px", lineHeight: 1.6 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, borderBottom: "1px solid rgba(44, 44, 44, 0.4)", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Terminal size={11} style={{ color: "#D4AF37" }} />
                <span style={{ color: "#94A3B8" }}>active_profile.json</span>
              </Box>
              <span style={{ fontSize: "8px", color: "#10B981", fontWeight: "bold", padding: "2px 6px", backgroundColor: "rgba(16, 185, 129, 0.1)", borderRadius: "4px" }}>ONLINE</span>
            </Box>
            <Box sx={{ color: "#CBD5E1" }}>
              <span style={{ color: "#3B82F6" }}>const</span> userProfile = &#123;<br />
              &nbsp;&nbsp;username: <span style={{ color: "#22D3EE" }}>"coding_pioneer"</span>,<br />
              &nbsp;&nbsp;solvedProblems: <span style={{ color: "#FACC15" }}>42</span>,<br />
              &nbsp;&nbsp;dailyStreak: <span style={{ color: "#FACC15" }}>7</span><br />
              &#125;;
            </Box>
          </Box>
        </Box>

        {/* Footer legal text */}
        <Typography variant="caption" sx={{ position: "relative", zIndex: 10, color: "rgba(207, 207, 207, 0.5)" }}>
          © 2026 CodeX86 Inc. All rights reserved.
        </Typography>
      </Grid>

      {/* ── Right interactive form side ── */}
      <Grid
        item
        xs={12}
        lg={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 4, lg: 8 },
          backgroundColor: "background.default",
          position: "relative",
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        {/* Top bar back button (visible on mobile/desktop without sidebar) */}
        <Box sx={{ position: "absolute", top: 32, left: 32, zIndex: 10, display: { lg: "none" } }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#CFCFCF", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </Box>

        {/* Card containing the active screen */}
        <Box sx={{ width: "100%", maxWidth: "384px" }}>
          <AnimatePresence mode="wait">
            {/* ── Login screen ── */}
            {screen === "login" && (
              <Box component={motion.div} key="login" variants={formVariants} initial="initial" animate="animate" exit="exit" sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Sign In</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light" }}>
                    Access your coding sandbox and problem dashboard.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ErrorBanner />
                  <Input label="Email Address" id="login-email" type="email" placeholder="name@company.com"
                    icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
                      <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Password</Typography>
                      <ButtonBase onClick={() => setScreen("forgot")}
                        sx={{ fontSize: "10px", color: "primary.main", "&:hover": { textDecoration: "underline" } }}>
                        Forgot password?
                      </ButtonBase>
                    </Box>
                    <Input id="login-pass" type="password" placeholder="••••••••"
                      icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Box>

                  <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "16px" }} disabled={isSubmitting}>
                    {isSubmitting ? "Signing in…" : "Sign In"}
                  </Button>
                </Box>

                <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary", mt: 1 }}>
                  Don't have an account?{" "}
                  <ButtonBase onClick={() => { setFieldError(""); setScreen("register"); }}
                    sx={{ color: "primary.main", fontWeight: "bold", "&:hover": { textDecoration: "underline" } }}>
                    Sign Up Free
                  </ButtonBase>
                </Typography>
              </Box>
            )}

            {/* ── Register screen ── */}
            {screen === "register" && (
              <Box component={motion.div} key="register" variants={formVariants} initial="initial" animate="animate" exit="exit" sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Create Account</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light" }}>
                    Join technical sprints and access active roadmaps.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ErrorBanner />
                  <Input label="Username" id="reg-user" type="text" placeholder="coding_pioneer"
                    icon={User} value={username} onChange={(e) => setUsername(e.target.value)} required />
                  <Input label="Email Address" id="reg-email" type="email" placeholder="name@domain.com"
                    icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input label="Password" id="reg-pass" type="password" placeholder="••••••••"
                    icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} required />

                  <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "16px" }} disabled={isSubmitting}>
                    {isSubmitting ? "Creating account…" : "Create Account"}
                  </Button>
                </Box>

                <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary", mt: 1 }}>
                  Already registered?{" "}
                  <ButtonBase onClick={() => { setFieldError(""); setScreen("login"); }}
                    sx={{ color: "primary.main", fontWeight: "bold", "&:hover": { textDecoration: "underline" } }}>
                    Sign In
                  </ButtonBase>
                </Typography>
              </Box>
            )}

            {/* ── Forgot password screen ── */}
            {screen === "forgot" && (
              <Box component={motion.div} key="forgot" variants={formVariants} initial="initial" animate="animate" exit="exit" sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                <Box>
                  <ButtonBase onClick={() => { setFieldError(""); setScreen("login"); }}
                    sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: "10px", color: "text.secondary", mb: 1, "&:hover": { color: "text.primary" } }}>
                    <ArrowLeft size={10} /> Back to Sign In
                  </ButtonBase>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Recover Password</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light", lineHeight: 1.5 }}>
                    Enter your email. We'll send a 4-digit code to reset your account.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleForgot} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ErrorBanner />
                  <Input label="Email Address" id="forgot-email" type="email" placeholder="name@domain.com"
                    icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "16px" }} disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Request Reset Code"}
                  </Button>
                </Box>
              </Box>
            )}

            {/* ── OTP verification screen ── */}
            {screen === "otp" && (
              <Box component={motion.div} key="otp" variants={formVariants} initial="initial" animate="animate" exit="exit" sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Verify Identity</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light", lineHeight: 1.5 }}>
                    A 4-digit code was sent to <span style={{ color: "#FFFFFF", fontWeight: "500" }}>{email}</span>.
                    {" "}{import.meta.env.VITE_API_URL ? "" : <span style={{ color: "#FFD700", fontWeight: "600" }}>(Mock: use 1234)</span>}
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleOtpSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                  <ErrorBanner />
                  <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", width: "100%" }}>
                    {otp.map((digit, idx) => (
                      <InputBase
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        inputProps={{ maxLength: 1, style: { textAlign: "center", fontWeight: "bold", fontSize: "18px" } }}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        required
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "8px",
                          color: "text.primary",
                          transition: "border-color 0.2s",
                          "&:focus-within": {
                            borderColor: "primary.main",
                            boxShadow: "0 0 0 1px #D4AF37",
                          },
                        }}
                      />
                    ))}
                  </Box>

                  <Button type="submit" style={{ width: "100%", fontWeight: "bold" }} disabled={isSubmitting}>
                    {isSubmitting ? "Verifying…" : "Verify & Proceed"}
                  </Button>
                </Box>

                <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary" }}>
                  Didn't receive a code?{" "}
                  <ButtonBase onClick={() => addNotification("Code Resent", "A new OTP was sent.", "info")}
                    sx={{ color: "primary.main", fontWeight: "medium", "&:hover": { textDecoration: "underline" } }}>
                    Resend Code
                  </ButtonBase>
                </Typography>
              </Box>
            )}

            {/* ── Reset password screen ── */}
            {screen === "reset" && (
              <Box component={motion.div} key="reset" variants={formVariants} initial="initial" animate="animate" exit="exit" sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Reset Password</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light", lineHeight: 1.5 }}>
                    Code verified. Choose a secure new password.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleResetSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ErrorBanner />
                  <Input label="New Password" id="reset-pass" type="password" placeholder="••••••••"
                    icon={KeyRound} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "16px" }} disabled={isSubmitting}>
                    {isSubmitting ? "Updating…" : "Update Password"}
                  </Button>
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
