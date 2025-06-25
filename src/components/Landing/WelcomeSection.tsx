import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {keyframes} from '@mui/system';
import {useNavigate} from "react-router-dom";

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WelcomeSection: React.FC = () => {
    const navigate = useNavigate();

    return (<Box
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
        <Typography variant="welcomeTitle">
            Chat with the Future
        </Typography>
        <Typography variant="welcomeDesc">
            Welcome to the next generation of messaging.<br/>
            Connect, collaborate and create with the world’s best AI models — all in one place.
        </Typography>
        <Button variant="startChatLanding"
                onClick={() => navigate('/login')}>
            Start Chatting
        </Button>
    </Box>)
};

export default WelcomeSection;
