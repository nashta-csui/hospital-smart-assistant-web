import type { ChatbotService, Message } from './types'

export function useChatbot(service: ChatbotService) {
  const messages: Message[] = []

  return {
    messages,
    isLoading: false,
    error: null as string | null,
    sendMessage: (_content: string) => {},
  }
}
