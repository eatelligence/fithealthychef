import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-display-md text-olive-900 leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-olive-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-5 h-0.5 w-16 bg-gold-400",
          align === "center" ? "mx-auto" : "ml-0"
        )}
      />
    </div>
  );
}
