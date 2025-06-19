import apiClient from "./auth/apiClient";
import {BotEntity} from "../Entities/BotEntities";
import {BotDto} from "../DTO's/responses/fetchBots";

const mapBotDto = (d: BotDto): BotEntity => ({
    id: d.bot_id,
    name: d.name,
    model: d.model,
    avatar: d.bot_avatar,
    description: d.description,
    createdAt: new Date(d.created_at)
});

export const fetchBots = async (): Promise<BotEntity[] | undefined> => {
    try {
        const { data: responseData } = await apiClient.get<{ bots: BotDto[] }>('/bots/bots')
        console.log(responseData)
        return responseData.bots?.map(mapBotDto);
    } catch (e){
        console.error("Error fetching bots: ", e);
    }
}
