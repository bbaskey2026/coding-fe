import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  Map,
  Trophy,
  BarChart3,
  MessageSquare,
  Briefcase,
  UserCheck,
  FileText,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const menuItems = [

    { name: "Home", path: "/", icon: LayoutDashboard },
    { name: "Dashboard", path: "/dashbaord", icon: LayoutDashboard },
    { name: "Problems", path: "/problems", icon: Code2 },
    { name: "Study Plans", path: "/study-plans", icon: Map },
    { name: "Contests", path: "/contests", icon: Trophy },
    { name: "Leaderboard", path: "/leaderboard", icon: BarChart3 },
    { name: "Forum", path: "/forum", icon: MessageSquare },
    { name: "Interview Exp", path: "/interviews", icon: Briefcase },
    { name: "Mock Interview", path: "/mock-interview", icon: UserCheck },
    { name: "Notes Workspace", path: "/notes", icon: FileText },
    { name: "Certificates", path: "/certificates", icon: FileCheck }
  ];

  const sidebarWidth = isCollapsed ? "w-18" : "w-64";

  const renderContent = () => (
    <div className="flex flex-col h-full bg-surface border-r border-border/80 pt-20 px-3 pb-6 relative text-left">
      {/* Collapse Toggle Button (Desktop Only) */}
      <button
        onClick={onToggleCollapse}
        className="hidden md:flex absolute -right-3 top-22 w-6 h-6 rounded-full bg-surface border border-border items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer shadow-md z-50 hover:bg-card"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Menu List */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose} // Closes drawer on mobile when clicking links
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold select-none transition-all cursor-pointer ${
                isActive
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-card/40 border border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? "text-primary" : "text-text-secondary"} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="pt-4 border-t border-border/40 text-[10px] text-text-secondary font-medium pl-3">
          <div>CodeForge v1.0.0</div>
          <div className="font-light mt-0.5">© 2026 CodeForge Inc.</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Visible on smaller screens) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-bg/60 backdrop-blur-sm cursor-pointer"
            />
            {/* Drawer Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-64 h-full z-10"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card cursor-pointer"
              >
                <X size={16} />
              </button>
              {renderContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Permanent display on larger screens) */}
      <aside className={`hidden md:block fixed top-0 bottom-0 left-0 h-full z-30 transition-all duration-300 ${sidebarWidth}`}>
        {renderContent()}
      </aside>
    </>
  );
};
