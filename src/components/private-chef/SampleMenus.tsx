import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SAMPLE_MENUS } from "@/data/sampleMenus";
import { formatPrice } from "@/lib/utils";

export function SampleMenus() {
  return (
    <section id="menus" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Sample Menus"
            title="A Taste of What's Possible"
            subtitle="Every menu is personalised to your event and guests. These are examples of Michele's signature experiences."
          />
        </AnimatedSection>

        <div className="space-y-16">
          {SAMPLE_MENUS.map((menu, mi) => (
            <AnimatedSection key={menu.id} delay={0.1}>
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start ${mi % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative h-80 lg:h-[480px] rounded-3xl overflow-hidden shadow-xl ${mi % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={menu.image}
                    alt={menu.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-900/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-cream-50 text-sm font-medium">Starting from</p>
                      <p className="font-serif text-2xl text-gold-400">{formatPrice(menu.pricePerPerson)} per person</p>
                      <p className="text-cream-200 text-xs">Minimum {menu.minimumGuests} guests</p>
                    </div>
                  </div>
                </div>

                {/* Menu content */}
                <div className={mi % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                    Signature Menu
                  </p>
                  <h3 className="font-serif text-display-md text-olive-900 mb-1 leading-tight">{menu.title}</h3>
                  <p className="font-serif text-lg text-olive-600 italic mb-4">{menu.subtitle}</p>
                  <p className="text-olive-600 leading-relaxed mb-8">{menu.description}</p>

                  {/* Courses */}
                  <div className="space-y-6">
                    {menu.courses.map((course) => (
                      <div key={course.course}>
                        <h4 className="text-xs font-semibold text-olive-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <div className="h-px flex-1 bg-cream-300" />
                          {course.course.charAt(0).toUpperCase() + course.course.slice(1)}
                          <div className="h-px flex-1 bg-cream-300" />
                        </h4>
                        <div className="space-y-3">
                          {course.dishes.map((dish) => (
                            <div key={dish.name} className="flex gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 mt-2" />
                              <div>
                                <p className="font-medium text-olive-900 text-sm">{dish.name}</p>
                                <p className="text-olive-500 text-xs leading-relaxed">{dish.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {menu.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-olive-100 text-olive-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
