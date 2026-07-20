import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Cpu,
  Bookmark,
  ChevronRight,
  Sparkles,
  Trophy,
  ArrowRight,
  Code2
} from "lucide-react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody, CardFooter } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Heatmap } from "../components/ui/Heatmap";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

export const Dashboard = () => {
  const { userProfile, problems, contests, solveProblem } = useApp();

  // Solved Count statistics
  const totalSolved = userProfile.solvedProblemsList.length;
  // Let's filter solved items by difficulties
  const solvedEasy = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Easy").length;
  const solvedMedium = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Medium").length;
  const solvedHard = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Hard").length;

  const totalEasyInDb = problems.filter(p => p.difficulty === "Easy").length;
  const totalMediumInDb = problems.filter(p => p.difficulty === "Medium").length;
  const totalHardInDb = problems.filter(p => p.difficulty === "Hard").length;

  // 1. Doughnut Chart Configuration
  const doughnutData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [solvedEasy || 20, solvedMedium || 50, solvedHard || 14], // fallback if fresh list
        backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
        borderColor: ["#09090B", "#09090B", "#09090B"],
        borderWidth: 2,
        cutout: "75%"
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // 2. Line Chart Configuration (Contest Rating History)
  const lineData = {
    labels: ["Contest 390", "Contest 394", "Contest 398", "Contest 400", "Contest 402", "Contest 404"],
    datasets: [
      {
        label: "Rating",
        data: [1500, 1580, 1640, 1720, 1790, userProfile.rating],
        fill: false,
        borderColor: "#8B5CF6",
        tension: 0.35,
        pointBackgroundColor: "#8B5CF6",
        pointBorderWidth: 1,
        pointRadius: 4
      }
    ]
  };

  const lineOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#A1A1AA", font: { size: 10 } } },
      y: { grid: { color: "rgba(39, 39, 42, 0.4)" }, ticks: { color: "#A1A1AA", font: { size: 10 } } }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Daily Challenge Problem: Problem ID 3 (Hard) or 2 (Medium)
  const dailyChallengeId = 3;
  const dailyProblem = problems.find(p => p.id === dailyChallengeId) || problems[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary flex items-center gap-2">
            Welcome back, {userProfile.username} <Sparkles size={20} className="text-accent animate-pulse" />
          </h2>
          <p className="text-xs text-text-secondary mt-1">Here is your coding preparation progress dashboard.</p>
        </div>

        {/* Global Level Indicator */}
        <div className="flex items-center gap-3 bg-surface border border-border p-2.5 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-text-primary text-xs shadow-md">
            Lvl {Math.floor(totalSolved / 5) + 1}
          </div>
          <div>
            <div className="text-[10px] text-text-secondary font-bold uppercase">Rank Score</div>
            <div className="text-xs font-semibold text-text-primary">Top {userProfile.rank} on leaderboards</div>
          </div>
        </div>
      </div>

      {/* Grid: Daily Challenge & Progress Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Challenge Card */}
        <Card hoverGlow glowColor="accent" className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="primary" size="sm">Daily Challenge</Badge>
              <div className="text-[10px] text-text-secondary flex items-center gap-1">
                <Flame size={12} className="text-amber-500 fill-amber-500" />
                <span>Ends in 12h 40m</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-text-primary mt-2">{dailyProblem.title}</h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-3 font-light">
              {dailyProblem.description.replace(/###/g, "").replace(/\*\*/g, "")}
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Badge variant={dailyProblem.difficulty === "Easy" ? "success" : dailyProblem.difficulty === "Medium" ? "warning" : "danger"} size="sm">
                {dailyProblem.difficulty}
              </Badge>
              {dailyProblem.tags.map(t => (
                <Badge key={t} size="sm">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/40">
            <span className="text-[10px] text-text-secondary font-light">Acceptance: {dailyProblem.acceptance}</span>
            <Link to={`/problems/${dailyProblem.id}`}>
              <Button size="sm" className="font-semibold flex items-center gap-1">
                Solve Challenge <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Streak & Achievements Mini Card */}
        <Card className="p-6">
          <CardHeader className="mb-3 pb-2">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Weekly Streak</h3>
            <Flame size={18} className="text-amber-500 fill-amber-500 animate-bounce" />
          </CardHeader>
          <div className="flex items-center gap-4 mt-2">
            <div className="text-4xl font-extrabold text-amber-500">{userProfile.streak}</div>
            <div>
              <div className="text-xs font-bold text-text-primary">Consecutive Days Coded</div>
              <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed font-light">
                Keep solving 1 problem daily to sustain the streak score.
              </p>
            </div>
          </div>

          <div className="border-t border-border/40 my-4" />

          <div>
            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2.5">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => solveProblem(1)}
                className="flex items-center gap-1.5 p-2 bg-card border border-border/80 hover:border-primary/50 text-left rounded-lg text-[10px] text-text-primary cursor-pointer hover:bg-surface"
              >
                <Code2 size={12} className="text-primary" />
                <span>Quick Solve</span>
              </button>
              <Link
                to="/mock-interview"
                className="flex items-center gap-1.5 p-2 bg-card border border-border/80 hover:border-primary/50 text-left rounded-lg text-[10px] text-text-primary cursor-pointer hover:bg-surface"
              >
                <Cpu size={12} className="text-accent" />
                <span>Mock Prep</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid: Charts & Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Solved Problems Breakdown Chart */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">Solved Problems</h3>
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center mt-2">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-text-primary">{totalSolved}</span>
                <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Solved</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-success font-medium">
                <span className="w-2 h-2 rounded-full bg-success" /> Easy
              </span>
              <span className="text-text-primary font-bold">{solvedEasy} / <span className="text-text-secondary font-normal">{totalEasyInDb}</span></span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-warning font-medium">
                <span className="w-2 h-2 rounded-full bg-warning" /> Medium
              </span>
              <span className="text-text-primary font-bold">{solvedMedium} / <span className="text-text-secondary font-normal">{totalMediumInDb}</span></span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-danger font-medium">
                <span className="w-2 h-2 rounded-full bg-danger" /> Hard
              </span>
              <span className="text-text-primary font-bold">{solvedHard} / <span className="text-text-secondary font-normal">{totalHardInDb}</span></span>
            </div>
          </div>
        </Card>

        {/* Rating Progress Line Chart */}
        <Card className="md:col-span-2 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Rating History</h3>
              <span className="text-xs font-semibold text-accent flex items-center gap-1">
                <TrendingUp size={14} /> Global Rank #{userProfile.rank}
              </span>
            </div>
            <div className="h-44 w-full mt-2 relative">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div className="text-[10px] text-text-secondary font-light mt-4 pt-3 border-t border-border/40">
            Contest performance is updated automatically at the conclusion of weekly sprints.
          </div>
        </Card>
      </div>

      {/* Contribution Calendar Heatmap */}
      <Heatmap data={userProfile.heatmap} />

      {/* Grid: Continue Solving & Recent Activities */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Solving List */}
        <Card className="lg:col-span-2 p-5 text-left">
          <CardHeader className="mb-3 pb-2">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Continue Solving</h3>
          </CardHeader>
          <div className="flex flex-col gap-2.5 mt-2">
            {problems.slice(15, 18).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/60 hover:border-primary/50 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-text-primary">{p.title}</div>
                  <div className="text-[10px] text-text-secondary mt-1 flex items-center gap-2">
                    <Badge variant={p.difficulty === "Easy" ? "success" : p.difficulty === "Medium" ? "warning" : "danger"} size="sm">
                      {p.difficulty}
                    </Badge>
                    <span>Acceptance: {p.acceptance}</span>
                  </div>
                </div>
                <Link to={`/problems/${p.id}`}>
                  <Button size="sm" variant="ghost" className="p-1 text-primary">
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Saved Bookmarks Shortcuts */}
        <Card className="p-5 text-left">
          <CardHeader className="mb-3 pb-2">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Saved Bookmarks</h3>
            <Bookmark size={14} className="text-text-secondary" />
          </CardHeader>
          <div className="flex flex-col gap-2.5 mt-2">
            {problems.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/problems/${p.id}`}
                className="flex justify-between items-center text-xs text-text-secondary hover:text-text-primary transition-colors py-1.5 border-b border-border/30 last:border-b-0"
              >
                <span className="truncate max-w-[180px]">{p.title}</span>
                <Badge size="sm">{p.difficulty}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
