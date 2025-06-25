import React from "react";
import ModularForm, {ButtonConfig, FieldConfig} from "../components/Common/Form";
import {requestRegistration} from "../services/auth/registration";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {RegistrationDto} from "../DTO's/requests/registration";
import {tokenManager} from "../services/auth/tokenManager";
import {useSnackbar} from "notistack";
import {Box, Typography} from "@mui/material";

// Цвета в стиле всей системы
const BG = "#181825";
const ACCENT = "#8e5cf7";

const registrationFields: Record<string, FieldConfig> = {
    first_name: {
        type: "text",
        label: "First Name",
        placeholder: "Enter your name",
    },
    last_name: {
        type: "text",
        label: "Last Name",
        placeholder: "Enter your surname",
    },
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

const registrationInitialValues: RegistrationDto = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    accepting: false,
}

const registrationValidationSchema =
    Yup.object({
        first_name: Yup.string().min(3, "Minimum 3 symbols are required").required("Name required"),
        last_name: Yup.string().min(3, "Minimum 3 symbols are required").required("Surname required"),
        email: Yup.string().email().required('Email required'),
        password: Yup.string().min(6).required('Password required'),
    })

export const Registration: React.FC = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const buttons: ButtonConfig[] = [
        {
            label: "Register",
            type: "submit",
        },
        {
            label: "Login",
            type: "button",
            onClick: () => navigate('/login')
        }
    ]

    const handleSubmit = async (data: typeof registrationInitialValues) => {
        const res = await requestRegistration(data);
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
                Registration
            </Typography>
            <ModularForm
                fields={registrationFields}
                initialValues={registrationInitialValues}
                buttons={buttons}
                onSubmit={handleSubmit}
                validationSchema={registrationValidationSchema}
            />
        </Box>
    );
};
