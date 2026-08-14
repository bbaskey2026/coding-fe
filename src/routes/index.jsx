import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Layout outlets
import { AppLayout }      from "../components/layout/AppLayout";
import { ContentLayout }  from "../components/layout/ContentLayout";
import { AuthLayout }     from "../components/layout/AuthLayout";

// Route guard
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

// Loading component using MUI
const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
    <CircularProgress color="primary" />
  </Box>
);

// Helper function to wrap lazy components in Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Pages loaded lazily
const Landing = lazy(() => import("../pages/Landing").then((m) => ({ default: m.Landing })));
const Auth = lazy(() => import("../pages/Auth").then((m) => ({ default: m.Auth })));
const Dashboard = lazy(() => import("../pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Hero = lazy(() => import("../pages/Hero"));
const ProblemList = lazy(() => import("../pages/ProblemList").then((m) => ({ default: m.ProblemList })));
const ProblemDetails = lazy(() => import("../pages/ProblemDetails").then((m) => ({ default: m.ProblemDetails })));
const CompanyGuides = lazy(() => import("../pages/CompanyGuides").then((m) => ({ default: m.CompanyGuides })));
const CompanyGuideDetails = lazy(() => import("../pages/CompanyGuideDetails").then((m) => ({ default: m.CompanyGuideDetails })));
const StudyPlans = lazy(() => import("../pages/StudyPlans").then((m) => ({ default: m.StudyPlans })));
const Leaderboard = lazy(() => import("../pages/Leaderboard").then((m) => ({ default: m.Leaderboard })));
const Profile = lazy(() => import("../pages/Profile").then((m) => ({ default: m.Profile })));
const Settings = lazy(() => import("../pages/Settings").then((m) => ({ default: m.Settings })));
const Contests = lazy(() => import("../pages/Contests").then((m) => ({ default: m.Contests })));
const Discussion = lazy(() => import("../pages/Discussion").then((m) => ({ default: m.Discussion })));
const InterviewExperiences = lazy(() => import("../pages/InterviewExperiences").then((m) => ({ default: m.InterviewExperiences })));
const MockInterview = lazy(() => import("../pages/MockInterview").then((m) => ({ default: m.MockInterview })));
const Notes = lazy(() => import("../pages/Notes").then((m) => ({ default: m.Notes })));
const Certificates = lazy(() => import("../pages/Certificates").then((m) => ({ default: m.Certificates })));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const BlogList = lazy(() => import("../pages/BlogList").then((m) => ({ default: m.BlogList })));
const BlogDetails = lazy(() => import("../pages/BlogDetails").then((m) => ({ default: m.BlogDetails })));
const BlogWrite = lazy(() => import("../pages/BlogWrite").then((m) => ({ default: m.BlogWrite })));
const TutorialList = lazy(() => import("../pages/TutorialList").then((m) => ({ default: m.TutorialList })));
const TutorialDetails = lazy(() => import("../pages/TutorialDetails").then((m) => ({ default: m.TutorialDetails })));
const NotFound = lazy(() => import("../pages/NotFound").then((m) => ({ default: m.NotFound })));

export const router = createBrowserRouter([
  // ── 1. Private routes — ProtectedRoute guards AppLayout ──────────────────
  {
    element: <ProtectedRoute />,          // redirect → /auth if not logged in
    children: [
      {
        element: <AppLayout />,           // Sidebar + Navbar + Footer
        children: [
          { path: "/dashbaord",      element: withSuspense(Dashboard) },
          { path: "/problems",       element: withSuspense(ProblemList) },
          { path: "/problems/:id",   element: withSuspense(ProblemDetails) },
          { path: "/company-guides", element: withSuspense(CompanyGuides) },
          { path: "/company-guides/:id", element: withSuspense(CompanyGuideDetails) },
          { path: "/study-plans",    element: withSuspense(StudyPlans) },
          { path: "/leaderboard",    element: withSuspense(Leaderboard) },
          { path: "/profile",        element: withSuspense(Profile) },
          { path: "/settings",       element: withSuspense(Settings) },
          { path: "/contests",       element: withSuspense(Contests) },
           { path: "/forum",          element: withSuspense(Discussion) },
          { path: "/blogs",          element: withSuspense(BlogList) },
          { path: "/blogs/:id",      element: withSuspense(BlogDetails) },
          { path: "/blogs/write",    element: withSuspense(BlogWrite) },
          { path: "/blogs/edit/:id", element: withSuspense(BlogWrite) },
          { path: "/tutorials",      element: withSuspense(TutorialList) },
          { path: "/tutorials/:id",  element: withSuspense(TutorialDetails) },
          { path: "/interviews",     element: withSuspense(InterviewExperiences) },
          { path: "/mock-interview", element: withSuspense(MockInterview) },
          { path: "/notes",          element: withSuspense(Notes) },
          { path: "/certificates",   element: withSuspense(Certificates) },
          { path: "/admin",          element: withSuspense(AdminDashboard) },
        ],
      },
    ],
  },

  // ── 2. Public routes — Navbar + Footer, no Sidebar ───────────────────────
  {
    element: <ContentLayout />,
    children: [
      { path: "/",        element: withSuspense(Hero) },
      { path: "/landing", element: withSuspense(Landing) },
    ],
  },

  // ── 3. Public routes — bare shell (auth / 404) ────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: "/auth", element: withSuspense(Auth) },
      { path: "*",     element: withSuspense(NotFound) },
    ],
  },
]);
