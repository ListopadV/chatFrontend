import {mutate} from "swr";
import {MessagesDto as ResponseAskDto} from "../../DTO's/responses/askBot";
import {askBot} from "../../services/chats";
import {MessageDto as RequestAskDto} from "../../DTO's/requests/askBot";
import useSWRMutation from "swr/mutation";
import {idManager} from "../../services/auth/idManager";

export const useAskBot = (name: string) => {
    const chatId = idManager.getChatId();
    const botId = idManager.getBotId();
    const mutationKey = `/askbot/${chatId ?? ''}/${botId ?? ''}`;

    const {trigger, isMutating, error} = useSWRMutation<
        ResponseAskDto | undefined,
        any,
        string,
        RequestAskDto
    >(
        mutationKey,
        async (_key, {arg}) => {
            const response = await askBot(name, arg);
            await mutate(['/getMessages', chatId])
            return response;
        }
    )

    return {askBot: trigger, isAsking: isMutating, error}
}