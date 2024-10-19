import React, { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    AppBar,
    Toolbar,
    CssBaseline,
    Slider,
    Grid
} from "@mui/material";
import MiniChat from "./MiniChat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {clearChats, fetchChats, setOpening} from '../../redux/chatSlice'
import AddChat from "./AddChat";
import { fetchBots } from "../../redux/botsSlice";
import { ChatPageProps, Chat } from "../../types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { setTemperature, setTokens, setTopP } from "../../redux/paramSlice";
import {clearMessages} from "../../redux/messagesSlice";
import {clearUser} from "../../redux/loginSlice";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import Typer from '../CustomComponents/Typer';

const ChatPage: React.FC<ChatPageProps> = () => {

  const chats = useSelector((state: RootState) => state.chats.chats);
  const tokens = useSelector((state: RootState) => state.params.max_tokens);
  const top_p = useSelector((state: RootState) => state.params.top_p);
  const temperature = useSelector((state: RootState) => state.params.temperature);
  const accessToken = useSelector((state: RootState) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchBots(accessToken))
    dispatch(fetchChats(accessToken));
  }, [dispatch, accessToken]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
          }}>
              <Typography variant="h6">Chat Application</Typography>
            <HomeIcon onClick={() => {
                dispatch(clearMessages());
                dispatch(clearChats());
                dispatch(clearUser());
                navigate('/login')
            }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '25%',
            },
            borderRight: "1px solid #ccc",
            overflowY: chats.length > 0 ? "auto" : "hidden",
            direction: 'rtl',
            display: "flex",
            flexDirection: "column",
               '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#000'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '10px',
              border: '3px solid black'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555'
            }}}>
          <Box>
            {chats.map((chat: Chat) => (
                //
              <MiniChat key={chat.chat_id} chat_id={chat.chat_id} bot_name={chat.bot_name}
                bot_avatar={chat.bot_avatar} name={chat.chat_name} created_at={chat.created_at} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%",
            }}
          >
                <Button variant="authentication" sx={{ width: '70%', mt: 6 }} onClick={() => {
              dispatch(setOpening(true));
            }}>
              Add
            </Button>

          </Box>
        </Box>

        <Box sx={{ width: '75%', padding: 2, margin: '0 auto' }}>
            <Box sx={{
                mb: 4,
            }}>
                <Typer text="* Temperature - creativity and randomness of response" duration={30} isTypeByLetter={true} component={"p"} />
                <Typer text="* TopP - text diversity" duration={30} isTypeByLetter={true} component={"p"} />
                <Typer text="* Max tokens - unit of text data (more tokens = more precise text)" duration={30} isTypeByLetter={true} component={"p"} />
            </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={16} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: { xs: '60px', md: '120px' }, height: { xs: '60px', md: '120px' } }}>
                <CircularProgressbar value={temperature} text={`${temperature}°`}
                  minValue={1}
                  maxValue={100}
                  styles={buildStyles({
                    textSize: '10px',
                    backgroundColor: 'linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)',
                    pathColor: '#c76c0a',
                    trailColor: '#2c2d45',
                    textColor: 'white'
                  })} />
              </Box>
              <Slider
                size={"small"}
                value={temperature}
                onChange={(e, newValue) => {
                  dispatch(setTemperature(newValue as number));
                }}
                min={1}
                max={100}
                sx={{ maxWidth: { xs: '80px', md: '100px' }, mt: 1}}
                defaultValue={temperature}
              />
            </Grid>

            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: { xs: '60px', md: '120px' }, height: { xs: '60px', md: '120px' } }}>
                <CircularProgressbar value={top_p}
                  minValue={1}
                  maxValue={100}
                  text={`Top P ${top_p}%`} styles={buildStyles({
                    textSize: '10px',
                    backgroundColor: 'linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)',
                    trailColor: '#2c2d45',
                    pathColor: '#0ca1a6',
                    textColor: 'white'
                  })} />
              </Box>
              <Slider
                size={"small"}
                value={top_p}
                defaultValue={top_p}
                onChange={(e, newValue) => {
                  dispatch(setTopP(newValue as number));
                }}
                min={1}
                max={100}
                sx={{ maxWidth: { xs: '80px', md: '100px' }, mt: 1}}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: { xs: '60px', md: '120px' }, height: { xs: '60px', md: '120px' } }}>
                <CircularProgressbar value={tokens} text={`${tokens} max tokens`}
                  minValue={1}
                  maxValue={4096}
                  styles={buildStyles({
                    textSize: '10px',
                    backgroundColor: 'linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)',
                    trailColor: '#2c2d45',
                    pathColor: '#080a4a',
                    textColor: 'white'
                  })} />
              </Box>
              <Slider
                size={"small"}
                value={tokens}
                defaultValue={tokens}
                onChange={(e, newValue) => {
                  dispatch(setTokens(newValue as number));
                }}
                min={1}
                max={4096}
                sx={{ maxWidth: { xs: '80px', md: '100px' }, mt: 1}}
              />
            </Grid>
          </Grid>

        </Box>
        <AddChat />
      </Box>
    </>
  );
};

export default ChatPage;
