import type { ChatbotService } from './types'

export class ChatbotApiService implements ChatbotService {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async sendMessage(message: string): Promise<string> {
    let response: Response

    try {
      response = await fetch(`${this.baseUrl}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
    } catch {
      throw new Error('Failed to send message. Please check your connection.')
    }

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`)
    }

    try {
      const data = await response.json()
      return data.reply
    } catch {
      throw new Error('Invalid response from server.')
    }
  }
}
