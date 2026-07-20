import React, { useState, useEffect } from "react";
import { Clock, Trophy, Users, Award, Play } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const Contests = () => {
  const { contests, registerForContest } = useApp();

  // Filter Contests by Status
  const liveContest = contests.find(c => c.status === "live");
  const upcomingContests = contests.filter(c => c.status === "upcoming").slice(0, 4);
  const pastContests = contests.filter(c => c.status === "past").slice(0, 10);

  // Live Timer countdown state
  const [countdown, setCountdown] = useState({ h: 1, m: 24, s: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.s > 0) {
          return { ...prev, s: prev.s - 1 };
        } else if (prev.m > 0) {
          return { h: prev.h, m: prev.m - 1, s: 59 };
        } else if (prev.h > 0) {
          return { h: prev.h - 1, m: 59, s: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdownStr = () => {
    return `${countdown.h.toString().padStart(2, "0")}h ${countdown.m
      .toString()
      .padStart(2, "0")}m ${countdown.s.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Competitive Arena</h2>
        <p className="text-xs text-text-secondary mt-1">Participate in algorithmic marathons, rank high, and boost your rating score.</p>
      </div>

      {/* Live Contest Highlight */}
      {liveContest && (
        <Card hoverGlow glowColor="primary" className="p-6 border-primary/30 bg-primary/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Badge variant="danger" size="sm" className="animate-pulse mb-3">Live Contest Active</Badge>
              <h3 className="text-lg font-bold text-text-primary">{liveContest.title}</h3>
              <p className="text-xs text-text-secondary mt-1 font-light">
                Solve 4 algorithmic coding problems in 3 hours. Compete with {liveContest.participants} registered coders.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="text-center md:text-right">
                <span className="text-[10px] text-text-secondary uppercase font-semibold">Ends In</span>
                <div className="text-2xl font-extrabold text-danger font-mono mt-0.5 flex items-center gap-1.5">
                  <Clock size={20} /> {formatCountdownStr()}
                </div>
              </div>
              <Button size="md" className="font-semibold flex items-center gap-1">
                Enter Arena <Play size={12} className="fill-current" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Upcoming Contests */}
      <div>
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">Upcoming Tournaments</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingContests.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="primary" size="sm">Scheduled</Badge>
                    <span className="text-[10px] text-text-secondary font-mono">ID: #{c.id}</span>
                  </div>
                  <h4 className="text-sm font-bold text-text-primary">{c.title}</h4>
                  <p className="text-xs text-text-secondary mt-1 font-light flex items-center gap-1">
                    <Clock size={12} /> Starts on {new Date(c.startTime).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-text-secondary mt-1.5 font-light flex items-center gap-1">
                    <Users size={12} /> {c.participants} coders registered
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex justify-between items-center">
                  <span className="text-[10px] text-text-secondary font-light">Duration: {c.durationMinutes} min</span>
                  <Button
                    variant={c.registered ? "success" : "outline"}
                    size="sm"
                    onClick={() => registerForContest(c.id)}
                    disabled={c.registered}
                    className="font-semibold"
                  >
                    {c.registered ? "Registered ✓" : "Register Now"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Contests catalog */}
      <Card className="p-5">
        <CardHeader className="mb-4 pb-2">
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Past Contests History</h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border/60 bg-card/25 text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                <th className="py-2 px-4">Contest Title</th>
                <th className="py-2 px-4 text-center">Registrants</th>
                <th className="py-2 px-4 text-center">Difficulty</th>
                <th className="py-2 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-xs">
              {pastContests.map((c) => (
                <tr key={c.id} className="hover:bg-card/20 transition-colors">
                  <td className="py-3 px-4 font-semibold text-text-primary">{c.title}</td>
                  <td className="py-3 px-4 text-center text-text-secondary font-mono">{c.participants}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-1">
                      <span className="text-[10px] text-success">Easy</span>
                      <span className="text-[10px] text-text-secondary">/</span>
                      <span className="text-[10px] text-warning">Medium</span>
                      <span className="text-[10px] text-text-secondary">/</span>
                      <span className="text-[10px] text-danger">Hard</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs font-semibold py-1">
                      View Leaderboard
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default Contests;
