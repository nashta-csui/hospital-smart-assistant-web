import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useChatbot } from './hooks'
import type { ChatbotService } from './types'

/** Creates a mock ChatbotService for testing. */
function createMockService(
  overrides: Partial<ChatbotService> = {}
): ChatbotService {
  return {
    sendMessage: vi.fn().mockResolvedValue('Bot reply'),
    ...overrides,
  }
}

describe('useChatbot', () => {
  let mockService: ChatbotService

  beforeEach(() => {
    mockService = createMockService()
  })

  describe('initial state', () => {
    it('should start with an empty messages array', () => {
      const { result } = renderHook(() => useChatbot(mockService))
      expect(result.current.messages).toEqual([])
    })

    it('should start with isLoading as false', () => {
      const { result } = renderHook(() => useChatbot(mockService))
      expect(result.current.isLoading).toBe(false)
    })

    it('should start with error as null', () => {
      const { result } = renderHook(() => useChatbot(mockService))
      expect(result.current.error).toBeNull()
    })
  })

  describe('sendMessage', () => {
    it('should add a user message immediately', async () => {
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Hello')
      })

      const userMessage = result.current.messages.find(
        (m) => m.role === 'user'
      )
      expect(userMessage).toBeDefined()
      expect(userMessage!.content).toBe('Hello')
    })

    it('should add a bot reply after the API responds', async () => {
      mockService = createMockService({
        sendMessage: vi.fn().mockResolvedValue('I can help!'),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Help me')
      })

      const botMessage = result.current.messages.find((m) => m.role === 'bot')
      expect(botMessage).toBeDefined()
      expect(botMessage!.content).toBe('I can help!')
    })

    it('should set isLoading to true while waiting for the API', async () => {
      let resolvePromise: (value: string) => void
      const pendingPromise = new Promise<string>((resolve) => {
        resolvePromise = resolve
      })

      mockService = createMockService({
        sendMessage: vi.fn().mockReturnValue(pendingPromise),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      act(() => {
        result.current.sendMessage('Hello')
      })

      expect(result.current.isLoading).toBe(true)

      await act(async () => {
        resolvePromise!('Reply')
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('should accumulate multiple messages in order', async () => {
      mockService = createMockService({
        sendMessage: vi
          .fn()
          .mockResolvedValueOnce('Reply 1')
          .mockResolvedValueOnce('Reply 2'),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('First')
      })
      await act(async () => {
        result.current.sendMessage('Second')
      })

      expect(result.current.messages).toHaveLength(4)
      expect(result.current.messages[0].content).toBe('First')
      expect(result.current.messages[0].role).toBe('user')
      expect(result.current.messages[1].content).toBe('Reply 1')
      expect(result.current.messages[1].role).toBe('bot')
      expect(result.current.messages[2].content).toBe('Second')
      expect(result.current.messages[2].role).toBe('user')
      expect(result.current.messages[3].content).toBe('Reply 2')
      expect(result.current.messages[3].role).toBe('bot')
    })

    it('should assign unique IDs to each message', async () => {
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Hello')
      })

      const ids = result.current.messages.map((m) => m.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should set timestamp on messages', async () => {
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Hello')
      })

      for (const message of result.current.messages) {
        expect(message.timestamp).toBeInstanceOf(Date)
      }
    })
  })

  describe('error handling', () => {
    it('should set error when the service fails', async () => {
      mockService = createMockService({
        sendMessage: vi.fn().mockRejectedValue(new Error('Network failure')),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Hello')
      })

      expect(result.current.error).toBe('Network failure')
    })

    it('should clear error on the next successful send', async () => {
      mockService = createMockService({
        sendMessage: vi
          .fn()
          .mockRejectedValueOnce(new Error('Temporary error'))
          .mockResolvedValueOnce('Success'),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Fail')
      })
      expect(result.current.error).toBe('Temporary error')

      await act(async () => {
        result.current.sendMessage('Succeed')
      })
      expect(result.current.error).toBeNull()
    })

    it('should set a default error message for non-Error exceptions', async () => {
      mockService = createMockService({
        sendMessage: vi.fn().mockRejectedValue('string error'),
      })
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('Hello')
      })

      expect(result.current.error).toBe('An unexpected error occurred.')
    })
  })

  describe('input validation', () => {
    it('should not send empty messages', async () => {
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('')
      })

      expect(mockService.sendMessage).not.toHaveBeenCalled()
      expect(result.current.messages).toHaveLength(0)
    })

    it('should not send whitespace-only messages', async () => {
      const { result } = renderHook(() => useChatbot(mockService))

      await act(async () => {
        result.current.sendMessage('   ')
      })

      expect(mockService.sendMessage).not.toHaveBeenCalled()
      expect(result.current.messages).toHaveLength(0)
    })
  })
})
