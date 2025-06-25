import useSWR from "swr";
import {MessageEntity} from "../../Entities/MessageEntities";
import {fetchMessages} from "../../services/messages";

export const useFetchMessages = (chatId: string | null) => {
    return useSWR<MessageEntity[] | undefined>(
        chatId ? ['/getMessages', chatId] : null,
        () => fetchMessages()
    );
};
