import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CHEF } from "@/data/chef";

const ICONS: Record<string, React.ReactNode> = {
  "chef-hat": (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 019.18 0A4 4 0 0118 13.87V21H6zM6 17h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  anchor: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" strokeLinecap="round" />
      <path d="M12 8v13M5 12H2a10 10 0 0020 0h-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dumbbell: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.5 6.5h11M6.5 17.5h11M3 7.5h3v9H3zM18 7.5h3v9h-3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" />
    </svg>
  ),
  leaf: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 20A7 7 0 0118 7h1a8 8 0 01-8 8 4 4 0 01-4-4c0-2.2 1.8-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21l7.5-7.5" strokeLinecap="round" />
    </svg>
  ),
};

export function CredentialsBanner() {
  return (
    <section className="py-20 bg-olive-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-12">
            Credentials & Experience
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CHEF.credentials.map((cred, i) => (
            <AnimatedSection key={cred.label} delay={i * 0.07}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-olive-800 rounded-2xl flex items-center justify-center text-gold-400">
                  {ICONS[cred.icon] ?? (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className="text-cream-200 text-xs leading-tight font-medium">{cred.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
