// sections/StorytellingSection.tsx

import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import { keyframes } from '@mui/system';

const storyAppear = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`;

const steps = [
  {
    title: "The Beginning",
    icon: "💡",
    text: "We started with one simple question: what if anyone could chat with advanced AI like they do with friends?",
  },
  {
    title: "The Build",
    icon: "🛠️",
    text: "Our team engineered seamless messaging + multi-model AI — with open APIs and a privacy-first core.",
  },
  {
    title: "The Evolution",
    icon: "🤖",
    text: "We opened up to the world. Developers and teams started building custom bots, tools, and assistants inside chats.",
  },
  {
    title: "The Future",
    icon: "🚀",
    text: "Now we’re integrating real-time intelligence, TensorFlow.js, and new LLMs — for smarter, safer, and more powerful communication.",
  },
];

const StorytellingSection: React.FC = () => (
  <Box
    sx={{
      py: { xs: 8, md: 10 },
      px: 3,
      maxWidth: 1100,
      margin: '0 auto',
    }}
  >
    <Typography variant="h3"
      sx={{
        fontWeight: 700,
        background: 'linear-gradient(90deg, #ff6b9e, #a364ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4,
        textAlign: 'center'
      }}>
      How We Got Here
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {steps.map((s, i) => (
        <Grid item xs={12} sm={6} md={3} key={s.title}
          sx={{ animation: `${storyAppear} 1.1s ${(i + 1) * 0.18}s both` }}>
          <Box
            sx={{
              bgcolor: '#261246ef',
              borderRadius: 4,
              p: 3,
              minHeight: 190,
              textAlign: 'center',
              color: '#faf6ff',
              boxShadow: '0 8px 32px #7c1aff15'
            }}
          >
            <Avatar sx={{
              bgcolor: '#e0367a',
              width: 60,
              height: 60,
              mx: 'auto',
              mb: 2,
              fontSize: 38,
              boxShadow: '0 4px 20px #e0367a33'
            }}>{s.icon}</Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{s.title}</Typography>
            <Typography variant="body2">{s.text}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default StorytellingSection;
