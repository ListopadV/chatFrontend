class IDManager {
  private botId: string | null = null;
  private chatId: string | null = null;

  setBotId(id: string): void {
    this.botId = id;
  }

  setChatId(id: string): void {
    this.chatId = id;
  }

  clear(): void {
    this.botId = null;
    this.chatId = null;
  }

  getBotId(): string | null {
    return this.botId;
  }

  getChatId(): string | null {
    return this.chatId;
  }
}

export const idManager = new IDManager();
