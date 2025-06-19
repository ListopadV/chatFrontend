import {createChat} from "../../services/chats";
import {ChatDto as RequestChatDto} from "../../DTO's/requests/createChat";
import useSWRMutation from "swr/mutation";
import {CreatedChatEntity} from "../../Entities/ChatEntities";

export const useCreateChat = () => {
    const { trigger, isMutating } = useSWRMutation<
        CreatedChatEntity | undefined,
        any,
        string,
        RequestChatDto
    >(
        '/createChat',
        async (_key, { arg }) => createChat(arg)
    )

    return { createChat: trigger, isCreating: isMutating }
}