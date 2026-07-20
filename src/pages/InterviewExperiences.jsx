import React, { useState, useMemo } from "react";
import { Search, Briefcase, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";

export const InterviewExperiences = () => {
  const {
    interviewExperiences,
    companies,
    toggleExperienceBookmark,
    bookmarkedExperienceIds
  } = useApp();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");

  // Selected experience details Modal
  const [selectedExpId, setSelectedExpId] = useState(null);

  const activeExp = interviewExperiences.find(exp => exp.id === selectedExpId);

  const filteredExps = useMemo(() => {
    return interviewExperiences.filter((exp) => {
      const matchSearch =
        exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.role.toLowerCase().includes(search.toLowerCase()) ||
        exp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCompany = selectedCompany === "All" || exp.company === selectedCompany;

      return matchSearch && matchCompany;
    });
  }, [interviewExperiences, search, selectedCompany]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Interview Experiences</h2>
        <p className="text-xs text-text-secondary mt-1">Read detailed technical assessment logs shared by actual candidates.</p>
      </div>

      {/* Grid of Company shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {companies.slice(0, 8).map((comp) => {
          const isSelected = selectedCompany === comp.name;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompany(isSelected ? "All" : comp.name)}
              className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border hover:border-text-secondary/50 text-text-secondary hover:text-text-primary"
              }`}
            >
              <Briefcase size={16} className="mb-1.5" />
              <span className="text-[10px] font-bold truncate max-w-[80px]">{comp.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main split: Filter bar & list results */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left column: Search / filters */}
        <div className="lg:col-span-1">
          <Card className="p-4 flex flex-col gap-3">
            <Input
              id="exp-search"
              placeholder="Search roles, tags..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {selectedCompany !== "All" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCompany("All")}
                className="w-full text-[10px] font-bold"
              >
                Clear Company Filter
              </Button>
            )}
          </Card>
        </div>

        {/* Right column: Experiences list */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          {filteredExps.length === 0 ? (
            <div className="glass p-12 text-center text-xs text-text-secondary rounded-xl">
              No interview experiences matching criteria. Try broadening search queries.
            </div>
          ) : (
            filteredExps.map((exp) => {
              const isSaved = bookmarkedExperienceIds.includes(exp.id);
              
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className="p-5 bg-card/45 border border-border hover:border-text-secondary/40 rounded-xl flex gap-4 text-left cursor-pointer transition-all hover:bg-card group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2 items-center">
                        <Badge variant="primary" size="sm">{exp.company}</Badge>
                        <span className="text-[9px] text-text-secondary font-mono">{exp.date}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExperienceBookmark(exp.id);
                        }}
                        className="text-text-secondary hover:text-text-primary p-1 cursor-pointer rounded"
                      >
                        {isSaved ? (
                          <BookmarkCheck size={14} className="text-primary" />
                        ) : (
                          <Bookmark size={14} />
                        )}
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                      {exp.title}
                    </h4>
                    <p className="text-[10px] text-text-secondary mt-1.5 leading-relaxed font-light line-clamp-2">
                      {exp.summary}
                    </p>

                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      <Badge variant={exp.difficulty === "Easy" ? "success" : exp.difficulty === "Medium" ? "warning" : "danger"} size="sm">
                        {exp.difficulty}
                      </Badge>
                      <Badge variant={exp.verdict === "Accepted" ? "success" : "danger"} size="sm">
                        {exp.verdict}
                      </Badge>
                      {exp.tags.map(t => (
                        <Badge key={t} size="sm" className="font-light">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight size={16} className="text-text-secondary/40 group-hover:text-text-primary transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detailed Experience Modal */}
      <Modal isOpen={selectedExpId !== null} onClose={() => setSelectedExpId(null)} title="Interview Detailed Log">
        {activeExp && (
          <div className="flex flex-col gap-4 font-light">
            <div className="flex justify-between items-center">
              <div className="flex gap-2.5 items-center">
                <Badge variant="primary" size="sm">{activeExp.company}</Badge>
                <h3 className="text-sm font-bold text-text-primary">{activeExp.role}</h3>
              </div>
              <Badge variant={activeExp.verdict === "Accepted" ? "success" : "danger"} size="sm">
                {activeExp.verdict}
              </Badge>
            </div>

            <div className="border-t border-border/30 my-2" />

            <div className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-normal">
              {activeExp.content.replace(/###/g, "").replace(/\*\*/g, "")}
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExpId(null)}
                className="w-full font-semibold"
              >
                Close Log
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default InterviewExperiences;
