export interface AuthenticationProps {
    isLogin: boolean;
    isRegistration: boolean;
}
export interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    accepting: boolean
}

export interface ChatPageProps {}

export interface Message {
    message_id: string,
    sender_type: string,
    message_order: number,
    text: string,
    created_at: string
}
export interface MiniChip {
    url: string,
    label: string
}
export interface MiniChatProps {
    chat_id: string,
    bot_name: string,
    bot_avatar: string,
    name: string,
    created_at: string,
}

export interface pageProps {}

export interface LoginProps {}

export interface RegistrationProps {}

export interface Bot {
    bot_id: string,
    name: string,
    model: string,
    bot_avatar: string,
    description: string
    created_at: string,
}

export interface BotsState {
    bots: Bot[],
}

export interface Chat {
    chat_id: string
    user_id: string,
    bot_id: string,
    chat_name: string,
    bot_avatar: string,
    bot_name: string,
    created_at: string
}

export interface ChatsState {
    chats: Chat[],
    user: object,
    adding: boolean,
    currentChat: Chat
}

export interface LoginState {
    access_token: string,
    user: object
}

export interface Message {
    message_id: string,
    message_order: number,
    sender_type: string,
    text: string,
    created_at: string,
    avatar: string
}

export type Snack = {
     message: string,
    open: boolean
}

export interface ErrorSnackbarProps {
    snack: Snack,
    setSnack: (snack: Snack) => void
}

export interface MessageProps {
    avatar: string,
    sender_type: string,
    message_order: number,
    text: string,
    created_at: string,
}

export interface MessagesState {
    messages: Message[],
    messageOrder: number
}

export interface Params {
    temperature: number,
    maxTokens: number,
    top_p: number
}

export interface ParamsState {
    temperature: number,
    max_tokens: number,
    top_p: number
}

export interface TyperProps {
    text: string,
}

export type TextTypingEffectProps = {
  isTypeByLetter: boolean;
  duration: number;
  text: string;
  component: string,
};

export interface SwitchInterface {
    checked: boolean,
    setChecked: (checked: boolean) => void;
}

export type HoverState = {
    [key: string]: boolean;
}

export interface CardProps {
    text: string;
    title: string;
    index: boolean;
}