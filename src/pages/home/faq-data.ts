export interface FAQItem {
  id: string
  question: string
  answer: string[]
}

export const faqItems: FAQItem[] = [
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
