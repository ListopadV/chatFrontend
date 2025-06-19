import React, { FC } from 'react';
import { Box, Typography, Avatar, Fade } from '@mui/material';
import Typer from "../CustomComponents/Typer";
import { useSelector } from "react-redux";
import { RootState } from '../../store';

interface MessageProps {
  avatar?: string,
  sender_type: "bot" | "user",
  message_order: number,
  text: string,
  created_at: string
}

const ACCENT = "#8e5cf7";
const USER_BG = "#2a2f32";
const BOT_BG = "#26223b";

const Message: FC<MessageProps> = ({ avatar, sender_type, message_order, text, created_at }) => {
  const isSender = sender_type === 'user';
  const messageOrder = useSelector((state: RootState) => state.messages.messageOrder);
  const typeByLetter = text.length < 250;
  const duration = text.length < 250 ? 8 : 4;

  let timeString = "";
  try {
    const date = new Date(created_at);
    timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    timeString = "";
  }

  // fade-in для новых сообщений (можно ещё key анимировать!)
  return (
    <Fade in timeout={400}>
      <Box sx={{
        display: 'flex',
        flexDirection: isSender ? 'row-reverse' : 'row',
        position: 'relative',
        maxWidth: '95%',
        margin: '0 auto 12px auto',
        alignItems: 'flex-end'
      }}>
        <Avatar
          alt={isSender ? "User avatar" : "Bot avatar"}
          src={avatar}
          sx={{
            width: 36, height: 36,
            marginRight: isSender ? '0' : '10px',
            marginLeft: isSender ? '10px' : 0,
            border: `2px solid ${isSender ? ACCENT : '#fff'}`
          }} />
        <Box sx={{
          position: 'relative',
          maxWidth: {
            xs: '78%',
            sm: '60%',
            md: '50%',
            lg: '45%',
            xl: '38%',
          },
          padding: '12px 18px',
          borderRadius: isSender ? '18px 0 18px 18px' : '0 18px 18px 18px',
          backgroundColor: isSender ? USER_BG : BOT_BG,
          color: isSender ? '#fff' : ACCENT,
          boxShadow: isSender
            ? '0px 2px 10px 0px #0003'
            : `0px 4px 20px 0px ${ACCENT}22`,
          border: `1px solid ${isSender ? ACCENT : '#3a3148'}`,
          ml: isSender ? 1 : 0,
          mr: isSender ? 0 : 1
        }}>
          <Box sx={{
            fontSize: {
              xs: '13px',
              sm: '13px',
              md: '15px',
              lg: '16px',
              xl: '17px'
            }, wordBreak: 'break-word'
          }}>
            {!isSender && message_order === messageOrder
              ? <Typer text={text} isTypeByLetter={typeByLetter} duration={duration} component={"h"} />
              : text}
          </Box>
          <Typography sx={{
            fontSize: '10px',
            color: isSender ? '#b3b3b3' : '#aaa',
            textAlign: 'right',
            mt: 1
          }}>
            {timeString}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

export default Message;
