"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface IngredientCardProps {
  name: string;
  description?: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
  macroSummary?: string;
  dietTags?: string[];
}

export function IngredientCard({
  name,
  description,
  image,
  isSelected,
  onSelect,
  badge,
  macroSummary,
  dietTags = [],
}: IngredientCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative w-full text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2",
        isSelected
          ? "border-gold-400 shadow-lg shadow-gold-400/20 scale-[1.02]"
          : "border-cream-200 hover:border-olive-300 hover:shadow-md"
      )}
    >
      {/* Image */}
      <div className="relative h-28 overflow-hidden bg-cream-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-400"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className={cn(
          "absolute inset-0 transition-colors duration-200",
          isSelected ? "bg-gold-400/20" : "bg-transparent"
        )} />
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-3.5 h-3.5 text-olive-900" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {badge && (
          <div className="absolute top-2 left-2 bg-olive-700 text-cream-50 text-[9px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 bg-white">
        <p className={cn(
          "font-semibold text-sm leading-tight mb-0.5 transition-colors",
          isSelected ? "text-gold-600" : "text-olive-900"
        )}>
          {name}
        </p>
        {description && (
          <p className="text-[10px] text-olive-500 leading-tight line-clamp-2">{description}</p>
        )}
        {macroSummary && (
          <p className="text-[10px] text-olive-600 font-medium mt-1">{macroSummary}</p>
        )}
        {dietTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {dietTags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-olive-50 text-olive-600 rounded-full font-medium capitalize">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
