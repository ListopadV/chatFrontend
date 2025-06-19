import 'axios';

declare module "axios" {
    interface AxiosRequestConfig {
        botId?: boolean,
        chatId?: boolean,
    }
}