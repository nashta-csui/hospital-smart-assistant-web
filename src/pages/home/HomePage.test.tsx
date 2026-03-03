import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  describe('FAQ Accordion', () => {
    it('should render the FAQ section heading', () => {
      render(<HomePage />)
      expect(
        screen.getByRole('heading', { name: /pertanyaan yang sering diajukan/i })
      ).toBeInTheDocument()
    })

    it('should render all FAQ items', () => {
      render(<HomePage />)
      expect(
        screen.getByText(/layanan apa saja yang tersedia di rumah sakit ini/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/bagaimana cara membuat janji temu/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/jam berapa saja waktu besuk/i)
      ).toBeInTheDocument()
    })

    it('should not show any answers by default', () => {
      render(<HomePage />)
      expect(
        screen.queryByText(/kami menyediakan berbagai layanan medis/i)
      ).not.toBeInTheDocument()
    })

    it('should expand an FAQ item when clicked', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const firstQuestion = screen.getByText(
        /layanan apa saja yang tersedia di rumah sakit ini/i
      )
      await user.click(firstQuestion)

      expect(
        screen.getByText(/kami menyediakan berbagai layanan medis/i)
      ).toBeInTheDocument()
    })

    it('should collapse an expanded FAQ item when clicked again', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const firstQuestion = screen.getByText(
        /layanan apa saja yang tersedia di rumah sakit ini/i
      )
      await user.click(firstQuestion)
      expect(
        screen.getByText(/kami menyediakan berbagai layanan medis/i)
      ).toBeInTheDocument()

      await user.click(firstQuestion)
      expect(
        screen.queryByText(/kami menyediakan berbagai layanan medis/i)
      ).not.toBeInTheDocument()
    })

    it('should allow multiple FAQ items to be expanded', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const firstQuestion = screen.getByText(
        /layanan apa saja yang tersedia di rumah sakit ini/i
      )
      const secondQuestion = screen.getByText(/bagaimana cara membuat janji temu/i)

      await user.click(firstQuestion)
      await user.click(secondQuestion)

      expect(
        screen.getByText(/kami menyediakan berbagai layanan medis/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/anda dapat membuat janji temu melalui/i)
      ).toBeInTheDocument()
    })

    it('should render multi-line answers correctly', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const firstQuestion = screen.getByText(
        /layanan apa saja yang tersedia di rumah sakit ini/i
      )
      await user.click(firstQuestion)

      // Check that multiple lines are rendered
      expect(screen.getByText(/unit gawat darurat 24 jam/i)).toBeInTheDocument()
      expect(screen.getByText(/rawat inap dan rawat jalan/i)).toBeInTheDocument()
    })
  })
})
