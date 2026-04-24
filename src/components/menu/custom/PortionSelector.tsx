"use client";

import { cn } from "@/lib/utils";

interface PortionSelectorProps<T extends number> {
  portions: T[];
  selected: T;
  onSelect: (p: T) => void;
  label?: string;
}

export function PortionSelector<T extends number>({
  portions,
  selected,
  onSelect,
  label,
}: PortionSelectorProps<T>) {
  return (
    <div>
      {label && (
        <p className="text-xs font-medium text-olive-500 mb-2 uppercase tracking-wide">{label}</p>
      )}
      <div className="flex gap-2">
        {portions.map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-150 border-2",
              selected === p
                ? "bg-gold-400 border-gold-400 text-olive-900 shadow-sm"
                : "bg-white border-cream-300 text-olive-600 hover:border-olive-300 hover:text-olive-900"
            )}
          >
            {p}g
          </button>
        ))}
      </div>
    </div>
  );
}
