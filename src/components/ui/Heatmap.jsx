import React from "react";
import { Tooltip } from "./Tooltip";

export const Heatmap = ({ data = [], className = "" }) => {
  // Generate 365 contribution squares grouped in 53 weeks (columns of 7 rows)
  // To keep it simple and ultra-responsive:
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper to color squares
  const getColorClass = (count) => {
    if (count === 0) return "bg-zinc-900 border-zinc-950";
    if (count <= 2) return "bg-primary/20 border-primary/30";
    if (count <= 4) return "bg-primary/45 border-primary/55";
    if (count <= 6) return "bg-primary/70 border-primary/80";
    return "bg-primary border-primary-dark";
  };

  // Group 365 days into columns of 7
  const cols = [];
  let tempCol = [];
  for (let i = 0; i < 364; i++) {
    tempCol.push(data[i] || 0);
    if (tempCol.length === 7) {
      cols.push(tempCol);
      tempCol = [];
    }
  }

  return (
    <div className={`glass p-6 rounded-xl border border-border/50 overflow-x-auto w-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-text-primary">Coding Submissions Activity</h4>
        <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-950" />
          <div className="w-2.5 h-2.5 rounded bg-primary/20" />
          <div className="w-2.5 h-2.5 rounded bg-primary/45" />
          <div className="w-2.5 h-2.5 rounded bg-primary/70" />
          <div className="w-2.5 h-2.5 rounded bg-primary" />
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-2 select-none min-w-[760px]">
        {/* Week Day Labels */}
        <div className="flex flex-col justify-around text-[9px] text-text-secondary pr-1 font-medium mt-4 h-[90px]">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Heatmap Columns */}
        <div className="flex-1 flex flex-col gap-1.5">
          {/* Month Labels */}
          <div className="flex text-[9px] text-text-secondary font-medium pl-0.5 justify-between">
            {months.map((m) => (
              <span key={m} className="w-[50px]">{m}</span>
            ))}
          </div>

          <div className="flex gap-[3.5px]">
            {cols.map((col, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-[3.5px]">
                {col.map((count, rIdx) => {
                  const dayOffset = cIdx * 7 + rIdx;
                  return (
                    <div
                      key={rIdx}
                      className={`w-[10px] h-[10px] rounded-[1.5px] border-[0.5px] transition-colors hover:scale-125 cursor-pointer ${getColorClass(
                        count
                      )}`}
                      title={`${count} submissions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Heatmap;
