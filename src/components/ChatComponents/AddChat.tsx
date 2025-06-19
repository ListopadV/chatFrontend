import React, { FC, useState } from 'react';
import { Box, Modal, TextField, Button, Typography, Avatar, Tooltip } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setCurrentChat, setOpening } from "../../redux/chatSlice";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
import { useFetchBots } from "../../Hooks/api/useFetchBots";
import { useCreateChat } from "../../Hooks/api/useCreateChat";
import CircularProgress from "@mui/material/CircularProgress";
import { idManager } from "../../services/auth/idManager";

const ACCENT = '#8e5cf7';
const ACCENT_HOVER = '#a48ede';
const BG = '#181825';

const AddChat: FC = () => {
    const open = useSelector((state: RootState) => state.chats.adding);
    const dispatch = useDispatch<AppDispatch>();
    const [chosenBot, setChosenBot] = useState<string>('');
    const navigate = useNavigate();
    const [left, setLeft] = useState<number>(0);

    const { data: bots, error: botsError, isLoading: botsLoading } = useFetchBots(undefined, open);
    const { isCreating, createChat } = useCreateChat();

    const closeChat = () => dispatch(setOpening(false));

    const handleNext = () => {
        if (!bots) return;
        const maxLeft = -(bots.length - 1) * 200;
        setLeft((prev) => Math.max(prev - 200, maxLeft));
    };

    const handlePrevious = () => {
        setLeft((prev) => Math.min(prev + 200, 0));
    };

    return (
        <Modal open={open} onClose={closeChat} style={{ zIndex: 1300 }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90vw', sm: '70vw', md: '50vw', lg: '40vw', xl: '35vw' },
                bgcolor: BG,
                boxShadow: '0 2px 24px 0 rgba(120,100,255,0.18)',
                borderRadius: '25px',
                outline: 'none',
                p: 4,
                color: '#fff'
            }}>
                <Typography variant="h6" sx={{
                    color: ACCENT,
                    mb: 3,
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: 1,
                }}>
                    Add a New Chat
                </Typography>

                {botsLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <CircularProgress />
                    </Box>
                )}

                {botsError && (
                    <Typography color="error" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                        Ошибка загрузки ботов, попробуйте позже.
                    </Typography>
                )}

                {!botsLoading && !botsError && (!bots || bots.length === 0) && (
                    <Typography sx={{ mt: 3, color: '#aaa', textAlign: 'center' }}>
                        Нет доступных ботов. Сначала создайте бота.
                    </Typography>
                )}

                {!botsLoading && !botsError && bots && bots.length > 0 && (
                    <>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            gap: 2,
                        }}>
                            <KeyboardArrowLeftIcon
                                onClick={handlePrevious}
                                sx={{
                                    color: left === 0 ? '#444' : ACCENT,
                                    fontSize: 38,
                                    cursor: left === 0 ? 'default' : 'pointer',
                                    transition: 'color 0.2s'
                                }}
                            />
                            <Box sx={{
                                overflow: 'hidden',
                                width: '200px',
                                mx: 1,
                                background: 'rgba(27,23,36,0.6)',
                                borderRadius: '18px',
                                border: `1.5px solid ${ACCENT}`,
                                boxShadow: '0 0 6px 0 #34206155'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: `${bots.length * 200}px`,
                                    transition: 'margin-left 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                                    marginLeft: `${left}px`
                                }}>
                                    {bots.map((item) => (
                                        <Tooltip key={item.id} title={item.description || "Bot"} placement="top">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    width: '200px',
                                                    px: 1,
                                                    cursor: 'pointer',
                                                    transition: 'box-shadow 0.2s, border 0.2s',
                                                    border: chosenBot === item.id
                                                        ? `2px solid ${ACCENT}`
                                                        : '2px solid transparent',
                                                    borderRadius: '16px',
                                                    boxShadow: chosenBot === item.id
                                                        ? `0 0 16px 0 ${ACCENT}55`
                                                        : 'none',
                                                    background: chosenBot === item.id
                                                        ? 'rgba(142, 92, 247, 0.10)'
                                                        : 'transparent',
                                                }}
                                                onClick={() => setChosenBot(item.id)}
                                            >
                                                <Avatar
                                                    src={item.avatar}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        border: chosenBot === item.id
                                                            ? `2.5px solid ${ACCENT}`
                                                            : '2.5px solid #222',
                                                        boxShadow: chosenBot === item.id
                                                            ? `0 0 8px ${ACCENT_HOVER}`
                                                            : 'none',
                                                        transition: 'all 0.2s'
                                                    }}
                                                />
                                                <Typography sx={{
                                                    width: '100%',
                                                    fontSize: '13px',
                                                    fontWeight: 600,
                                                    color: '#fff',
                                                    pt: 2,
                                                    textAlign: 'center',
                                                    textShadow: '0 1px 5px #000b'
                                                }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography sx={{
                                                    width: '100%',
                                                    fontSize: '12px',
                                                    pt: 0.5,
                                                    color: ACCENT,
                                                    fontWeight: 500,
                                                    textAlign: 'center'
                                                }}>
                                                    {item.model}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    ))}
                                </Box>
                            </Box>
                            <KeyboardArrowRightIcon
                                onClick={handleNext}
                                sx={{
                                    color: left === -(bots.length - 1) * 200 ? '#444' : ACCENT,
                                    fontSize: 38,
                                    cursor: left === -(bots.length - 1) * 200 ? 'default' : 'pointer',
                                    transition: 'color 0.2s'
                                }}
                            />
                        </Box>

                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={async (values, { setSubmitting }) => {
                                if (!chosenBot) return;
                                dispatch(setOpening(false));
                                const res = await createChat({ name: values.name, bot_id: chosenBot });
                                if (res?.id) {
                                    idManager.setBotId(chosenBot);
                                    idManager.setChatId(res.id);
                                    dispatch(setCurrentChat({
                                        id: res.id,
                                        botId: chosenBot,
                                        name: res.name,
                                        avatar: res.botAvatar,
                                        botName: res.botName,
                                        createdAt: res.createdAt.toString()
                                    }));
                                    setSubmitting(false);
                                    navigate('/chat');
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form style={{
                                    margin: 'auto',
                                    width: '85%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '22px'
                                }}>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        placeholder="Chat name"
                                        variant="standard"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                background: '#26223b',
                                                borderRadius: 12,
                                                color: '#fff',
                                                fontSize: '16px',
                                                paddingLeft: 14,
                                                border: `1.5px solid ${ACCENT}`,
                                                boxShadow: '0 1px 6px #0003'
                                            }
                                        }}
                                        sx={{
                                            mb: 2,
                                            input: { color: '#fff' },
                                            label: { color: '#aaa' }
                                        }}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        width: '100%',
                                        gap: 3
                                    }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={!chosenBot || isSubmitting || isCreating}
                                            sx={{
                                                background: chosenBot
                                                    ? `linear-gradient(90deg, ${ACCENT}, #342061)`
                                                    : '#222',
                                                color: '#fff',
                                                fontWeight: 600,
                                                boxShadow: 'none',
                                                px: 4,
                                                py: 1.2,
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                '&:hover': {
                                                    background: `linear-gradient(90deg, ${ACCENT_HOVER}, #342061)`,
                                                }
                                            }}
                                        >
                                            {isCreating || isSubmitting
                                                ? <CircularProgress size={20} color="inherit" />
                                                : "Confirm"}
                                        </Button>
                                        <Button
                                            onClick={closeChat}
                                            variant="text"
                                            sx={{
                                                color: ACCENT,
                                                fontWeight: 500,
                                                px: 4,
                                                fontSize: '16px'
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default AddChat;
