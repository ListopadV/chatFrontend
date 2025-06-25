// sections/CarouselSection.tsx

import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';

const features = [{
    icon: "🗣️",
    title: "Voice-to-Text & Commands",
    text: "Use your voice to send messages or control bots. Powered by TensorFlow.js on-device speech recognition.",
}, {
    icon: "🧠",
    title: "On-Device Moderation",
    text: "Real-time message moderation and toxicity detection with local TensorFlow.js models — privacy-friendly and fast.",
}, {
    icon: "🙂",
    title: "Emotion Detection",
    text: "Understand the mood of your chats with live sentiment and emotion analysis, running securely in your browser.",
}, {
    icon: "🖐️",
    title: "Gesture & Camera AI",
    text: "Trigger chat actions with webcam hand gestures or face expressions. (TensorFlow.js powered!)",
}, {
    icon: "📝",
    title: "Summarize, Translate, Create",
    text: "Summarize long chats, translate instantly, or generate code and content with any LLM — GPT, Gemini, Bard, and more.",
},];

const CarouselSection: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIndex(i => (i + 1) % features.length), 3500);
        return () => clearInterval(t);
    }, []);

    return (<Box
            sx={{
                minHeight: 260, my: {xs: 6, md: 9}, display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
        >
            <Typography variant="h4" sx={{
                fontWeight: 700, mb: 4, color: '#fff', textShadow: '0 2px 12px #530b59'
            }}>
                Why This Messenger?
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 5,
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 800,
                }}
            >
                {features.map((item, i) => (<Box
                        key={item.title}
                        sx={{
                            opacity: index === i ? 1 : 0.25,
                            transform: index === i ? 'scale(1.08)' : 'scale(0.95)',
                            transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
                            bgcolor: '#2a1147',
                            color: '#fff',
                            minWidth: 210,
                            maxWidth: 230,
                            minHeight: 175,
                            p: 3,
                            borderRadius: 5,
                            boxShadow: index === i ? '0 8px 40px #e0367a33' : '0 2px 8px #8e5cf722',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mx: 1
                        }}
                    >
                        <Typography sx={{fontSize: 44, mb: 1}}>{item.icon}</Typography>
                        <Typography variant="carouselTitle">{item.title}</Typography>
                        <Typography variant="carouselText">{item.text}</Typography>
                    </Box>))}
            </Box>
        </Box>);
};

export default CarouselSection;
