import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    IconButton,
    Slider,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MiniChat from "./MiniChat";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {clearChats, setOpening} from "../../redux/chatSlice";
import AddChat from "./AddChat";
import {ChatEntity} from "../../Entities/ChatEntities";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {setTemperature, setTokens, setTopP} from "../../redux/paramSlice";
import {clearMessages} from "../../redux/messagesSlice";
import {clearUser} from "../../redux/loginSlice";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from "react-router-dom";
import Typer from "../CustomComponents/Typer";
import {useFetchChats} from "../../Hooks/api/useFetchChats";
import {idManager} from "../../services/auth/idManager";
import {tokenManager} from "../../services/auth/tokenManager";
import {mutate} from "swr";
import useMediaQuery from "@mui/material/useMediaQuery";

const ChatPage: React.FC = () => {
    const theme = useTheme();
    const tokens = useSelector((state: RootState) => state.params.max_tokens);
    const top_p = useSelector((state: RootState) => state.params.top_p);
    const temperature = useSelector((state: RootState) => state.params.temperature);
    const chats = useSelector((state: RootState) => state.chats.chats);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {isLoading} = useFetchChats();

    const isMobile = useMediaQuery("(max-width:600px)");
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (!isMobile && drawerOpen) setDrawerOpen(false);
    }, [isMobile, drawerOpen]);

    const ParamSection = () => (
        <Box sx={{px: 2, py: 2}}>
            <Box sx={{mb: 3}}>
                <Box sx={{display: "flex", justifyContent: "center", mb: 1}}>
                    <Box sx={{width: "90px", height: "90px"}}>
                        <CircularProgressbar
                            value={temperature * 100}
                            text={`${temperature}°`}
                            minValue={1}
                            maxValue={200}
                            styles={buildStyles({
                                textSize: "14px",
                                pathColor: "#c76c0a",
                                trailColor: "#2c2d45",
                                textColor: "white",
                            })}
                        />
                    </Box>
                </Box>
                <Slider
                    size={"small"}
                    value={temperature * 100}
                    onChange={(e, newValue) => {
                        dispatch(setTemperature((newValue as number) / 100));
                    }}
                    min={1}
                    max={200}
                    sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                        ? theme.custom.slider.param(theme)
                        : {}
                    }
                    defaultValue={temperature * 100}
                />
                <Typography variant="chatParam">
                    * Temperature - creativity and randomness of response
                </Typography>
            </Box>
            <Box sx={{mb: 3}}>
                <Box sx={{display: "flex", justifyContent: "center", mb: 1}}>
                    <Box sx={{width: "90px", height: "90px"}}>
                        <CircularProgressbar
                            value={top_p * 100}
                            minValue={1}
                            maxValue={100}
                            text={`Top P ${top_p}%`}
                            styles={buildStyles({
                                textSize: "14px",
                                trailColor: "#2c2d45",
                                pathColor: "#0ca1a6",
                                textColor: "white",
                            })}
                        />
                    </Box>
                </Box>
                <Slider
                    size={"small"}
                    value={top_p * 100}
                    defaultValue={top_p * 100}
                    onChange={(e, newValue) => {
                        dispatch(setTopP((newValue as number) / 100));
                    }}
                    min={1}
                    max={100}
                    sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                        ? theme.custom.slider.param(theme)
                        : {}
                    }
                />
                <Typography variant="chatParam">
                    * TopP - text diversity
                </Typography>
            </Box>
            <Box>
                <Box sx={{display: "flex", justifyContent: "center", mb: 1}}>
                    <Box sx={{width: "90px", height: "90px"}}>
                        <CircularProgressbar
                            value={tokens}
                            text={`${tokens} max tokens`}
                            minValue={1}
                            maxValue={4096}
                            styles={buildStyles({
                                textSize: "14px",
                                trailColor: "#2c2d45",
                                pathColor: "#080a4a",
                                textColor: "white",
                            })}
                        />
                    </Box>
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
                    sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                        ? theme.custom.slider.param(theme)
                        : {}
                    }
                />
                <Typography variant="chatParam">
                    * Max tokens - unit of text data (more tokens = more precise text)
                </Typography>
            </Box>
        </Box>
    );

    const ButtonSection = () => (
        <Box sx={{px: 2, py: 1}}>
            <Button
                variant="authentication"
                sx={{width: "100%", mt: 1, mb: 1}}
                onClick={() => {
                    setDrawerOpen(false);
                    dispatch(setOpening(true));
                }}
            >
                Add
            </Button>
            <IconButton sx={{mx: 'auto', width: '100%', '&:hover': {borderRadius: 0}}}>
                <HomeIcon
                    onClick={() => {
                        dispatch(clearMessages());
                        dispatch(clearChats());
                        dispatch(clearUser());
                        idManager.clear?.();
                        tokenManager.clear();
                        localStorage.clear();
                        sessionStorage.clear();
                        mutate(() => true, undefined, {revalidate: false});
                        navigate("/login");
                    }}
                    sx={{cursor: "pointer"}}
                />
            </IconButton>
        </Box>
    );

    return (
        <>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="h6">Chat Application</Typography>
                        <Box>
                            {!isMobile ? (
                                <HomeIcon
                                    onClick={() => {
                                        dispatch(clearMessages());
                                        dispatch(clearChats());
                                        dispatch(clearUser());
                                        idManager.clear?.();
                                        tokenManager.clear();
                                        localStorage.clear();
                                        sessionStorage.clear();
                                        mutate(() => true, undefined, {revalidate: false});
                                        navigate("/login");
                                    }}
                                    sx={{cursor: "pointer"}}
                                />
                            ) : (
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={() => setDrawerOpen(true)}
                                    size="large"
                                >
                                    <MenuIcon/>
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {width: "80vw", maxWidth: 340, background: "#171726", color: "#fff"},
                }}
            >
                <Box sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                    <ButtonSection/>
                    <Divider sx={{borderColor: "#222", my: 1}}/>
                    <ParamSection/>
                </Box>
            </Drawer>

            <Box
                sx={{
                    display: "flex",
                    height: "calc(100vh - 64px)",
                    background: "#111",
                }}
            >
                <Box
                    sx={{
                        width: {xs: isMobile ? "100%" : "25%", sm: "25%", md: "22%", lg: "18%"},
                        minWidth: isMobile ? "100%" : "210px",
                        maxWidth: isMobile ? "100%" : "350px",
                        borderRight: !isMobile ? "1px solid #222" : undefined,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        background: "#181828",
                        boxSizing: "border-box",
                    }}
                >
                    {!isMobile && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                flexShrink: 0,
                                padding: 2,
                                borderBottom: "1px solid #222",
                            }}
                        >
                            <Button
                                variant="authentication"
                                sx={{width: "80%", mt: 1, mb: 1}}
                                onClick={() => {
                                    dispatch(setOpening(true));
                                }}
                            >
                                Add
                            </Button>
                        </Box>
                    )}

                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: "auto",
                            pb: 2,
                            ...theme.custom.scrollbar.chat
                        }}
                    >
                        {isLoading ? (
                            <Typography sx={{mt: 5, color: "gray", textAlign: "center"}}>
                                Loading chats...
                            </Typography>
                        ) : chats.length === 0 ? (
                            <Typography sx={{mt: 5, color: "gray", textAlign: "center"}}>
                                No chats yet. Add your first chat!
                            </Typography>
                        ) : (
                            chats.map((chat: ChatEntity) => (
                                <MiniChat
                                    key={chat.id}
                                    bot_avatar={chat.avatar}
                                    bot_name={chat.botName}
                                    chat_id={chat.id}
                                    name={chat.name}
                                    bot_id={chat.botId}
                                    created_at={chat.createdAt}
                                />
                            ))
                        )}
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        padding: 2,
                        margin: "0 auto",
                        overflowY: "auto",
                        background: "#171726",
                        minHeight: 0,
                    }}
                >
                    {!isMobile && (
                        <Box sx={{mb: 4}}>
                            <Typer
                                text="* Temperature - creativity and randomness of response"
                                duration={30}
                                isTypeByLetter={true}
                                component={"p"}
                            />
                            <Typer
                                text="* TopP - text diversity"
                                duration={30}
                                isTypeByLetter={true}
                                component={"p"}
                            />
                            <Typer
                                text="* Max tokens - unit of text data (more tokens = more precise text)"
                                duration={30}
                                isTypeByLetter={true}
                                component={"p"}
                            />
                        </Box>
                    )}

                    {!isMobile && (
                        <>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid
                                    item
                                    xs={16}
                                    md={4}
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
                                >
                                    <Box sx={{width: {xs: "60px", md: "120px"}, height: {xs: "60px", md: "120px"}}}>
                                        <CircularProgressbar
                                            value={temperature * 100}
                                            text={`${temperature}°`}
                                            minValue={1}
                                            maxValue={200}
                                            styles={buildStyles({
                                                textSize: "10px",
                                                pathColor: "#c76c0a",
                                                trailColor: "#2c2d45",
                                                textColor: "white",
                                            })}
                                        />
                                    </Box>
                                    <Slider
                                        size={"small"}
                                        value={temperature * 100}
                                        onChange={(e, newValue) => {
                                            dispatch(setTemperature((newValue as number) / 100));
                                        }}
                                        min={1}
                                        max={200}
                                        sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                                            ? theme.custom.slider.param(theme)
                                            : {}
                                        }
                                        defaultValue={temperature * 100}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
                                >
                                    <Box sx={{width: {xs: "60px", md: "120px"}, height: {xs: "60px", md: "120px"}}}>
                                        <CircularProgressbar
                                            value={top_p * 100}
                                            minValue={1}
                                            maxValue={100}
                                            text={`Top P ${top_p}%`}
                                            styles={buildStyles({
                                                textSize: "10px",
                                                trailColor: "#2c2d45",
                                                pathColor: "#0ca1a6",
                                                textColor: "white",
                                            })}
                                        />
                                    </Box>
                                    <Slider
                                        size={"small"}
                                        value={top_p * 100}
                                        defaultValue={top_p * 100}
                                        onChange={(e, newValue) => {
                                            dispatch(setTopP((newValue as number) / 100));
                                        }}
                                        min={1}
                                        max={100}
                                        sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                                            ? theme.custom.slider.param(theme)
                                            : {}
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="center" sx={{marginTop: 2}}>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
                                >
                                    <Box sx={{width: {xs: "60px", md: "120px"}, height: {xs: "60px", md: "120px"}}}>
                                        <CircularProgressbar
                                            value={tokens}
                                            text={`${tokens} max tokens`}
                                            minValue={1}
                                            maxValue={4096}
                                            styles={buildStyles({
                                                textSize: "10px",
                                                trailColor: "#2c2d45",
                                                pathColor: "#080a4a",
                                                textColor: "white",
                                            })}
                                        />
                                    </Box>
                                    <Slider
                                        sx={theme => theme.custom && theme.custom.slider && theme.custom.slider.param
                                            ? theme.custom.slider.param(theme)
                                            : {}
                                        }
                                        size={"small"}
                                        value={tokens}
                                        defaultValue={tokens}
                                        onChange={(e, newValue) => {
                                            dispatch(setTokens(newValue as number));
                                        }}
                                        min={1}
                                        max={4096}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>
                <AddChat/>
            </Box>
        </>
    );
};

export default ChatPage;
