import React, { useState } from "react";
import { Shield, Bell, Moon, Sun, Lock, Eye } from "lucide-react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

export const Settings = () => {
  const { addNotification } = useApp();

  // Settings states
  const [theme, setTheme] = useState("dark"); // dark | light
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [visibility, setVisibility] = useState(true);

  // Security passwords
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

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Account Settings</h2>
        <p className="text-xs text-text-secondary mt-1">Configure workspace themes, alerts, and access keys.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Navigation shortcuts sidebar */}
        <div className="flex flex-col gap-2">
          <div className="p-3 bg-surface border border-border rounded-xl flex items-center gap-2.5 text-xs text-primary font-bold">
            <Moon size={14} /> Workspace Preferences
          </div>
        </div>

        {/* Configurations panels */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Appearance & Themes */}
          <Card className="p-5">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Appearance Mode</h3>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => setTheme("dark")}
                className={`p-4 border rounded-xl flex flex-col items-center text-center cursor-pointer transition-all ${
                  theme === "dark"
                    ? "bg-primary/5 border-primary text-text-primary shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    : "bg-card border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                <Moon size={24} className={theme === "dark" ? "text-primary" : ""} />
                <span className="text-xs font-bold mt-2">Dark Theme (Default)</span>
                <span className="text-[10px] text-text-secondary mt-1">CodeForge Premium Color Palette</span>
              </button>

              <button
                onClick={() => {
                  setTheme("light");
                  addNotification("Light Theme Mocked", "Defaulting to default Dark styling for premium contrast assets.", "info");
                }}
                className={`p-4 border rounded-xl flex flex-col items-center text-center cursor-pointer transition-all ${
                  theme === "light"
                    ? "bg-primary/5 border-primary text-text-primary"
                    : "bg-card border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                <Sun size={24} className={theme === "light" ? "text-primary" : ""} />
                <span className="text-xs font-bold mt-2">Light Theme</span>
                <span className="text-[10px] text-text-secondary mt-1">Light grey contrasts</span>
              </button>
            </div>
          </Card>

          {/* Notifications config */}
          <Card className="p-5">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Notifications & Reminders</h3>
            </CardHeader>
            <div className="flex flex-col gap-4 mt-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary">Email Notifications</h4>
                  <p className="text-[10px] text-text-secondary font-light">Dispatched weekly with contest standings updates.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-primary bg-zinc-950 border-border rounded focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border/30 pt-3">
                <div>
                  <h4 className="font-semibold text-text-primary">Daily Challenge Reminders</h4>
                  <p className="text-[10px] text-text-secondary font-light">Sends visual browser push alerts to solve puzzle challenges.</p>
                </div>
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={(e) => setReminders(e.target.checked)}
                  className="w-4 h-4 text-primary bg-zinc-950 border-border rounded focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border/30 pt-3">
                <div>
                  <h4 className="font-semibold text-text-primary">Public Visibility</h4>
                  <p className="text-[10px] text-text-secondary font-light">Display solved ratios and ratings publicly on user lists.</p>
                </div>
                <input
                  type="checkbox"
                  checked={visibility}
                  onChange={(e) => setVisibility(e.target.checked)}
                  className="w-4 h-4 text-primary bg-zinc-950 border-border rounded focus:ring-primary cursor-pointer"
                />
              </div>

              <Button onClick={handleSavePreferences} className="mt-4 font-semibold w-full sm:w-auto self-start">
                Save Preferences
              </Button>
            </div>
          </Card>

          {/* Security details reset */}
          <Card className="p-5">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Access Security</h3>
            </CardHeader>
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 mt-2">
              <Input
                label="Current Password"
                id="curr-pass"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                required
              />
              <Input
                label="New Password"
                id="new-pass"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary" className="font-semibold w-full sm:w-auto self-start">
                Update Security Credentials
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Settings;
