import {createChat} from "../../services/chats";
import {ChatDto as RequestChatDto} from "../../DTO's/requests/createChat";
import useSWRMutation from "swr/mutation";
import {CreatedChatEntity} from "../../Entities/ChatEntities";
import {mutate} from "swr";
import {idManager} from "../../services/auth/idManager";

export const useCreateChat = () => {
    const { trigger, isMutating } = useSWRMutation<
        CreatedChatEntity | undefined,
        any,
        string,
        RequestChatDto
    >(
        '/createChat',
        async (_key, { arg }) => {
            const res = await createChat(arg);
            if (res?.id){
                 idManager.setChatId(res.id);
                await mutate(['/currentChat', res.id]);
            }
            return res;
        }
    )

    return { createChat: trigger, isCreating: isMutating }
}