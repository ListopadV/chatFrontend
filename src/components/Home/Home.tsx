import { FC } from 'react';
import { Button, keyframes, Box, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

const word = keyframes`
  0% { transform: translateY(0px); }
  5% { transform: translateY(15px); }
  10% { transform: translateY(-15px); }
  15% { transform: translateY(15px); }
  20% { transform: translateY(-15px); }
  25% { transform: translateY(15px); }
  30% { transform: translateY(-15px); }
  35% { transform: translateY(15px); }
  40% { transform: translateY(-15px); }
  45% { transform: translateY(15px); }
  50% { transform: translateY(0px); }
  55% { transform: translateY(15px); }
  60% { transform: translateY(-15px); }
  65% { transform: translateY(15px); }
  70% { transform: translateY(-15px); }
  75% { transform: translateY(15px); }
  80% { transform: translateY(-15px); }
  85% { transform: translateY(15px); }
  90% { transform: translateY(-15px); }
  95% { transform: translateY(15px); }
  100% { transform: translateY(0px); }
`;

const Home: FC = () => {

    const nav = useNavigate();

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 100, left: 100, right: 0, bottom: 0,
            background: 'linear-gradient(to right, darkblue, darkorchid) ', width: '200px', height: '40px',
        }} onClick={() => {
            nav('/registration')
        }}>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>W</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>e</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>l</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>c</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>o</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>m</Typography>
            <Typography sx={{
                '&:hover': {
                    animation: `${word} 1s ease-in`
                }
            }}>e</Typography>
        </Box>
    )
}

export default Home;
