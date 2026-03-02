import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('should display Hello', () => {
    render(<App />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
