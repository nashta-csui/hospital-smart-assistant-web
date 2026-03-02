import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
import type { FAQItem } from './faq-data'

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: Readonly<FAQAccordionProps>) {
  return (
    <Accordion type="multiple">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <ul className="list-inside list-disc space-y-1">
              {item.answer.map((line, index) => (
                <li key={`${item.id}-${index}`}>{line}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
