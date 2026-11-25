import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SegmentsSection } from "@/components/sections/SegmentsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <HeroSection />

        {/* Tagline strip */}
        <div className="border-t border-b border-white/[0.09] py-6">
          <div className="w-[min(1160px,calc(100%-48px))] mx-auto flex justify-between gap-5 flex-wrap text-[var(--color-muted)] text-[13px]">
            <strong className="text-[var(--color-brand-text)] font-medium">
              Construído para o seu negócio.
            </strong>
            <span>
              <span aria-hidden="true">◈</span> &nbsp; Engenharia de software
            </span>
            <span>
              <span aria-hidden="true">⌘</span> &nbsp; Desenvolvimento sob medida
            </span>
            <span>
              <span aria-hidden="true">↗</span> &nbsp; Evolução contínua
            </span>
          </div>
        </div>

        <SolutionsSection />
        <DifferentialsSection />
        <ProcessSection />
        <SegmentsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
