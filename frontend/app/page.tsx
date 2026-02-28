import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"
import {
  HeroSection,
  TheProblemSection,
  FeaturesSection,
  WomenLegalSupportSection,
  HowItWorksSection,
  CTASection,
} from "@/components/landing/sections"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <HeroSection />
        <TheProblemSection />
        <FeaturesSection />
        <WomenLegalSupportSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <PublicFooter />
    </div>
  )
}
