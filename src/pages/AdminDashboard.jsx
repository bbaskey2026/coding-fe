import React, { useState } from "react";
import { PlusCircle, ShieldAlert, Award, FileSpreadsheet, Eye, Trash2, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Input, TextArea } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export const AdminDashboard = () => {
  const { problems, addProblem, users } = useApp();

  // New problem form fields
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Arrays");
  const [companies, setCompanies] = useState("Google");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addProblem({
      title,
      difficulty,
      description,
      tags: tags.split(",").map(t => t.trim()),
      companies: companies.split(",").map(c => c.trim())
    });

    // Reset fields
    setTitle("");
    setDescription("");
    setTags("Arrays");
    setCompanies("Google");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div className="flex items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Admin Control Center</h2>
        <Badge variant="primary" size="sm">Platform Administrator</Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Problems", count: problems.length, detail: "Across all diff levels" },
          { label: "Registered Users", count: users.length, detail: "Platform wide registrations" },
          { label: "Ongoing Sprints", count: 2, detail: "Contest evaluation buffers" },
          { label: "Reported Anomalies", count: 0, detail: "Auto-moderated flags" }
        ].map((m, idx) => (
          <Card key={idx} className="p-4">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{m.label}</span>
            <div className="text-2xl font-extrabold text-text-primary mt-1.5 font-mono">{m.count}</div>
            <span className="text-[9px] text-text-secondary mt-1 font-light block">{m.detail}</span>
          </Card>
        ))}
      </div>

      {/* Forms & Table Layout split view */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Column: Form compiler */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
                <PlusCircle size={14} className="text-accent" /> Register Coding Challenge
              </h3>
            </CardHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <Input
                label="Problem Title"
                id="adm-title"
                placeholder="e.g. Find K-th Graph Path"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-surface border border-border text-text-primary text-xs rounded-lg px-3 py-2 cursor-pointer focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <TextArea
                label="Problem Description (Markdown supported)"
                id="adm-desc"
                placeholder="Describe constraints and input details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Input
                label="Topic Tags (comma-separated)"
                id="adm-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />

              <Input
                label="Target Companies (comma-separated)"
                id="adm-comp"
                value={companies}
                onChange={(e) => setCompanies(e.target.value)}
                required
              />

              <Button type="submit" className="w-full py-2.5 font-semibold mt-2">
                Deploy Challenge
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: Problems review logs */}
        <div className="lg:col-span-3">
          <Card className="p-5">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Recently Registered Challenges</h3>
            </CardHeader>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 bg-card/25 text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                    <th className="py-2.5 px-4 w-12 text-center">ID</th>
                    <th className="py-2.5 px-4">Title</th>
                    <th className="py-2.5 px-4">Difficulty</th>
                    <th className="py-2.5 px-4 text-right">Moderations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {problems.slice(0, 10).map((p) => (
                    <tr key={p.id} className="hover:bg-card/20 transition-colors">
                      <td className="py-2.5 px-4 text-center font-mono text-text-secondary">{p.id}</td>
                      <td className="py-2.5 px-4 font-semibold text-text-primary">{p.title}</td>
                      <td className="py-2.5 px-4 font-bold">
                        <span className={
                          p.difficulty === "Easy" ? "text-success" : p.difficulty === "Medium" ? "text-warning" : "text-danger"
                        }>
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right flex justify-end gap-1.5 mt-0.5">
                        <button className="p-1 rounded bg-card border border-border text-text-secondary hover:text-text-primary cursor-pointer">
                          <Eye size={12} />
                        </button>
                        <button className="p-1 rounded bg-card border border-border text-danger hover:bg-danger/10 cursor-pointer">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
