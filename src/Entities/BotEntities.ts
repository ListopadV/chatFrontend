export interface BotEntity {
    id: string,
    name: string,
    model: string,
    avatar: string,
    description: string
    createdAt: Date,
}

export interface BotsState {
    bots: BotEntity[]
}