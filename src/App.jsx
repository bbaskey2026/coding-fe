import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation,Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
// Components & Layout
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { CommandPalette } from "./components/features/CommandPalette";
import { NotificationCenter } from "./components/features/NotificationCenter";

// Pages
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import  Hero  from "./pages/Hero";
import { ProblemList } from "./pages/ProblemList";
import { ProblemDetails } from "./pages/ProblemDetails";
import { StudyPlans } from "./pages/StudyPlans";
import { Leaderboard } from "./pages/Leaderboard";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Contests } from "./pages/Contests";
import { Discussion } from "./pages/Discussion";
import { InterviewExperiences } from "./pages/InterviewExperiences";
import { MockInterview } from "./pages/MockInterview";
import { Notes } from "./pages/Notes";
import { Certificates } from "./pages/Certificates";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";
import Footer from "./pages/Footer.jsx"

import "./App.css";

const LayoutShell = ({ children }) => {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  // Pages that DO NOT render the Navbar/Sidebar frame
  const standalonePages = ["/auth", "/landing", "/404"];
  const isStandalone = standalonePages.includes(location.pathname) ||
    (!["/", "/problems", "/study-plans", "/leaderboard", "/forum", "/interviews", "/mock-interview", "/notes", "/certificates", "/admin", "/settings"].some(path => location.pathname.startsWith(path)) && location.pathname !== "/");

  if (isStandalone) {
    return <main className="w-full min-h-screen bg-bg">{children}</main>;
  }

  // Margin spacing based on sidebar state
  const contentSpacing = desktopSidebarCollapsed ? "md:pl-18" : "md:pl-64";

  return (
    <div className="min-h-screen bg-bg text-text-primary flex">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={desktopSidebarCollapsed}
        onToggleCollapse={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Floating Navbar */}
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Scrollable page body */}
        <main className={`flex-1 transition-all duration-300 min-h-screen ${contentSpacing}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        {/* Global palettes & overlays */}
        <CommandPalette />
        <NotificationCenter />

        <LayoutShell>
          <Routes>
             <Route path="/" element={<Hero />} />
            <Route path="/dashbaord" element={<Dashboard />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
            <Route path="/study-plans" element={<StudyPlans />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/forum" element={<Discussion />} />
            <Route path="/interviews" element={<InterviewExperiences />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutShell>
        <Footer></Footer>
      </Router>
    </AppProvider>
  );
}
