import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ChatbotApiService } from './api'

describe('ChatbotApiService', () => {
  let service: ChatbotApiService

  beforeEach(() => {
    service = new ChatbotApiService('/api/chatbot')
    vi.restoreAllMocks()
  })

  describe('sendMessage', () => {
    it('should send a POST request with the correct body', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ reply: 'Hello!' }),
      })
      vi.stubGlobal('fetch', mockFetch)

      await service.sendMessage('Hi')

      expect(mockFetch).toHaveBeenCalledWith('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hi' }),
      })
    })

    it('should return the bot reply on success', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ reply: 'I can help with that.' }),
        })
      )

      const reply = await service.sendMessage('Help me')
      expect(reply).toBe('I can help with that.')
    })

    it('should throw an error on network failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new TypeError('Network error'))
      )

      await expect(service.sendMessage('Hi')).rejects.toThrow(
        'Failed to send message. Please check your connection.'
      )
    })

    it('should throw an error on non-OK response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        })
      )

      await expect(service.sendMessage('Hi')).rejects.toThrow(
        'Server error: 500 Internal Server Error'
      )
    })

    it('should throw an error on malformed JSON response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.reject(new SyntaxError('Unexpected token')),
        })
      )

      await expect(service.sendMessage('Hi')).rejects.toThrow(
        'Invalid response from server.'
      )
    })
  })
})
