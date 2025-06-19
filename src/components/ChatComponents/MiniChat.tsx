import React, { FC, useState, useRef, useEffect } from 'react';
import { Box, Typography, Avatar, keyframes, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../store"
import DeleteIcon from '@mui/icons-material/Delete';
import {useCurrentChat} from "../../Hooks/api/useCurrentChat";
import {setCurrentChat} from "../../redux/chatSlice";
import {useDeleteChat} from "../../Hooks/api/useDeleteChat";
import CircularProgress from "@mui/material/CircularProgress";
import {idManager} from "../../services/auth/idManager";


const roundAvatar = keyframes`
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
`

const deleteRight = keyframes`
  0% { width: 30px; height: 1px }
  80% { width: 30px; height: 30px }
  100% { width: 25px; height: 25px }
`

export interface MiniChatProps {
    chat_id: string,
    bot_id: string,
    bot_name: string,
    bot_avatar: string,
    name: string,
    created_at: string,
}

const MiniChat: FC<MiniChatProps> = ({ chat_id, bot_id, bot_name, bot_avatar, name, created_at }) => {

  const { data: currentChat, isLoading } = useCurrentChat();
  const { deleteChat, isDeleting } = useDeleteChat(chat_id);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

 const handleChatClick = () => {
    if (isLoading) return;
    if (!currentChat) return;
    idManager.setChatId(chat_id);
    idManager.setBotId(bot_id);
    dispatch(setCurrentChat(currentChat));
    navigate('/chat');
  };
    const handleDeleteClick = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDeleting) return;
      idManager.setChatId(chat_id);
      await deleteChat();
    };

  if (isDeleting) {
    return (
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70px'
      }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid gray',
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'gray', color: 'black' },
      }}
      key={chat_id}
      onClick={handleChatClick}
    >
      {/* Delete button — always visible, right side */}
      <IconButton onClick={handleDeleteClick} sx={{ mr: 1 }}>
        <DeleteIcon color="error" />
      </IconButton>

      {/* Avatar and info */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          alt={bot_name}
          src={bot_avatar}
          sx={{
            width: { xs: '35px', sm: '35px', md: '35px', lg: '45px', xl: '55px' },
            height: { xs: '35px', sm: '35px', md: '35px', lg: '45px', xl: '55px' },
            '&:hover': { animation: `${roundAvatar} 1s ease-in-out` }
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          pl: 2,
        }}
      >
        <Typography sx={{
          fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px', xl: '18px' },
          fontWeight: 'bold', ml: 1,
        }}>
          {bot_name}
        </Typography>
        <Typography sx={{
          fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px', xl: '16px' },
        }}>
          {name}
        </Typography>
        <Typography sx={{
          fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px', xl: '16px' },
        }}>
          {created_at
            ? new Date(created_at).toLocaleDateString("en-EN", {
              day: "numeric",
              month: "long"
            })
            : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniChat;
