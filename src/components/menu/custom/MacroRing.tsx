"use client";

import { cn } from "@/lib/utils";

interface MacroRingProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  className?: string;
}

export function MacroRing({ calories, protein, carbs, fat, className }: MacroRingProps) {
  const total = protein * 4 + carbs * 4 + fat * 9;
  const proteinPct = total > 0 ? (protein * 4 / total) * 100 : 0;
  const carbsPct = total > 0 ? (carbs * 4 / total) * 100 : 0;
  const fatPct = total > 0 ? (fat * 9 / total) * 100 : 0;

  // SVG donut chart
  const r = 52;
  const circ = 2 * Math.PI * r;
  const proteinDash = (proteinPct / 100) * circ;
  const carbsDash = (carbsPct / 100) * circ;
  const fatDash = (fatPct / 100) * circ;

  const proteinOffset = 0;
  const carbsOffset = -(proteinDash);
  const fatOffset = -(proteinDash + carbsDash);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Donut ring */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background track */}
          <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" stroke="#f0e8d0" />

          {total === 0 ? (
            <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" stroke="#f0e8d0" />
          ) : (
            <>
              {/* Protein — blue */}
              <circle
                cx="60" cy="60" r={r} fill="none" strokeWidth="12"
                stroke="#3b82f6"
                strokeDasharray={`${proteinDash} ${circ - proteinDash}`}
                strokeDashoffset={circ * proteinOffset / 100 * 0 + 0}
                strokeLinecap="butt"
              />
              {/* Carbs — amber */}
              <circle
                cx="60" cy="60" r={r} fill="none" strokeWidth="12"
                stroke="#f59e0b"
                strokeDasharray={`${carbsDash} ${circ - carbsDash}`}
                strokeDashoffset={carbsOffset}
                strokeLinecap="butt"
              />
              {/* Fat — red */}
              <circle
                cx="60" cy="60" r={r} fill="none" strokeWidth="12"
                stroke="#ef4444"
                strokeDasharray={`${fatDash} ${circ - fatDash}`}
                strokeDashoffset={fatOffset}
                strokeLinecap="butt"
              />
            </>
          )}
        </svg>

        {/* Center calories */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-olive-900 leading-none">{calories}</span>
          <span className="text-[10px] text-olive-500 uppercase tracking-wide">cal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {[
          { label: "Protein", value: protein, color: "bg-blue-500" },
          { label: "Carbs", value: carbs, color: "bg-amber-400" },
          { label: "Fat", value: fat, color: "bg-red-400" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${m.color}`} />
            <span className="text-[10px] text-olive-500">{m.label}</span>
            <span className="text-xs font-bold text-olive-900">{m.value}g</span>
          </div>
        ))}
      </div>
    </div>
  );
}
