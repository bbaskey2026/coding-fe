import React, { useState } from "react";
import { Moon, Sun, Lock } from "lucide-react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";

export const Settings = () => {
  const { addNotification } = useApp();

  const [theme, setTheme] = useState("dark");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [visibility, setVisibility] = useState(true);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSavePreferences = () => {
    addNotification("Settings Saved", "Your configuration updates have been registered.", "success");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPass || !newPass) return;
    addNotification("Password Updated", "Security credentials reset successfully.", "success");
    setCurrentPass("");
    setNewPass("");
  };

  const themeOptions = [
    { id: "dark", label: "Dark Theme (Default)", desc: "CodeX86 Premium Color Palette", icon: Moon },
    { id: "light", label: "Light Theme", desc: "Light grey contrasts", icon: Sun },
  ];

  const notifSettings = [
    { key: "email", label: "Email Notifications", desc: "Dispatched weekly with contest standings updates.", value: emailAlerts, onChange: setEmailAlerts },
    { key: "reminders", label: "Daily Challenge Reminders", desc: "Sends visual browser push alerts to solve puzzle challenges.", value: reminders, onChange: setReminders },
    { key: "visibility", label: "Public Visibility", desc: "Display solved ratios and ratings publicly on user lists.", value: visibility, onChange: setVisibility },
  ];

  return (
    <Box sx={{ maxWidth: "896px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Account Settings</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Configure workspace themes, alerts, and access keys.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Navigation sidebar */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ p: 1.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "primary.main", borderRadius: "12px", display: "flex", alignItems: "center", gap: 1.25, fontSize: "12px", color: "primary.main", fontWeight: "bold" }}>
              <Moon size={14} /> Workspace Preferences
            </Box>
          </Box>
        </Grid>

        {/* Configurations panels */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Appearance & Themes */}
            <Card style={{ padding: "20px" }}>
              <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Appearance Mode
                </Typography>
              </CardHeader>
              <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                {themeOptions.map(({ id, label, desc, icon: Icon }) => (
                  <Grid item xs={6} key={id}>
                    <ButtonBase
                      onClick={() => {
                        setTheme(id);
                        if (id === "light") addNotification("Light Theme Mocked", "Defaulting to default Dark styling for premium contrast assets.", "info");
                      }}
                      sx={{
                        width: "100%", p: 2, border: "1px solid", borderRadius: "12px",
                        borderColor: theme === id ? "primary.main" : "divider",
                        backgroundColor: theme === id ? "rgba(212,175,55,0.05)" : "background.card",
                        boxShadow: theme === id ? "0 0 15px rgba(212,175,55,0.1)" : "none",
                        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                        transition: "all 0.2s",
                        "&:hover": { borderColor: theme !== id ? "rgba(212,175,55,0.3)" : "primary.main" },
                      }}
                    >
                      <Icon size={24} style={{ color: theme === id ? "#D4AF37" : "#A1A1AA" }} />
                      <Typography variant="caption" sx={{ fontWeight: "bold", mt: 1, display: "block", color: "text.primary" }}>{label}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px", display: "block", mt: 0.25 }}>{desc}</Typography>
                    </ButtonBase>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Notifications config */}
            <Card style={{ padding: "20px" }}>
              <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Notifications & Reminders
                </Typography>
              </CardHeader>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0, mt: 0.5 }}>
                {notifSettings.map(({ key, label, desc, value, onChange }, i) => (
                  <Box key={key}>
                    {i > 0 && <Divider sx={{ borderColor: "rgba(44,44,44,0.3)", my: 1.5 }} />}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>{label}</Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", fontSize: "10px" }}>{desc}</Typography>
                      </Box>
                      <Switch
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        size="small"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "#D4AF37" },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#D4AF37" },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
                <Box sx={{ mt: 3 }}>
                  <Button onClick={handleSavePreferences} style={{ fontWeight: "bold" }}>
                    Save Preferences
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Security details reset */}
            <Card style={{ padding: "20px" }}>
              <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Access Security
                </Typography>
              </CardHeader>
              <Box component="form" onSubmit={handleUpdatePassword} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0.5 }}>
                <Input label="Current Password" id="curr-pass" type="password" placeholder="••••••••" icon={Lock} value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} required />
                <Input label="New Password" id="new-pass" type="password" placeholder="••••••••" icon={Lock} value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                <Box>
                  <Button type="submit" variant="secondary" style={{ fontWeight: "bold" }}>
                    Update Security Credentials
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Settings;
