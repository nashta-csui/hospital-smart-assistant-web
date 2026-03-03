import { useCallback, useState } from 'react'
import type { ChatbotService, Message } from './types'

function generateId(): string {
  return crypto.randomUUID()
}

export function useChatbot(service: ChatbotService) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed) return

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setError(null)

      try {
        const reply = await service.sendMessage(trimmed)
        const botMessage: Message = {
          id: generateId(),
          role: 'bot',
          content: reply,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [service]
  )

  return { messages, isLoading, error, sendMessage }
}
