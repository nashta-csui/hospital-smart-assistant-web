import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Navbar } from '@/shared/ui/navbar'

describe('Navbar', () => {
  it('harus merender elemen navigasi', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('harus menampilkan nama brand aplikasi', () => {
    render(<Navbar />)
    expect(screen.getByText('Hospital Assistant')).toBeInTheDocument()
  })

  it('harus menampilkan link Dashboard', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('harus menampilkan link Chatbot', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /chatbot/i })).toBeInTheDocument()
  })

  it('harus menampilkan link Jadwal Dokter', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /jadwal dokter/i })).toBeInTheDocument()
  })

  it('harus menampilkan link Profil', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /profil/i })).toBeInTheDocument()
  })

  it('harus menerima className tambahan', () => {
    render(<Navbar className="test-class" />)
    expect(screen.getByRole('navigation')).toHaveClass('test-class')
  })
})
