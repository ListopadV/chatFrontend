import { Box, Typography, Divider } from '@mui/material';
import { FC } from 'react';
import {CardProps} from "../../types";

export const Card: FC<CardProps> = ({ text, title, index  }) => {
    return (
        <Box sx={{
            position: 'relative',
            animation: '',
            width: '200px',
            margin: '0 10px',
            height: '250px',
            backgroundColor: 'dark',
            borderRadius: '20px',
            border: '0.5px solid gray',
            textAlign: 'center'
        }}>
            <Box sx={{
                width: '45px',
                height: '2px',
                color: 'blue',
                position: 'absolute',
                transform: 'rotate(90deg)',
                top: '0',
                right: '55px'
            }}></Box>
            <Typography variant={"h6"} sx={{
                position: 'absolute',
                bottom: '5px',
            }}>
                {title}
            </Typography>
            <Typography variant={"h6"} sx={{}}>
                {text}
            </Typography>
        </Box>
    )
}