import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'

interface FAQItem {
  id: string
  question: string
  answer: string[]
}

const faqItems: FAQItem[] = [
  {
    id: 'services',
    question: 'Layanan apa saja yang tersedia di rumah sakit ini?',
    answer: [
      'Kami menyediakan berbagai layanan medis lengkap, termasuk:',
      'Unit Gawat Darurat 24 jam',
      'Rawat inap dan rawat jalan',
      'Layanan bedah dan diagnostik',
      'Perawatan spesialis dan subspesialis',
    ],
  },
  {
    id: 'appointment',
    question: 'Bagaimana cara membuat janji temu?',
    answer: [
      'Anda dapat membuat janji temu melalui beberapa cara:',
      'Portal online kami di website resmi',
      'Menghubungi resepsionis melalui telepon',
      'Datang langsung ke rumah sakit',
    ],
  },
  {
    id: 'visiting-hours',
    question: 'Jam berapa saja waktu besuk?',
    answer: [
      'Waktu besuk tersedia setiap hari:',
      'Pagi: 10.00 - 12.00 WIB',
      'Sore: 16.00 - 20.00 WIB',
      'Pengaturan khusus dapat dilakukan untuk ICU dan bangsal anak.',
    ],
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <section>
        <h2 className="mb-6 text-2xl font-bold">Pertanyaan yang Sering Diajukan</h2>
        <Accordion type="multiple">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  {item.answer.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
