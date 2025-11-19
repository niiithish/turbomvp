import Header from "@/components/navigation/Header"
import Hero from "@/components/landing/Hero"
import LogoCloud from "@/components/landing/LogoCloud"
import Features from "@/components/landing/Features"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import ValueProposition from "@/components/landing/PricingSection"
import Testimonials from "@/components/landing/Testimonials"
import FaqSection from "@/components/landing/FaqSection"
import CtaSection from "@/components/landing/CtaSection"
import FooterSection from "@/components/landing/FooterSection"
import AnnouncementBar from "@/components/landing/AnnouncementBar"
import SectionAnimation from "@/components/shared/SectionAnimation"

export default function Home() {
  return (
    <>
      <AnnouncementBar />
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
          <HowItWorksSection />
        </SectionAnimation>
        <SectionAnimation>
          <ValueProposition />
        </SectionAnimation>
        <SectionAnimation>
          <Testimonials />
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
  )
}