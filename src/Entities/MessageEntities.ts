export interface MessageEntity {
    id: string,
    sender: "bot" | "user",
    order: number,
    text: string,
    avatar?: string,
    createdAt: Date
}

export interface MessagesState {
    messages: MessageEntity[],
    messageOrder: number
}