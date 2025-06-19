export interface MessageDto {
    message_id: string,
    message_order: number,
    sender_type: "bot" | "user",
    text: string,
    created_at: Date
}