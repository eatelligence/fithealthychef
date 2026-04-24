"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROTEINS, SIDES, SAUCES } from "@/data/customMealIngredients";
import { calculateMacros, calculatePrice, isSelectionComplete } from "@/lib/customMealCalc";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { IngredientCard } from "./IngredientCard";
import { PortionSelector } from "./PortionSelector";
import { SauceCard } from "./SauceCard";
import { MacroRing } from "./MacroRing";
import { Button } from "@/components/ui/Button";
import type { CustomMealSelection, PortionSize, SidePortionSize } from "@/types/customMeal";

const STEPS = [
  { id: "protein", label: "1. Protein", icon: "🥩" },
  { id: "side1", label: "2. First Side", icon: "🥦" },
  { id: "side2", label: "3. Second Side", icon: "🍚" },
  { id: "sauce", label: "4. Sauce", icon: "🫙" },
];

const INITIAL: CustomMealSelection = {
  protein: null,
  proteinPortion: 150,
  side1: null,
  side1Portion: 100,
  side2: null,
  side2Portion: 100,
  sauce: SAUCES[0], // no-sauce default
};

export function CustomMealBuilder() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<CustomMealSelection>(INITIAL);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const macros = useMemo(() => calculateMacros(selection), [selection]);
  const price = useMemo(() => calculatePrice(selection), [selection]);
  const complete = isSelectionComplete(selection);

  // Filtered: exclude the side already chosen in side1 from side2 options
  const side2Options = useMemo(
    () => (selection.side1 ? SIDES.filter((s) => s.id !== selection.side1!.id) : SIDES),
    [selection.side1]
  );

  const handleAddToCart = () => {
    if (!complete) return;
    const customMeal = {
      id: `custom-${Date.now()}`,
      name: buildMealName(selection),
      shortDescription: buildMealDesc(selection),
      image: selection.protein?.image ?? PROTEINS[0].image,
      price,
      subscriptionPrice: Math.round(price * 0.9),
      macros,
      allergens: [],
      dietTags: [],
      isAvailable: true,
      isFeatured: false,
      servingSize: `~${(selection.proteinPortion + selection.side1Portion + selection.side2Portion)}g`,
      stripePriceId: "price_custom_single",
      stripeSubscriptionPriceId: "price_custom_weekly",
    };
    for (let i = 0; i < quantity; i++) {
      addItem(customMeal, "meal", false);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentSide = SIDES.filter((s) => s.category === "carb");
  const currentVeg = SIDES.filter((s) => s.category === "veggie");

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      {/* Left: step builder */}
      <div className="space-y-8">
        {/* Step tabs */}
        <div className="flex overflow-x-auto gap-2 pb-1">
          {STEPS.map((s, i) => {
            const done =
              (i === 0 && selection.protein) ||
              (i === 1 && selection.side1) ||
              (i === 2 && selection.side2) ||
              (i === 3 && selection.sauce);
            return (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                  step === i
                    ? "bg-olive-700 border-olive-700 text-cream-50 shadow-md"
                    : done
                    ? "bg-gold-50 border-gold-300 text-gold-700"
                    : "bg-white border-cream-300 text-olive-500 hover:border-olive-300"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
                {done && i !== step && (
                  <svg className="w-3.5 h-3.5 text-gold-500" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 0: Protein */}
            {step === 0 && (
              <div>
                <h2 className="font-serif text-xl text-olive-900 mb-1">Choose Your Protein</h2>
                <p className="text-olive-500 text-sm mb-5">Select one protein and your preferred serving size.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {PROTEINS.map((p) => (
                    <IngredientCard
                      key={p.id}
                      name={p.name}
                      description={p.description}
                      image={p.image}
                      isSelected={selection.protein?.id === p.id}
                      onSelect={() => setSelection((s) => ({ ...s, protein: p }))}
                      macroSummary={`${Math.round(p.macrosPerGram.protein * selection.proteinPortion)}g protein / ${Math.round(p.macrosPerGram.calories * selection.proteinPortion)} cal`}
                      dietTags={p.dietTags}
                    />
                  ))}
                </div>
                {selection.protein && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200">
                      <PortionSelector
                        portions={selection.protein.availablePortions}
                        selected={selection.proteinPortion}
                        onSelect={(p: PortionSize) => setSelection((s) => ({ ...s, proteinPortion: p }))}
                        label="Protein portion size"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 1: Side 1 */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-xl text-olive-900 mb-1">First Side</h2>
                <p className="text-olive-500 text-sm mb-5">Pick a carb or veggie base.</p>

                {/* Carbs */}
                <p className="text-xs font-semibold text-olive-400 uppercase tracking-wider mb-3">Carbs & Grains</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {currentSide.map((s) => (
                    <IngredientCard
                      key={s.id}
                      name={s.name}
                      image={s.image}
                      isSelected={selection.side1?.id === s.id}
                      onSelect={() => setSelection((sel) => ({ ...sel, side1: s }))}
                      macroSummary={`${Math.round(s.macrosPerGram.carbs * selection.side1Portion)}g carbs / ${Math.round(s.macrosPerGram.calories * selection.side1Portion)} cal`}
                      dietTags={s.dietTags}
                    />
                  ))}
                </div>

                {/* Veggies */}
                <p className="text-xs font-semibold text-olive-400 uppercase tracking-wider mb-3">Vegetables</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {currentVeg.map((s) => (
                    <IngredientCard
                      key={s.id}
                      name={s.name}
                      image={s.image}
                      isSelected={selection.side1?.id === s.id}
                      onSelect={() => setSelection((sel) => ({ ...sel, side1: s }))}
                      macroSummary={`${Math.round(s.macrosPerGram.calories * selection.side1Portion)} cal`}
                      dietTags={s.dietTags}
                    />
                  ))}
                </div>

                {selection.side1 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200">
                      <PortionSelector
                        portions={selection.side1.availablePortions}
                        selected={selection.side1Portion}
                        onSelect={(p: SidePortionSize) => setSelection((s) => ({ ...s, side1Portion: p }))}
                        label="Side 1 portion size"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 2: Side 2 */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl text-olive-900 mb-1">Second Side</h2>
                <p className="text-olive-500 text-sm mb-5">Optional — add a second side to complete your meal.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {/* Skip option */}
                  <button
                    onClick={() => setSelection((s) => ({ ...s, side2: null }))}
                    className={`rounded-2xl border-2 p-4 text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[120px] ${
                      selection.side2 === null
                        ? "border-gold-400 bg-gold-50 text-gold-700 shadow-md"
                        : "border-cream-200 text-olive-400 hover:border-olive-300 bg-white"
                    }`}
                  >
                    <span className="text-2xl">✕</span>
                    <span>No second side</span>
                  </button>

                  {side2Options.map((s) => (
                    <IngredientCard
                      key={s.id}
                      name={s.name}
                      image={s.image}
                      isSelected={selection.side2?.id === s.id}
                      onSelect={() => setSelection((sel) => ({ ...sel, side2: s }))}
                      macroSummary={`${Math.round(s.macrosPerGram.calories * selection.side2Portion)} cal`}
                      dietTags={s.dietTags}
                    />
                  ))}
                </div>

                {selection.side2 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200">
                      <PortionSelector
                        portions={selection.side2.availablePortions}
                        selected={selection.side2Portion}
                        onSelect={(p: SidePortionSize) => setSelection((s) => ({ ...s, side2Portion: p }))}
                        label="Side 2 portion size"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 3: Sauce */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-xl text-olive-900 mb-1">Choose Your Sauce</h2>
                <p className="text-olive-500 text-sm mb-5">Add a finishing sauce — or keep it simple.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SAUCES.map((sauce) => (
                    <SauceCard
                      key={sauce.id}
                      sauce={sauce}
                      isSelected={selection.sauce?.id === sauce.id}
                      onSelect={() => setSelection((s) => ({ ...s, sauce }))}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step navigation */}
        <div className="flex justify-between gap-4 pt-2">
          {step > 0 && (
            <Button variant="secondary" size="md" onClick={() => setStep(step - 1)}>
              ← Back
            </Button>
          )}
          {step < STEPS.length - 1 && (
            <Button
              variant="primary"
              size="md"
              className="ml-auto"
              onClick={() => setStep(step + 1)}
            >
              Continue →
            </Button>
          )}
        </div>
      </div>

      {/* Right: sticky summary */}
      <div className="lg:sticky lg:top-24 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6">
          <p className="text-xs font-semibold text-olive-400 uppercase tracking-wider mb-4">Your Meal</p>

          {/* Macro ring */}
          <div className="flex justify-center mb-5">
            <MacroRing
              calories={macros.calories}
              protein={macros.protein}
              carbs={macros.carbs}
              fat={macros.fat}
            />
          </div>

          {/* Selection summary */}
          <div className="space-y-2 text-sm mb-5">
            <SummaryLine icon="🥩" label="Protein" value={selection.protein ? `${selection.protein.name} (${selection.proteinPortion}g)` : "—"} complete={!!selection.protein} />
            <SummaryLine icon="🥦" label="Side 1" value={selection.side1 ? `${selection.side1.name} (${selection.side1Portion}g)` : "—"} complete={!!selection.side1} />
            <SummaryLine icon="🍚" label="Side 2" value={selection.side2 ? `${selection.side2.name} (${selection.side2Portion}g)` : "None"} complete={true} optional />
            <SummaryLine icon="🫙" label="Sauce" value={selection.sauce?.name ?? "None"} complete={true} />
          </div>

          <div className="h-px bg-cream-200 my-4" />

          {/* Quantity */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-olive-700">Quantity</p>
            <div className="flex items-center gap-2 border border-cream-300 rounded-full px-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-olive-600 hover:text-olive-900 text-xl leading-none">−</button>
              <span className="w-6 text-center font-bold text-olive-900 text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-olive-600 hover:text-olive-900 text-xl leading-none">+</button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-olive-500">Total</p>
            <p className="font-serif text-2xl font-bold text-olive-900">{formatPrice(price * quantity)}</p>
          </div>

          <Button
            variant={added ? "ghost" : "primary"}
            size="lg"
            className="w-full"
            disabled={!complete}
            onClick={handleAddToCart}
          >
            {added ? (
              <><span>✓</span> Added to Cart</>
            ) : complete ? (
              "Add to Cart"
            ) : (
              "Choose Protein & Side to Continue"
            )}
          </Button>

          {!complete && (
            <p className="text-center text-xs text-olive-400 mt-2">
              Minimum: protein + one side
            </p>
          )}
        </div>

        {/* Nutrition tip */}
        <div className="bg-olive-50 rounded-2xl p-4 border border-olive-100">
          <p className="text-xs font-semibold text-olive-700 mb-1">💡 Chef's Tip</p>
          <p className="text-xs text-olive-600 leading-relaxed">
            For performance & recovery, aim for <strong>30–40g protein</strong> per meal. Pair with a complex carb like brown rice or sweet potato for sustained energy.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryLine({
  icon,
  label,
  value,
  complete,
  optional,
}: {
  icon: string;
  label: string;
  value: string;
  complete: boolean;
  optional?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-base leading-none mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-olive-400 text-[10px] uppercase tracking-wide block">{label}{optional ? " (opt.)" : ""}</span>
        <span className={`text-xs font-medium leading-tight ${complete && value !== "—" ? "text-olive-900" : "text-olive-400"}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function buildMealName(s: CustomMealSelection): string {
  const parts = [s.protein?.name ?? "Custom"].filter(Boolean);
  return `Custom: ${parts[0]}`;
}

function buildMealDesc(s: CustomMealSelection): string {
  const parts = [
    s.protein?.name,
    s.side1?.name,
    s.side2?.name,
    s.sauce?.id !== "no-sauce" ? s.sauce?.name : null,
  ].filter(Boolean);
  return parts.join(", ");
}
