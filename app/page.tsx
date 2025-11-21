import CtaSection from "@/components/landing/CtaSection";
import FaqSection from "@/components/landing/FaqSection";
import Features from "@/components/landing/Features";
import FooterSection from "@/components/landing/FooterSection";
import Hero from "@/components/landing/Hero";
import LogoCloud from "@/components/landing/LogoCloud";
import ValueProposition from "@/components/landing/PricingSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import VideoSection from "@/components/landing/VideoSection";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";

import Header from "@/components/navigation/Header";
import SectionAnimation from "@/components/shared/SectionAnimation";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SectionAnimation>
          <Hero />
        </SectionAnimation>
        <SectionAnimation delay={0.1}>
          <LogoCloud />
        </SectionAnimation>
        <SectionAnimation>
          <Features />
        </SectionAnimation>
        <SectionAnimation>
          <VideoSection />
        </SectionAnimation>
        <SectionAnimation>
          <WhyChooseUs />
        </SectionAnimation>
        <SectionAnimation>
          <ValueProposition />
        </SectionAnimation>
        <SectionAnimation>
          <TestimonialSection />
        </SectionAnimation>

        <SectionAnimation>
          <FaqSection />
        </SectionAnimation>
        <SectionAnimation>
          <CtaSection />
        </SectionAnimation>
      </main>
      <FooterSection />
    </>
  );
}
