import React from 'react';
import ModularForm, {ButtonConfig, FieldConfig} from "../components/Common/Form";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {requestLogin} from "../services/auth/login";
import {tokenManager} from "../services/auth/tokenManager";
import {useSnackbar} from "notistack";
import {Box, Typography} from "@mui/material";

// Цвета
const BG = "#181825";
const ACCENT = "#8e5cf7";

const loginFields: Record<string, FieldConfig> = {
    email: {
        type: "text",
        label: "Email",
        placeholder: "Enter email address",
    },
    password: {
        type: "password",
        label: "Password",
        placeholder: "Enter password",
    }
}

const loginInitialValues = {
    email: "",
    password: ""
}

const loginValidationSchema = Yup.object({
    email: Yup.string().email().required('Email required'),
    password: Yup.string().min(6).required('Password required'),
})

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const buttons: ButtonConfig[] = [
        {
            label: "Login",
            type: "submit",
        },
        {
            label: "Registration",
            type: "button",
            onClick: () => {
                navigate('/registration')
            }
        }
    ]

    const handleSubmit = async (values: typeof loginInitialValues) => {
        const res = await requestLogin(values);
        if (res.access_token) {
            tokenManager.setAccessToken(res.access_token);
            navigate('/chats');
        } else {
            enqueueSnackbar(res.message, {variant: 'error'});
        }
    }

    return (
        <Box
            sx={{
                bgcolor: BG,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 6,
                pb: 5
            }}
        >
            <Typography variant="h4" sx={{color: ACCENT, fontWeight: 800, letterSpacing: 2}}>
                Login
            </Typography>
            <ModularForm
                onSubmit={handleSubmit}
                fields={loginFields}
                initialValues={loginInitialValues}
                buttons={buttons}
                validationSchema={loginValidationSchema}
            />
        </Box>
    );
};
