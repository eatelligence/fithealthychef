import type { Macros } from "@/types/meal";

interface MacroBadgeProps {
  macros: Macros;
  compact?: boolean;
}

export function MacroBadge({ macros, compact = false }: MacroBadgeProps) {
  const items = compact
    ? [
        { label: "P", value: macros.protein, color: "bg-blue-50 text-blue-700" },
        { label: "C", value: macros.carbs, color: "bg-amber-50 text-amber-700" },
        { label: "F", value: macros.fat, color: "bg-red-50 text-red-700" },
      ]
    : [
        { label: "Protein", value: macros.protein, color: "bg-blue-50 text-blue-700" },
        { label: "Carbs", value: macros.carbs, color: "bg-amber-50 text-amber-700" },
        { label: "Fat", value: macros.fat, color: "bg-red-50 text-red-700" },
      ];

  return (
    <div className="flex gap-2">
      {items.map((m) => (
        <div key={m.label} className={`flex-1 rounded-lg px-2 py-1.5 text-center ${m.color}`}>
          <p className="text-[10px] uppercase tracking-wide font-medium opacity-70">{m.label}</p>
          <p className="text-xs font-bold leading-tight">{m.value}g</p>
        </div>
      ))}
      <div className="flex-1 rounded-lg px-2 py-1.5 text-center bg-gold-100 text-gold-700">
        <p className="text-[10px] uppercase tracking-wide font-medium opacity-70">Cal</p>
        <p className="text-xs font-bold leading-tight">{macros.calories}</p>
      </div>
    </div>
  );
}
