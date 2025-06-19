export interface ChatEntity {
    id: string
    botId: string,
    name: string,
    avatar: string,
    botName: string,
    createdAt: string
}

export interface ChatsState {
    chats: ChatEntity[],
    user: object,
    adding: boolean,
    currentChat: ChatEntity | null
}

export interface CreatedChatEntity {
    id: string,
    name: string,
    botAvatar: string,
    botName: string,
    createdAt: Date
}