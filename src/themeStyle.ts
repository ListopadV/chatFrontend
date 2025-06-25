import {alpha, createTheme} from "@mui/material/styles";
import {CustomPalette, FlexboxObject} from "./globalTypes";
import {Theme} from "@mui/material";

const pathColors = {
    orange: "#c76c0a",
    cyan: "#0ca1a6",
    blue: "#080a4a",
    trail: "#2c2d45",
    pink: "#e0367a",
    purple: "#2a1147",
};

const mode = "dark";
const primaryColor = pathColors.purple;
const secondaryColor = pathColors.orange;
const backgroundColor = "#121212";
const paperColor = "#1e1e1e";
const textPrimaryColor = "#ffffff";
const textSecondaryColor = "#b0bec5";

const breakpoints = {
    values: {
        xs: 320,
        sm: 500,
        md: 768,
        lg: 900,
        xl: 1024,
    },
};

const flexbox: FlexboxObject = {
    row: {
        start: {display: "flex", flexDirection: "row", justifyContent: "flex-start"},
        center: {display: "flex", flexDirection: "row", justifyContent: "center"},
        centerAligned: {display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"},
        end: {display: "flex", flexDirection: "row", justifyContent: "flex-end"},
        between: {display: "flex", flexDirection: "row", justifyContent: "space-between"},
        around: {display: "flex", flexDirection: "row", justifyContent: "space-around"},
        evenly: {display: "flex", flexDirection: "row", justifyContent: "space-evenly"},
    },
    column: {
        start: {display: "flex", flexDirection: "column", justifyContent: "flex-start"},
        center: {display: "flex", flexDirection: "column", justifyContent: "center"},
        centerAligned: {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"},
        end: {display: "flex", flexDirection: "column", justifyContent: "flex-end"},
        between: {display: "flex", flexDirection: "column", justifyContent: "space-between"},
        around: {display: "flex", flexDirection: "column", justifyContent: "space-around"},
        evenly: {display: "flex", flexDirection: "column", justifyContent: "space-evenly"},
    },
    align: {
        start: {alignItems: "flex-start"},
        center: {alignItems: "center"},
        end: {alignItems: "flex-end"},
        stretch: {alignItems: "stretch"},
        baseline: {alignItems: "baseline"},
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

const customPalette: CustomPalette = {
    path: pathColors,
    bgPink: pathColors.pink,
    bgPurple: pathColors.purple,
    hint: "rgba(255,255,255,0.38)",
    backgroundDark: "#2a2a36",
};

const theme = createTheme({
    palette: {
        mode,
        primary: {
            main: primaryColor,
            light: "#484458",
            dark: "#0f0d14",
            contrastText: "#ffffff",
        },
        secondary: {
            main: secondaryColor,
            light: "#c6b8e6",
            dark: "#8573bc",
            contrastText: "#24212b",
        },
        background: {
            default: backgroundColor,
            paper: paperColor,
        },
        text: {
            primary: textPrimaryColor,
            secondary: textSecondaryColor,
            disabled: "rgba(255,255,255,0.38)",
        },
        action: {
            hover: alpha(secondaryColor, 0.08),
            selected: alpha(secondaryColor, 0.16),
            disabled: "rgba(255,255,255,0.3)",
            disabledBackground: "rgba(255,255,255,0.12)",
        },
        info: {
            main: "#b4a3e7",
            light: "#E1D9F3",
            dark: "#8677c9",
            contrastText: "#ffffff",
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#ff9800",
            light: "#ffb74d",
            dark: "#f57c00",
            contrastText: "#ffffff",
        },
        success: {
            main: "#88c28a",
            light: "#aad4ac",
            dark: "#5a9c5d",
            contrastText: "#ffffff",
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#f5f5f5",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
        },
        custom: customPalette,
    },
    custom: {
        scrollbar: {
            chat: {
                '&::-webkit-scrollbar': {width: '8px'},
                '&::-webkit-scrollbar-thumb': {
                    background: '#333',
                    borderRadius: '8px'
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent'
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#333 transparent',
            },
            messages: {
                '&::-webkit-scrollbar': {
                    width: '8px',
                    borderRadius: '10px',
                    backgroundColor: '#181825',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(110deg, #8e5cf7 0%, #43364a 100%)',
                    borderRadius: '10px',
                    minHeight: '24px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: 'linear-gradient(110deg, #a583ff 0%, #5c4f77 100%)',
                },
                '&::-webkit-scrollbar-corner': {
                    background: '#181825',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#8e5cf7 #181825',
            }
        },
        slider: {
            param: (theme: Theme) => ({
                maxWidth: 110,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                marginBottom: theme.spacing(1),
                color: theme.palette.primary.main,
                '& .MuiSlider-thumb': {
                    borderRadius: 2,
                    background: theme.palette.primary.main,
                    border: '2px solid #fff',
                    width: 18,
                    height: 18,
                    boxShadow: '0 2px 10px 0 #0002'
                },
                '& .MuiSlider-rail': {
                    opacity: 0.18,
                    background: theme.palette.primary.light,
                    height: 8,
                    borderRadius: 4
                },
                '& .MuiSlider-track': {
                    background: theme.palette.primary.main,
                    height: 8,
                    borderRadius: 4
                }
            }),
        }
    },
    breakpoints,
    flexbox,
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'authFormPrimary'},
                    style: ({theme}) => ({
                        minWidth: '120px',
                        height: '44px',
                        borderRadius: '15px',
                        fontWeight: 600,
                        fontSize: '16px',
                        background: `linear-gradient(10deg, ${theme.palette.primary.main}, #231426)`,
                        color: '#fff',
                        boxShadow: '0 2px 6px 1px #2b1542',
                        '&:hover': {
                            opacity: 0.9,
                        },
                    }),
                },
                {
                    props: {variant: 'authFormSecondary'},
                    style: ({theme}) => ({
                        minWidth: '120px',
                        height: '44px',
                        borderRadius: '15px',
                        fontWeight: 500,
                        fontSize: '16px',
                        background: `linear-gradient(100deg, #e0367a 0%, #7c1aff 100%)`,
                        color: 'black',
                        borderColor: theme.palette.primary.main,
                        '&:hover': {
                            opacity: 0.9,
                        },
                    }),
                },
                {
                    props: {variant: 'confirmChat'},
                    style: ({theme}) => ({
                        minWidth: '140px',
                        height: '44px',
                        borderRadius: '16px',
                        fontWeight: 600,
                        fontSize: '16px',
                        px: 4, py: 1.2,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, #342061)`,
                        color: theme.palette.text.primary,
                        boxShadow: 'none',
                        '&:hover': {
                            background: `linear-gradient(90deg, ${theme.palette.primary.light}, #342061)`,
                        },
                        '&:disabled': {
                            background: '#222',
                        },
                    }),
                },
                {
                    props: {variant: 'cancelChat'},
                    style: ({theme}) => ({
                        minWidth: '140px',
                        height: '44px',
                        borderRadius: '15px',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: theme.palette.primary.main,
                        background: 'transparent',
                        '&:hover': {
                            background: theme.palette.action.hover,
                        },
                    }),
                },
                {
                    props: {variant: 'startChatLanding'},
                    style: ({theme}) => ({
                        minWidth: 'auto',
                        height: 'auto',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '18px',
                        px: 5, py: 1.5,
                        background: 'linear-gradient(90deg, #b61872, #7c1aff)',
                        color: '#fff',
                        boxShadow: '0 4px 24px #0005',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #7c1aff, #b61872)',
                        },
                    }),
                }

            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: {variant: 'modalTitle'},
                    style: ({theme}) => ({
                        color: theme.palette.primary.main,
                        marginBottom: theme.spacing(3),
                        textAlign: 'center',
                        fontWeight: 700,
                        letterSpacing: 1,
                        fontSize: 22
                    }),
                },
                {
                    props: {variant: 'modalBotName'},
                    style: ({theme}) => ({
                        width: '100%',
                        fontSize: 13,
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        paddingTop: theme.spacing(2),
                        textAlign: 'center',
                        textShadow: '0 1px 5px #000b'
                    }),
                },
                {
                    props: {variant: 'modalBotModel'},
                    style: ({theme}) => ({
                        width: '100%',
                        fontSize: 12,
                        paddingTop: 0.5,
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        textAlign: 'center'
                    }),
                },
                {
                    props: {variant: 'modalPlaceholder'},
                    style: ({theme}) => ({
                        marginTop: theme.spacing(3),
                        color: theme.palette.text.secondary,
                        textAlign: 'center',
                        fontSize: 16
                    }),
                },
                {
                    props: {variant: 'chatParam'},
                    style: {
                        color: 'gray',
                        textAlign: 'center',
                        fontSize: 14
                    }
                },

                {
                    props: {variant: 'miniChatBotName'},
                    style: ({theme}) => ({
                        fontWeight: 'bold',
                        marginLeft: theme.spacing(1),
                        fontSize: 16,
                        [theme.breakpoints.down('lg')]: {fontSize: 14},
                        [theme.breakpoints.down('md')]: {fontSize: 14},
                        [theme.breakpoints.down('sm')]: {fontSize: 12},
                        [theme.breakpoints.down('xs')]: {fontSize: 12}
                    })
                },
                {
                    props: {variant: 'miniChatName'},
                    style: ({theme}) => ({
                        fontSize: 16,
                        [theme.breakpoints.down('lg')]: {fontSize: 16},
                        [theme.breakpoints.down('md')]: {fontSize: 16},
                        [theme.breakpoints.down('sm')]: {fontSize: 14},
                        [theme.breakpoints.down('xs')]: {fontSize: 12}
                    })
                },
                {
                    props: {variant: 'miniChatDate'},
                    style: ({theme}) => ({
                        fontSize: 16,
                        [theme.breakpoints.down('lg')]: {fontSize: 16},
                        [theme.breakpoints.down('md')]: {fontSize: 16},
                        [theme.breakpoints.down('sm')]: {fontSize: 14},
                        [theme.breakpoints.down('xs')]: {fontSize: 12}
                    })
                },
                {
                    props: {variant: 'carouselTitle'},
                    style: ({theme}) => ({
                        fontWeight: 700,
                        marginBottom: theme.spacing(1),
                        fontSize: 20
                    }),
                },
                {
                    props: {variant: 'carouselText'},
                    style: ({theme}) => ({
                        fontSize: 15,
                        color: '#d9c4fa',
                        textAlign: 'center'
                    }),
                },
                {
                    props: {variant: 'storyGradient'},
                    style: {
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #ff6b9e, #a364ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 32,
                        textAlign: 'center',
                        fontSize: 38
                    }
                },
                {
                    props: {variant: 'sectionGradient'},
                    style: {
                        fontWeight: 800,
                        background: 'linear-gradient(90deg, #fd6a99, #8a51ec)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 16,
                        fontSize: 38
                    }
                },
                {
                    props: {variant: 'visionSubtitle'},
                    style: {
                        color: '#f1eaff',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        fontSize: 20
                    }
                },
                {
                    props: {variant: 'visionHighlight'},
                    style: {
                        color: '#ff9cf3',
                        fontWeight: 600
                    }
                },
                {
                    props: {variant: 'welcomeTitle'},
                    style: ({theme}) => ({
                        fontWeight: 900,
                        letterSpacing: 2,
                        background: 'linear-gradient(90deg, #ff5f8f 20%, #8d5cfc 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 56,
                        [theme.breakpoints.down('xs')]: {fontSize: 36}
                    }),
                },
                {
                    props: {variant: 'welcomeDesc'},
                    style: {
                        color: '#fafafa',
                        maxWidth: 700,
                        marginBottom: 16,
                        fontSize: 22
                    }
                }

            ]
        },
        MuiTextField: {
            variants: [
                {
                    props: {variant: 'standard'},
                    style: {
                        backgroundColor: pathColors.trail,
                        backgroundImage: `linear-gradient(${pathColors.trail}, gray)`,
                        color: 'white',
                        borderRadius: '20px',
                        padding: '6px',
                        '& .MuiInputBase-input::placeholder': {
                            color: 'gray',
                            opacity: 1,
                        },
                    }
                },
                {
                    props: {variant: 'outlined'},
                    style: ({theme}) => ({
                        marginTop: '10px',
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                            '& fieldset': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.primary.light,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.light,
                            },
                        },
                    }),
                },
            ]
        },
    },
});

export default theme;
