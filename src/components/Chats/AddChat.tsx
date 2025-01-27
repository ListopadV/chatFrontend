import React, {FC, useState} from 'react';
import {Box, Modal, TextField, Button, Typography, Avatar, Tooltip} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import { setOpening } from "../../redux/chatSlice";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {createChat} from "../../redux/chatSlice";
import {NavigateFunction, useNavigate} from "react-router-dom";

const AddChat: FC = () => {

    const open = useSelector((state: RootState) => state.chats.adding);
    const bots = useSelector((state: RootState) => state.bots.bots);
    const dispatch = useDispatch<AppDispatch>();
    const [chosenBot, setChosenBot] = useState<string>('d2967dbb-7150-46e5-be2d-1159b45ad71f');
    const accessToken = useSelector((state: RootState) => state.authentication.access_token);
    const navigate: NavigateFunction = useNavigate();
    const [left, setLeft] = useState<number>(0);
    const [leftArrowDis, setLeftArrowDis] = useState<boolean>(false);
    const [rightArrowDis, setRightArrowDis] = useState<boolean>(false);

    const closeChat = () => {
        dispatch(setOpening(false));
    };

    const handleNext = () => {
        const maxLeft = -(bots.length - 1) * 200;
        if (left > maxLeft) {
            setLeft(prev => Math.max(prev - 200, maxLeft));
            setRightArrowDis(false)
            setLeftArrowDis(false);
        } else {
            setRightArrowDis(true);
        }
    };

    const handlePrevious = () => {
        if (left < 0) {
            setLeft(prev => Math.min(prev + 200, 0));
            setLeftArrowDis(false)
            setRightArrowDis(false)
        } else {
            setLeftArrowDis(true);
        }
    };

    return (
        <Modal open={open} onClose={closeChat} style={{ zIndex: 1300 }}>

            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                     xs: '90vw',
                      sm: '80vw',
                      md: '70vw',
                      lg: '50vw',
                      xl: '50vw',
                },
                border: 'none',
                boxShadow: '0 2px 5px white',
                p: 4,
                backgroundColor: 'black',
                borderRadius: '25px'
            }}>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <KeyboardArrowLeftIcon onClick={handlePrevious} sx={{
                        color: leftArrowDis ? 'gray': 'white'
                    }} />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                        width: '200px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: `${bots && bots.length * 200}px`,
                            transition: 'margin-left 0.5s ease-out',
                            marginLeft: {
                                xs: `${left - 12}px`,
                                sm: `${left}px`,
                                md: `${left}px`,
                                lg: `${left}px`,
                                xl: `${left}px`
                            }
                        }}>
                            { bots && bots.map((item, index) => (
                                <Tooltip key={index} title={"Chosen model will have moving avatar with border"} placement="top">
                                    <Box

                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        width: '200px',
                                        marginLeft: '10px',
                                        marginRight: '10px'
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: {
                                            xs: '10px',
                                            sm: '12px',
                                            md: '14px',
                                            lg: '15px',
                                            xl: '16px'
                                        }
                                    }}>
                                        {item.description}
                                    </Typography>
                                    <Box
                                        onClick={() => {
                                            setChosenBot(item.bot_id);
                                        }}
                                    >
                                        <Avatar src={item.bot_avatar}
                                                className={chosenBot === item.bot_id ? "bordered" : ""}
                                                sx={{
                                            width: '50px',
                                            height: '50px',
                                                    borderRadius: '50%',
                                                    mt: '8px'
                                        }}  />
                                        <Typography sx={{ width: '50px', fontSize: '10px', pt: '12px' }}>{item.name}</Typography>
                                        <Typography sx={{ width: '50px', fontSize: '10px', pt: '2px' }}>{item.model}</Typography>
                                    </Box>
                                </Box>
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>

                    <KeyboardArrowRightIcon onClick={handleNext} sx={{
                        color: rightArrowDis ? 'gray' : 'white'
                    }} />
                </Box>

                <Formik initialValues={{ name: '' }} onSubmit={(e) => {
                    dispatch(setOpening(false));
                    dispatch(createChat(accessToken, e.name, chosenBot)).then(() => {
                        navigate('/chat');
                    });
                }}>
                    <Form style={{
                        margin: 'auto',
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '80%'
                    }}>
                        <Field
                            as={TextField}
                            name="name"
                            placeholder="Anything."
                            variant="standard"
                        />
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                        }}>
                            <Button type="submit">Confirm</Button>
                            <Button onClick={closeChat}>Cancel</Button>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default AddChat;
