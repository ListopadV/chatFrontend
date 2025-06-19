import useSWR from "swr";
import {MessageEntity} from "../../Entities/MessageEntities";
import {fetchMessages} from "../../services/messages";
import {idManager} from "../../services/auth/idManager";

export const useFetchMessages = (chatId: string | null) => {
  return useSWR<MessageEntity[] | undefined>(
    chatId ? ['/getMessages', chatId] : null,
    () => fetchMessages()
  );
};
