// sections/VisionSection.tsx

import React from 'react';
import {Box, Typography} from '@mui/material';
import {keyframes} from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const VisionSection: React.FC = () => (<Box
    sx={{
        py: {xs: 8, md: 10}, px: 3, maxWidth: 1000, margin: '0 auto', animation: `${fadeIn} 1.3s 0.4s both`
    }}
>
    <Typography variant="sectionGradient">Our Mission</Typography>
    <Typography variant={"visionSubtitle"}>
        We believe messaging should be more than just text.
        <span style={{color: '#ff9cf3', fontWeight: 600}}>
        It should be intelligent, expressive, and empowering.
      </span>
        <br/><br/>
        Imagine every conversation powered by the world’s leading AI models — from brainstorming with GPT-4, to
        summarizing meetings with Gemini, or building bots with Bard.<br/><br/>
        Our platform brings AI directly into your chats — making collaboration, creativity, and productivity
        effortless.
    </Typography>
</Box>);

export default VisionSection;
