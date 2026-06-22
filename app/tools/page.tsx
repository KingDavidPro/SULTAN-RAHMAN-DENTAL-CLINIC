import type { Metadata } from "next"
import { Camera, Calculator } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { FloatingContact } from "@/components/site/floating-contact"
import { SectionHeading } from "@/components/site/section-heading"
import { SmileAnalyzer } from "@/components/site/smile-analyzer"
import { CostEstimator } from "@/components/site/cost-estimator"

export const metadata: Metadata = {
  title: "Smile Tools",
  description:
    "Use our AI Smile Analyzer to get general observations about your smile, and the Cost Estimator to plan your treatment budget at Sultan Rahman Dental Clinic.",
}

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="AI Smile Tools"
            title="Explore your smile, instantly"
            description="Two free, AI-powered tools to help you understand your options before you visit. For guidance only — your dentist confirms everything in person."
          />

          <section id="smile-analyzer" className="mt-14 scroll-mt-28">
            <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Camera className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-2xl font-bold">AI Smile Analyzer</h3>
              <p className="text-muted-foreground">
                Upload a photo of your smile to receive general observations and relevant service ideas.
              </p>
            </div>
            <SmileAnalyzer />
          </section>

          <section id="cost-estimator" className="mt-20 scroll-mt-28">
            <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calculator className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-2xl font-bold">Treatment Cost Estimator</h3>
              <p className="text-muted-foreground">
                Describe your concern and get an estimated price range based on our typical treatment costs.
              </p>
            </div>
            <CostEstimator />
          </section>
        </div>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
