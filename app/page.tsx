import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Hero } from '@/components/site/hero'
import { ServicesSection } from '@/components/site/services-section'
import { SmileGallery } from '@/components/site/smile-gallery'
import { DoctorSection } from '@/components/site/doctor-section'
import { WhyChooseUs } from '@/components/site/why-choose-us'
import { ReviewsSection } from '@/components/site/reviews-section'
import { FaqSection } from '@/components/site/faq-section'
import { ContactSection } from '@/components/site/contact-section'
import { FloatingContact } from '@/components/site/floating-contact'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ServicesSection />
        <SmileGallery />
        <DoctorSection />
        <WhyChooseUs />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
