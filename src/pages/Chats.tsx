import { FC } from 'react';
import ChatPage from "../components/Chats/Chats";
import {Box} from "@mui/material";
import {pageProps} from "../types";

const Chat: FC<pageProps> = () => {
    return (
        <Box>
           <ChatPage></ChatPage>
        </Box>
    )
}

export default Chat;