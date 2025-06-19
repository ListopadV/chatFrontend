export interface MessageDto {
    message_id: string,
    message_order: number,
    sender_type: "bot" | "user",
    text: string,
    create_at: Date
}

export interface MessagesDto {
    bot_message: MessageDto,
    user_message: MessageDto
}