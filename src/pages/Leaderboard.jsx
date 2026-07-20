import React, { useState, useMemo } from "react";
import { Search, Trophy, Medal, Star, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";

export const Leaderboard = () => {
  const { users } = useApp();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("weekly"); // weekly | monthly

  const filteredUsers = useMemo(() => {
    return users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy size={16} className="text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Medal size={16} className="text-zinc-300 fill-zinc-300" />;
    if (rank === 3) return <Medal size={16} className="text-amber-600 fill-amber-600" />;
    return <span className="font-mono text-text-secondary font-semibold text-xs">{rank}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Platform Leaderboards</h2>
        <p className="text-xs text-text-secondary mt-1">See how you match up against top competitors globally.</p>
      </div>

      {/* Top 3 Competitor Highlights */}
      <div className="grid md:grid-cols-3 gap-4">
        {users.slice(0, 3).map((user, idx) => {
          const medals = ["text-yellow-500", "text-zinc-300", "text-amber-600"];
          return (
            <Card key={user.id} className="p-5 flex flex-col justify-between items-center text-center">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img src={user.avatar} alt={user.username} className="w-14 h-14 rounded-full bg-card border border-border/80" />
                  <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center`}>
                    <Trophy size={12} className={medals[idx]} />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-text-primary mt-3 flex items-center gap-1">
                  {user.username}
                  {user.role === "admin" && <Shield size={12} className="text-accent" />}
                </h3>
                <span className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-widest">Rank {idx + 1}</span>
              </div>
              <div className="w-full border-t border-border/30 my-4" />
              <div className="flex justify-around w-full text-xs text-text-secondary">
                <div>
                  <div className="font-bold text-text-primary font-mono">{user.rating}</div>
                  <div className="text-[9px]">Rating</div>
                </div>
                <div>
                  <div className="font-bold text-text-primary font-mono">{user.solvedCount}</div>
                  <div className="text-[9px]">Solved</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Leaderboard Table */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="flex bg-card p-1 rounded-lg border border-border w-fit text-xs">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer ${
                activeTab === "weekly" ? "bg-primary text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Weekly Sprint
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer ${
                activeTab === "monthly" ? "bg-primary text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Monthly Marathon
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-[280px] w-full">
            <Input
              id="leader-search"
              placeholder="Search competitor..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border/60 bg-card/25 text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                <th className="py-2.5 px-4 w-16 text-center">Rank</th>
                <th className="py-2.5 px-4">Competitor</th>
                <th className="py-2.5 px-4">Achievements</th>
                <th className="py-2.5 px-4 text-center">Solved</th>
                <th className="py-2.5 px-4 text-right">Contest Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-secondary">
                    No competitors match search terms.
                  </td>
                </tr>
              ) : (
                filteredUsers.slice(0, 50).map((user) => (
                  <tr key={user.id} className="hover:bg-card/20 transition-colors">
                    <td className="py-3 px-4 text-center">{getRankBadge(user.rank)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full bg-card" />
                        <span className="font-semibold text-text-primary">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {user.badges.slice(0, 3).map((b, bIdx) => (
                          <span key={bIdx} title={b.desc} className="text-sm select-none cursor-help">
                            {b.icon}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-text-secondary font-mono font-medium">
                      {user.solvedCount}
                    </td>
                    <td className="py-3 px-4 text-right text-accent font-bold font-mono">
                      {user.rating}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default Leaderboard;
