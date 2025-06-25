import React from 'react';
import {Box} from '@mui/material';
import WelcomeSection from "../components/Landing/WelcomeSection";
import VisionSection from "../components/Landing/VisionSection";
import StorytellingSection from "../components/Landing/StorytellingSection";
import CarouselSection from "../components/Landing/CarouselSection";

const LandingPage: React.FC = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(110deg, #e0367a 0%, #7c1aff 100%)',
                minHeight: '100vh',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                overflowX: 'hidden',
            }}
        >
            <WelcomeSection/>
            <VisionSection/>
            <StorytellingSection/>
            <CarouselSection/>
        </Box>
    );
};

export default LandingPage;
