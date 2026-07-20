import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Flame, Search, User, LogOut, Settings as SettingsIcon, Shield, Menu, X, Award } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Navbar = ({ onMenuClick }) => {
  const { userProfile, notifications, markAllNotificationsRead, setCommandPaletteOpen } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    // Mock logout - simply refresh or redirect
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 pointer-events-none">
      <div className="max-w-7xl mx-auto h-14 glass rounded-xl flex items-center justify-between px-6 pointer-events-auto shadow-lg">
        {/* Left Section: Logo & Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card cursor-pointer focus:outline-none"
          >
            <Menu size={18} />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-text-primary shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-transform group-hover:scale-105">
              CF
            </div>
            <span className="font-bold text-base tracking-tight text-text-primary group-hover:text-primary transition-colors hidden sm:inline-block">
              CodeForge
            </span>
          </Link>
        </div>

        {/* Center Section: Mock Search Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-card hover:bg-surface border border-border/80 rounded-lg text-xs text-text-secondary cursor-pointer max-w-[280px] w-full transition-all hover:border-primary/50"
        >
          <Search size={14} className="text-text-secondary/60" />
          <span className="flex-1 text-left">Search problems, roadmaps...</span>
          <kbd className="bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded border border-border font-sans font-semibold">Ctrl K</kbd>
        </button>

        {/* Right Section: Streak, Rating, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Mobile search trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card cursor-pointer"
          >
            <Search size={16} />
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Flame size={14} className="fill-amber-500" />
            </motion.div>
            <span>{userProfile.streak}d</span>
          </div>

          {/* Contest Rating */}
          <div className="hidden sm:flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full text-xs font-bold text-accent">
            <Award size={14} />
            <span>{userProfile.rating} Pt</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card cursor-pointer transition-colors focus:outline-none"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-danger text-[9px] font-bold text-text-primary flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 bg-surface border border-border rounded-xl shadow-xl p-3 z-50 text-left"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-border/40 mb-2">
                      <span className="text-xs font-bold text-text-primary">Notifications</span>
                      <button
                        onClick={() => {
                          markAllNotificationsRead();
                          setNotifOpen(false);
                        }}
                        className="text-[10px] text-primary hover:underline cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto flex flex-col gap-1.5">
                      {notifications.length === 0 ? (
                        <div className="text-center text-xs text-text-secondary py-6">No new notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-2 rounded-lg text-xs transition-colors ${
                              n.read ? "bg-card/30" : "bg-card border-l-2 border-primary"
                            }`}
                          >
                            <div className="font-semibold text-text-primary flex justify-between">
                              <span>{n.title}</span>
                              <span className="text-[10px] text-text-secondary font-normal">{n.date}</span>
                            </div>
                            <p className="text-text-secondary mt-0.5 font-light">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.username}
                className="w-7 h-7 rounded-full border border-border/80 bg-card"
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-surface border border-border rounded-xl shadow-xl p-1.5 z-50 text-left"
                  >
                    <div className="px-3 py-2 border-b border-border/40 mb-1.5">
                      <div className="text-xs font-semibold text-text-primary">{userProfile.username}</div>
                      <div className="text-[10px] text-text-secondary mt-0.5 truncate">{userProfile.role.toUpperCase()}</div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
                    >
                      <User size={14} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
                    >
                      <SettingsIcon size={14} />
                      <span>Settings</span>
                    </Link>

                    {userProfile.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
                      >
                        <Shield size={14} className="text-accent" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="border-t border-border/40 my-1.5" />

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs rounded-lg text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
