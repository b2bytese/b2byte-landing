import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <main id="main-content">
        {/* Tagline strip */}
        <div className="border-b border-[var(--color-border)] py-[27px]">
          <div className="w-[min(1480px,calc(100%-100px))] mx-auto flex justify-between gap-4 flex-wrap font-mono text-[12px] text-[var(--color-muted)]">
            <span>01 / ENGENHARIA DE SOFTWARE</span>
            <span>02 / DESENVOLVIMENTO SOB MEDIDA</span>
            <span>03 / EVOLUÇÃO CONTÍNUA</span>
          </div>
        </div>

        <SolutionsSection />
        <DifferentialsSection />
        <InteractiveShowcase />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
