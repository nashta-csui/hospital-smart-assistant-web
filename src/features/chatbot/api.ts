import type { ChatbotService } from './types'

export class ChatbotApiService implements ChatbotService {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async sendMessage(message: string): Promise<string> {
    return ""
  }
}
