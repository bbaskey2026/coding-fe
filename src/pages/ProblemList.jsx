import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, BookOpenCheck, CheckCircle2, Circle, AlertCircle, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const ProblemList = () => {
  const { problems, userProfile } = useApp();

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All"); // All | Easy | Medium | Hard
  const [selectedStatus, setSelectedStatus] = useState("All"); // All | Solved | Attempted | Unsolved
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Extract all unique tags and companies for filters
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    problems.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet).sort()];
  }, [problems]);

  const allCompanies = useMemo(() => {
    const compsSet = new Set();
    problems.forEach(p => p.companies.forEach(c => compsSet.add(c)));
    return ["All", ...Array.from(compsSet).sort().slice(0, 15)]; // Limit filter options for space
  }, [problems]);

  // Apply filters
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // 1. Search Query
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search;

      // 2. Difficulty Filter
      const matchDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;

      // 3. Status Filter
      const isSolved = userProfile.solvedProblemsList.includes(p.id);
      const isAttempted = userProfile.attemptedProblemsList.includes(p.id);
      
      let matchStatus = true;
      if (selectedStatus === "Solved") matchStatus = isSolved;
      else if (selectedStatus === "Attempted") matchStatus = isAttempted && !isSolved;
      else if (selectedStatus === "Unsolved") matchStatus = !isSolved && !isAttempted;

      // 4. Tag Filter
      const matchTag = selectedTag === "All" || p.tags.includes(selectedTag);

      // 5. Company Filter
      const matchCompany = selectedCompany === "All" || p.companies.includes(selectedCompany);

      return matchSearch && matchDifficulty && matchStatus && matchTag && matchCompany;
    });
  }, [problems, search, selectedDifficulty, selectedStatus, selectedTag, selectedCompany, userProfile]);

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedDifficulty("All");
    setSelectedStatus("All");
    setSelectedTag("All");
    setSelectedCompany("All");
    setCurrentPage(1);
  };

  // Pagination bounds
  const totalItems = filteredProblems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProblems, startIndex, itemsPerPage]);

  const getStatusIcon = (pId) => {
    if (userProfile.solvedProblemsList.includes(pId)) {
      return <CheckCircle2 size={16} className="text-success shrink-0" />;
    }
    if (userProfile.attemptedProblemsList.includes(pId)) {
      return <AlertCircle size={16} className="text-warning shrink-0" />;
    }
    return <Circle size={16} className="text-text-secondary/35 shrink-0" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Problem Catalog</h2>
        <p className="text-xs text-text-secondary mt-1">Select challenges matching difficulty tiers and target companies.</p>
      </div>

      {/* Filters Card */}
      <Card className="p-5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3.5">
          {/* Search bar */}
          <div className="flex-1">
            <Input
              id="list-search"
              placeholder="Search problem title or ID..."
              icon={Search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Tag selector */}
          <div className="w-full md:w-48 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-text-secondary uppercase">Topic Tag</label>
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface border border-border text-text-primary text-xs rounded-lg px-3 py-2 cursor-pointer w-full focus:outline-none"
            >
              {allTags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Company selector */}
          <div className="w-full md:w-48 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-text-secondary uppercase">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface border border-border text-text-primary text-xs rounded-lg px-3 py-2 cursor-pointer w-full focus:outline-none"
            >
              {allCompanies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <Button variant="outline" size="sm" onClick={resetFilters} className="h-9 w-full md:w-auto">
              <RefreshCw size={14} /> Clear
            </Button>
          </div>
        </div>

        {/* Chips Filters (Difficulty & Status) */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase pr-1">Difficulty:</span>
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setSelectedDifficulty(diff);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 text-xs rounded-full font-semibold border transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-card border-border/80 text-text-secondary hover:text-text-primary"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase pr-1">Status:</span>
            {["All", "Solved", "Attempted", "Unsolved"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setSelectedStatus(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 text-xs rounded-full font-semibold border transition-all cursor-pointer ${
                  selectedStatus === st
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-card border-border/80 text-text-secondary hover:text-text-primary"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Problems Table */}
      <div className="glass rounded-xl border border-border/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border/60 bg-card/45 text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                <th className="py-3 px-5 w-12">Status</th>
                <th className="py-3 px-4 w-16 text-center">ID</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Topic Tags</th>
                <th className="py-3 px-4 text-center">Acceptance</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Target Companies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-xs">
              {paginatedProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-secondary">
                    No coding challenges match your search filters.
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-card/25 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-5">{getStatusIcon(p.id)}</td>
                    <td className="py-3 px-4 text-center text-text-secondary font-mono">{p.id}</td>
                    <td className="py-3 px-4 font-semibold text-text-primary group-hover:text-primary transition-colors">
                      <Link to={`/problems/${p.id}`} className="block w-full h-full">
                        {p.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags.slice(0, 2).map((t) => (
                          <Badge key={t} size="sm" className="font-light">{t}</Badge>
                        ))}
                        {p.tags.length > 2 && (
                          <Badge size="sm" className="font-light bg-zinc-900 border-zinc-950 text-text-secondary">
                            +{p.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-text-secondary font-mono">{p.acceptance}</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={
                        p.difficulty === "Easy" ? "text-success" : p.difficulty === "Medium" ? "text-warning" : "text-danger"
                      }>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary truncate max-w-[150px]">
                      {p.companies.slice(0, 3).join(", ")}
                      {p.companies.length > 3 && ` +${p.companies.length - 3}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="bg-card/35 border-t border-border/40 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-text-secondary">
            Showing <span className="font-bold text-text-primary">{Math.min(totalItems, startIndex + 1)}</span> to{" "}
            <span className="font-bold text-text-primary">{Math.min(totalItems, startIndex + itemsPerPage)}</span> of{" "}
            <span className="font-bold text-text-primary">{totalItems}</span> challenges
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center px-3 text-xs text-text-secondary">
              Page <span className="font-bold text-text-primary mx-1">{currentPage}</span> of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemList;
