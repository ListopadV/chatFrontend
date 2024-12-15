import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputAdornment, Input, FormControl, LinearProgress, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Switcher from "../CustomComponents/Switch";
import Message from './Message';
import { useDebouncedCallback } from 'use-debounce';
import { AppDispatch, RootState } from "../../store";
import { askBot } from "../../redux/chatSlice";
import { fetchMessages, clearMessages } from "../../redux/messagesSlice";
import { Snack } from "../../types";
import ErrorSnackbar from "../CustomComponents/ErrorSnackbar";

export const CurrentChat: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.authentication.access_token);
  const current_chat = useSelector((state: RootState) => state.chats.currentChat);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const tokens = useSelector((state: RootState) => state.params.max_tokens);
  const top_p = useSelector((state: RootState) => state.params.top_p);
  const temperature = useSelector((state: RootState) => state.params.temperature);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);
  const [messageOrder, setMessageOrder] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [snack, setSnack] = useState<Snack>({
      message: '',
      open: false
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    try {
        setLoading(true);
      if (current_chat.chat_id && current_chat.bot_id) {
        dispatch(fetchMessages(accessToken, current_chat.chat_id, current_chat.bot_id));
      }
    }catch (e){
        console.error("Error: ", e);
    }
    finally {
        setLoading(false);
    }
  }, [dispatch, accessToken, current_chat.chat_id, current_chat.bot_id]);

  useEffect(() => {
    if (messages.length > 0) {
      setMessageOrder(messages[messages.length - 1]['message_order']);
    }
  }, [messages]);

  const handleSend = (message: string) => {
    setLoading(true);
    setFade(false);
    dispatch(
      askBot(
        accessToken,
        message,
        current_chat.bot_name,
        {
          top_p: top_p / 100,
          max_tokens: tokens,
          temperature: temperature / 100,
        },
        messageOrder + 1,
        current_chat.chat_id,
        current_chat.bot_id,
        setLoading,
        setSnack
      )
    ).then(() => {
      dispatch(fetchMessages(accessToken, current_chat.chat_id, current_chat.bot_id));
    });
    setInputValue('');
  };

  useEffect(() => {
    if (loading) {
      setFade(true);
    } else {
      const fadeOutTimer = setTimeout(() => setFade(false), 300);
      return () => clearTimeout(fadeOutTimer);
    }
  }, [loading]);

  const debounceInput = useDebouncedCallback((value: string, resetForm: () => void) => {
    setInputValue(value);
    if (checked) {
      handleSend(value);
      resetForm();
    }
  }, 1500);
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 2,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <ChevronLeftIcon
            onClick={() => {
              dispatch(clearMessages());
              navigate('/chats');
            }}
          />
          {current_chat.chat_name}
          <Switcher checked={checked} setChecked={setChecked} />
        </Box>
      </Box>
      <Box
        sx={{
          height: '70%',
          overflowY: 'auto',
          fontSize: '10px',
          color: 'white',
          opacity: fade ? 0.5 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}>
        {messages.length > 0 ? (
          messages.map((item, index) => (
              <Message
                key={index}
                avatar={item.avatar}
                sender_type={item.sender_type}
                message_order={item.message_order}
                text={item.text}
                created_at={item.created_at}
              />))
        ) : <Typography sx={{ textAlign: 'center', mt: '200px' }}>You have not started yet</Typography>}
            <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ textAlign: 'center', '& > :not(style)': { m: 1 } }}>
            <Formik
              initialValues={{ message: '' }}
              onSubmit={() => {
                console.log('Form submitted');
              }}
            >
              {({ values, setFieldValue, resetForm }) => (
                <FormControl variant="standard" sx={{ width: '75vw' }}>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Type here"
                    value={values.message}
                    onChange={(e) => {
                        const message = e.target.value;
                        setFieldValue('message', message);
                        debounceInput(message, resetForm);
                    }}
                    endAdornment={
                      !checked && (
                        <InputAdornment position="start">
                          <SendIcon
                            onClick={() => {
                              handleSend(inputValue);
                              resetForm();
                            }}
                          />
                        </InputAdornment>
                      )
                    }
                  />
                </FormControl>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
      {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
        <ErrorSnackbar snack={snack} setSnack={setSnack} />
    </Box>
  );
};
