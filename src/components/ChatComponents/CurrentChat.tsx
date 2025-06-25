import React, {FC, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    CircularProgress,
    FormControl,
    Input,
    InputAdornment,
    LinearProgress,
    Typography,
    useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import Switcher from "../CustomComponents/Switch";
import Message from './Message';
import {useDebouncedCallback} from 'use-debounce';
import {AppDispatch, RootState} from "../../store";
import ErrorSnackbar from "../CustomComponents/ErrorSnackbar";
import {useFetchMessages} from "../../Hooks/api/useFetchMessages";
import {useAskBot} from "../../Hooks/api/useAskBot";
import {MessageDto} from "../../DTO's/requests/askBot";
import {clearMessages} from "../../redux/messagesSlice";
import {clearCurrentChat} from "../../redux/chatSlice";
import {idManager} from "../../services/auth/idManager";

const BG = "#181825";
const ACCENT = "#8e5cf7";
const USER_BG = "#2a2f32";
const BOT_BG = "#26223b";

export const CurrentChat: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const current_chat = useSelector((state: RootState) => state.chats.currentChat);
    const tokens = useSelector((state: RootState) => state.params.max_tokens);
    const top_p = useSelector((state: RootState) => state.params.top_p);
    const temperature = useSelector((state: RootState) => state.params.temperature);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>('');
    const [fade, setFade] = useState<boolean>(false);
    const [messageOrder, setMessageOrder] = useState<number>(0);
    const [checked, setChecked] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [snack, setSnack] = useState<{ message: string, open: boolean }>({message: '', open: false});

    const botName = current_chat?.botName || "";
    const chatId = current_chat?.id || null;

    const {data: messagesData, isLoading: messagesLoading, error: messagesError} = useFetchMessages(chatId);
    const {askBot, isAsking, error: askError} = useAskBot(botName);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messagesData]);

    useEffect(() => {
        if (messagesData && messagesData.length > 0) {
            setMessageOrder(messagesData[messagesData.length - 1].order);
        } else {
            setMessageOrder(0);
        }
    }, [messagesData]);

    useEffect(() => {
        setFade(isAsking);
        if (!isAsking) {
            const fadeOutTimer = setTimeout(() => setFade(false), 300);
            return () => clearTimeout(fadeOutTimer);
        }
    }, [isAsking]);

    useEffect(() => {
        if (messagesError) {
            setSnack({message: 'Ошибка загрузки сообщений', open: true});
        }
        if (askError) {
            setSnack({message: 'Ошибка при отправке сообщения', open: true});
        }
    }, [messagesError, askError]);

    const debounceInput = useDebouncedCallback(async (value: string, resetForm: () => void) => {
        setInputValue(value);
        if (checked && value.trim()) {
            const message: MessageDto = {
                max_tokens: tokens,
                top_p: top_p,
                temperature: temperature,
                message_order: messageOrder + 1,
                text: value
            }
            await askBot(message);
            resetForm();
        }
    }, 1500);

    if (!current_chat) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: BG,
            }}>
                <Typography sx={{color: 'gray'}}>Выберите чат для начала диалога</Typography>
            </Box>
        );
    }

    if (messagesLoading) {
        return (
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: BG
            }}>
                <CircularProgress/>
            </Box>
        );
    }

    if (messagesError) {
        return (
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: BG
            }}>
                <Typography color="error">Could not upload messages.</Typography>
                <ErrorSnackbar snack={snack} setSnack={setSnack}/>
            </Box>
        );
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', bgcolor: BG}}>
            {/* Top bar */}
            <Box
                sx={{
                    height: '10%',
                    minHeight: 64,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 2,
                    color: ACCENT,
                    borderBottom: `1px solid ${ACCENT}33`,
                    fontWeight: 700,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    <ChevronLeftIcon
                        onClick={() => {
                            dispatch(clearMessages());
                            dispatch(clearCurrentChat());
                            idManager.clear();
                            navigate('/chats');
                        }}
                        sx={{cursor: 'pointer', color: '#fff', fontSize: 32}}
                    />
                    <span style={{
                        color: '#fff',
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: 600
                    }}>{current_chat.name}</span>
                    <Switcher checked={checked} setChecked={setChecked}/>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    fontSize: '10px',
                    color: 'white',
                    opacity: fade ? 0.5 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                    px: 2,
                    py: 2,
                    ...theme.custom.scrollbar.messages
                }}
            >
                {messagesData && messagesData.length > 0 ? (
                    messagesData.map((item, index) => (
                        <Message
                            key={index}
                            avatar={item.avatar}
                            sender_type={item.sender}
                            message_order={item.order}
                            text={item.text}
                            created_at={item.createdAt.toString()}
                        />
                    ))
                ) : (
                    <Typography sx={{textAlign: 'center', mt: '200px', color: '#888'}}>
                        Start the story!
                    </Typography>
                )}
                <div ref={messagesEndRef}/>
            </Box>


            {/* Input */}
            <Box
                sx={{
                    minHeight: 56,
                    px: 3,
                    pb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: BG,
                }}
            >
                <Formik
                    initialValues={{message: ''}}
                    onSubmit={async (values, {resetForm}) => {
                        if (!values.message.trim()) return;
                        const message: MessageDto = {
                            max_tokens: tokens,
                            top_p: top_p,
                            temperature: temperature,
                            message_order: messageOrder + 1,
                            text: values.message
                        }
                        await askBot(message);
                        resetForm();
                    }}
                >
                    {({values, setFieldValue, resetForm}) => (
                        <FormControl variant="standard"
                                     sx={{width: '100%', background: BOT_BG, borderRadius: 3, px: 2}}>
                            <Input
                                id="input-with-icon-adornment"
                                placeholder="Type your message..."
                                disableUnderline
                                value={values.message}
                                onChange={(e) => {
                                    const message = e.target.value;
                                    setFieldValue('message', message);
                                    debounceInput(message, resetForm);
                                }}
                                sx={{
                                    color: '#fff',
                                    fontSize: 17,
                                    letterSpacing: 0.3,
                                    py: 1.5,
                                    '&::placeholder': {color: '#888', opacity: 1}
                                }}
                                endAdornment={
                                    !checked && (
                                        <InputAdornment position="end">
                                            <SendIcon
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: ACCENT,
                                                    fontSize: 28,
                                                    ml: 1
                                                }}
                                                onClick={async () => {
                                                    if (!inputValue.trim()) return;
                                                    const message: MessageDto = {
                                                        max_tokens: tokens,
                                                        top_p: top_p,
                                                        temperature: temperature,
                                                        message_order: messageOrder + 1,
                                                        text: inputValue
                                                    }
                                                    await askBot(message);
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
            {(isAsking || messagesLoading) &&
                <LinearProgress sx={{position: 'absolute', top: 0, left: 0, right: 0, bgcolor: ACCENT}}/>}
            <ErrorSnackbar snack={snack} setSnack={setSnack}/>
        </Box>
    );
};
