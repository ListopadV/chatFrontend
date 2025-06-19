import {BotEntity} from "../../Entities/BotEntities";
import {fetchBots} from "../../services/bots";
import useSWR from 'swr';

export const useFetchBots = (_: any = undefined, enabled: boolean = true) =>
    useSWR<BotEntity[] | undefined>(
        enabled ? '/getBots' : null,
        fetchBots
    );
