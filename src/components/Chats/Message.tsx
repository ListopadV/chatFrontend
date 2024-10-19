import React, {FC} from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { MessageProps } from '../../types';
import Typer from "../CustomComponents/Typer";
import { useSelector } from "react-redux";
import { RootState } from '../../store';

const Message: FC<MessageProps> = ({ avatar, sender_type, message_order, text, created_at}) => {

    const isSender = sender_type === 'user';
    const messageOrder = useSelector((state: RootState) => state.messages.messageOrder);
    const typeByLetter = text.length < 250;
    const duration = text.length < 250 ? 8 : 4;

    console.log(messageOrder);
    console.log(message_order);

    return (
            <Box sx={{
          display: 'flex',
          flexDirection: isSender ? 'row-reverse' : 'row',
          position: 'relative',
          maxWidth: '95%',
          margin: '0 auto 10px auto',
        }}>
            <Avatar
                alt={isSender ? "User avatar" : "Bot avatar"}
                src={avatar}
                sx={{ width: 32, height: 32,
                    marginRight: isSender ? '0' : '8px',
                    marginLeft: isSender ? '8px' : 0,
                }} />
          <Box sx={{
            position: 'relative',
            maxWidth: {
              xs: '70%',
              sm: '60%',
              md: '55%',
              lg: '50%',
              xl: '50%',
            },
            padding: '10px 15px',
            borderRadius: isSender ? '20px 0 20px 20px' : '0 20px 20px 20px ',
            backgroundColor: isSender ? '#2a2f32' : '#e5e6ea',
            color: isSender ? '#fff' : '#000',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
          }}>
            <Box sx={{ fontSize: {
                xs: '12px',
                  sm: '12px',
                  md: '13px',
                  lg: '15px',
                  xl: '15px'
                }, wordBreak: 'break-word' }}>
                {!isSender && message_order === messageOrder ? <Typer text={text} isTypeByLetter={typeByLetter} duration={duration} component={"h"} /> : text }
            </Box>
            <Typography sx={{ fontSize: {
                xs: '6px',
                  sm: '6px',
                  md: '8px',
                  lg: '9px',
                  xl: '10px'
                }, color: isSender ? 'gray' : 'gray' }}>{created_at}</Typography>
          </Box>
        </Box>
  );
}

export default Message;
