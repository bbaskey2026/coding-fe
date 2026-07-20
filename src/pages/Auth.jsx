import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Mail, Lock, User, ArrowLeft, KeyRound, Key } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useApp } from "../context/AppContext";

export const Auth = () => {
  const [screen, setScreen] = useState("login"); // login | register | forgot | otp | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    addNotification("Logged In", `Welcome back to CodeForge! Session initiated.`, "success");
    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    setScreen("otp");
    addNotification("OTP Verification Sent", `A verification code was dispatched to ${email}`, "info");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!email) return;
    setScreen("otp");
    addNotification("Password Reset Dispatched", `OTP code dispatched to ${email}`, "info");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;
    if (screen === "otp" && email && !username) {
      setScreen("reset"); // reset password sequence
    } else {
      // Register validation
      addNotification("Account Created", "Your profile registration is verified. Welcome to CodeForge!", "success");
      navigate("/");
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) return;
    addNotification("Password Reset Successful", "Please log in using your updated password details.", "success");
    setScreen("login");
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Shift focus forward
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const formVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Gradient Rings */}
      <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div key="login" variants={formVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md">
            <Card className="p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Welcome Back</h2>
                <p className="text-xs text-text-secondary mt-1.5">Sign in to your CodeForge preparation space</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                  label="Email Address"
                  id="login-email"
                  type="email"
                  placeholder="name@company.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="login-pass" className="text-xs font-semibold text-text-secondary">Password</label>
                    <button
                      type="button"
                      onClick={() => setScreen("forgot")}
                      className="text-[10px] text-primary hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="login-pass"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full py-2.5 font-semibold mt-2">
                  Sign In
                </Button>
              </form>

              <div className="text-center text-xs text-text-secondary mt-6">
                Don't have an account?{" "}
                <button onClick={() => setScreen("register")} className="text-primary hover:underline font-semibold cursor-pointer">
                  Sign Up Free
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {screen === "register" && (
          <motion.div key="register" variants={formVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md">
            <Card className="p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Create Account</h2>
                <p className="text-xs text-text-secondary mt-1.5">Start coding with a global peer network</p>
              </div>

              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <Input
                  label="Username"
                  id="reg-user"
                  type="text"
                  placeholder="coding_pioneer"
                  icon={User}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  id="reg-email"
                  type="email"
                  placeholder="name@domain.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  id="reg-pass"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button type="submit" className="w-full py-2.5 font-semibold mt-2">
                  Create Account
                </Button>
              </form>

              <div className="text-center text-xs text-text-secondary mt-6">
                Already registered?{" "}
                <button onClick={() => setScreen("login")} className="text-primary hover:underline font-semibold cursor-pointer">
                  Sign In
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {screen === "forgot" && (
          <motion.div key="forgot" variants={formVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md">
            <Card className="p-8 shadow-2xl">
              <button
                onClick={() => setScreen("login")}
                className="inline-flex items-center gap-1 text-[10px] text-text-secondary hover:text-text-primary mb-4 cursor-pointer"
              >
                <ArrowLeft size={10} /> Back to Sign In
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Recover Password</h2>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  Enter your email address. We'll send you a 4-digit code to reset your account details.
                </p>
              </div>

              <form onSubmit={handleForgot} className="flex flex-col gap-4">
                <Input
                  label="Email Address"
                  id="forgot-email"
                  type="email"
                  placeholder="name@domain.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full py-2.5 font-semibold mt-2">
                  Request Reset Code
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {screen === "otp" && (
          <motion.div key="otp" variants={formVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md">
            <Card className="p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Verify Identity</h2>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  A 4-digit verification code was sent to <span className="text-text-primary font-medium">{email}</span>. Enter code below:
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6 items-center">
                <div className="flex gap-3 justify-center w-full">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold bg-surface border border-border rounded-lg text-text-primary transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  ))}
                </div>

                <Button type="submit" className="w-full py-2.5 font-semibold">
                  Verify & Proceed
                </Button>
              </form>

              <div className="text-center text-xs text-text-secondary mt-6">
                Didn't receive a code?{" "}
                <button
                  onClick={() => addNotification("Verification Code Resent", "A new OTP code was sent.", "info")}
                  className="text-primary hover:underline cursor-pointer font-medium"
                >
                  Resend Code
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {screen === "reset" && (
          <motion.div key="reset" variants={formVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md">
            <Card className="p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Reset Password</h2>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  Code verified. Choose a secure new password for your account.
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
                <Input
                  label="New Password"
                  id="reset-pass"
                  type="password"
                  placeholder="••••••••"
                  icon={KeyRound}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full py-2.5 font-semibold mt-2">
                  Update Password
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Auth;
