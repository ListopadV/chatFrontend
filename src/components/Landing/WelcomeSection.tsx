import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';
import {useNavigate} from "react-router-dom";

const appear = keyframes`
  from { opacity: 0; transform: translateY(-50px);}
  to { opacity: 1; transform: translateY(0);}
`;

const WelcomeSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 3,
                px: 2,
                animation: `${appear} 1.2s`,
            }}
        >
            <Typography variant="h2" sx={{
                fontWeight: 900,
                letterSpacing: 2,
                background: 'linear-gradient(90deg, #ff5f8f 20%, #8d5cfc 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: {xs: 36, md: 56}
            }}>
                Chat with the Future
            </Typography>
            <Typography variant="h5" sx={{color: '#fafafa', maxWidth: 700, mb: 2}}>
                Welcome to the next generation of messaging.<br/>
                Connect, collaborate and create with the world’s best AI models — all in one place.
            </Typography>
            <Button variant="contained"
                    onClick={() => {
                        navigate('/login')
                    }}
                    sx={{
                        background: 'linear-gradient(90deg, #b61872, #7c1aff)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 18,
                        borderRadius: 8,
                        px: 5,
                        py: 1.5,
                        boxShadow: '0 4px 24px #0005',
                        '&:hover': {background: 'linear-gradient(90deg, #7c1aff, #b61872)'}
                    }}
            >
                Start Chatting
            </Button>
        </Box>
    )
};

export default WelcomeSection;
