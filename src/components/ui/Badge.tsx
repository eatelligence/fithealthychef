import { cn } from "@/lib/utils";

type BadgeVariant = "allergen" | "diet" | "chef" | "promo" | "new";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  allergen: "bg-olive-100 text-olive-800 border border-olive-200",
  diet: "bg-gold-100 text-gold-700 border border-gold-200",
  chef: "bg-olive-600 text-cream-50",
  promo: "bg-gold-400 text-olive-900 font-bold",
  new: "bg-cream-200 text-olive-700 border border-cream-300",
};

export function Badge({ children, variant = "allergen", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
