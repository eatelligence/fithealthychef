"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartItemCount, useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/menu", label: "Meal Prep" },
  { href: "/menu/create-your-own", label: "Create Your Own" },
  { href: "/private-chef", label: "Private Chef" },
  { href: "/about", label: "About the Chef" },
];

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useCartItemCount();
  const openCart = useCartStore((s) => s.openCart);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-cream-200"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-olive-600 rounded-full flex items-center justify-center group-hover:bg-olive-700 transition-colors">
                <svg className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-semibold text-olive-900 leading-tight text-sm">
                  Fit & Healthy Chef
                </p>
                <p className="text-[10px] text-olive-500 tracking-wider uppercase leading-none">
                  Sydney
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === href
                      ? "text-olive-900 border-b-2 border-gold-400 pb-0.5"
                      : "text-olive-600 hover:text-olive-900"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/private-chef"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-600 text-cream-50 text-sm font-medium hover:bg-olive-700 transition-colors"
              >
                Book a Chef
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 text-olive-700 hover:text-olive-900 transition-colors"
                aria-label="Open cart"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-400 text-olive-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-olive-700 hover:text-olive-900"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {mobileOpen ? (
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                  ) : (
                    <>
                      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)}>
          <nav
            className="absolute top-[64px] left-0 right-0 bg-cream-50 border-b border-cream-200 shadow-lg py-4 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block py-3 text-base font-medium text-olive-700 hover:text-olive-900 border-b border-cream-200 last:border-0"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/private-chef"
              className="mt-4 w-full flex items-center justify-center py-3 rounded-full bg-olive-600 text-cream-50 font-medium hover:bg-olive-700 transition-colors"
            >
              Book a Private Chef
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
