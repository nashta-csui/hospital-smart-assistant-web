import { FAQAccordion } from './FAQAccordion'
import { faqItems } from './faq-data'

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <section>
        <h2 className="mb-6 text-2xl font-bold">Pertanyaan yang Sering Diajukan</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  )
}
