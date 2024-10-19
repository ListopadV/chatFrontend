import { FC, useState, useRef, useEffect } from 'react';
import { Box, Typography, Avatar, keyframes } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { currentChat } from "../../redux/chatSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../store"
import { MiniChatProps } from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteChat } from "../../redux/chatSlice";

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

const MiniChat: FC<MiniChatProps> = ({ chat_id, bot_name, bot_avatar, name, created_at }) => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.authentication.access_token);
  const dispatch = useDispatch<AppDispatch>();
  const date = new Date(created_at);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const [hover, setHover] = useState(false);

  const handleChatClick = () => {
    dispatch(currentChat(accessToken, chat_id));
    navigate('/chat');
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteChat(accessToken, chat_id));
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid gray',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'gray',
          color: 'black',
        },
      }}
      key={chat_id}
      onClick={handleChatClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
        alt={bot_name}
        src={bot_avatar}
        sx={{
          width: { xs: '35px', sm: '35px', md: '35px', lg: '45px', xl: '55px' },
          height: { xs: '35px', sm: '35px', md: '35px', lg: '45px', xl: '55px' },
          '&:hover': {
            animation: `${roundAvatar} 1s ease-in-out`,
          },
        }}
      />
      {hover && (
        <DeleteIcon
          onClick={handleDeleteClick}
          sx={{
            animation: `${deleteRight} 1s ease-out`,
            cursor: 'pointer', mr: '5px'
          }}
        />
      )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          pl: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '12px',
                sm: '12px',
                md: '14px',
                lg: '16px',
                xl: '18px',
              },
              fontWeight: 'bold',
              ml: 1,
            }}
          >
            {bot_name}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '0',
                sm: '0',
                md: '14px',
                lg: '16px',
                xl: '16px',
              },
              color: 'gray',
            }}
          >
            {day}.{month}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              sm: '14px',
              md: '16px',
              lg: '16px',
              xl: '16px',
            },
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniChat;
