import { FC, } from 'react';
import {Box, Grid, Typography, keyframes } from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

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

const appearFromTopLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate(-100vw, -100vw);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const appearFromTopRight = keyframes`
  0% {
    opacity: 0;
    transform: translate(100vw, -100vw);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const appearFromBottomLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate(-100vw, 100vw);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const appearFromBottomRight = keyframes`
  0% {
    opacity: 0;
    transform: translate(100vw, 100vw);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;


const smallLeft = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100vw);
}
100% {
  transform: translateX(0vw);
}
`

const smallRight = keyframes`
0% {
  opacity: 0;
  transform: translateX(100vw);
}
100% {
  transform: translateX(0vw);
}
`

const smallTop = keyframes`
0% {
  opacity: 0;
  transform: translateY(-100vw);
}
100% {
  transform: translateY(0vw);
}
`

const smallBottom = keyframes`
0% {
  opacity: 0;
  transform: translateY(100vw);
}
100% {
  transform: translateY(0vw);
}
`

const generateRandomAnimation = () => {
  const animations = [smallLeft, smallRight, smallTop, smallBottom, appearFromBottomLeft, appearFromBottomRight, appearFromTopLeft, appearFromTopRight];
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex];
};


export const Bitcoins: FC = () => {

    const items = new Array(55).fill(null).map(() => ({
        id: Math.random(),
        animation: generateRandomAnimation(),
        }));

    return (
    <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '90vw',
                margin: 'auto',
                flexGrow: 1,
                marginBottom: '50px'
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  flexBasis: '30%',
                  flexGrow: 0,
                  maxWidth: '30%',
                  height: '220px',
                  overflow: 'hidden'
                }}
              >
                {items.map((item, index) => (
                  <Grid item key={`left-${index}`}>
                    <CurrencyBitcoinIcon
                      sx={{
                        animation: `${items[index % items.length]?.animation || ''} 3s forwards`,
                        width: '20px',
                        height: '20px',
                          '&:hover': {
                            animation: `${word} 1s infinite ease-in-out`
                          }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  flexBasis: '40%',
                  flexGrow: 0,
                  maxWidth: '40%',
                  maxHeight: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '15px',
                    flexDirection: 'column'
                }}
              >
                <Typography>Lorem ipsum, piece of **** </Typography>
                  <Typography> Move arrow on bitcoin :) </Typography>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  flexBasis: '30%',
                  flexGrow: 0,
                  maxWidth: '30%',
                  height: '220px',
                  overflow: 'hidden'
                }}
              >
                {items.map((item, index) => (
                  <Grid item key={`right-${index}`}>
                    <CurrencyBitcoinIcon
                      sx={{
                        animation: `${items[index % items.length]?.animation || ''} 3s forwards`,
                        width: '20px',
                        height: '20px',
                          '&:hover': {
                            animation: `${word} 1s infinite ease-in-out`
                          }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
    )
}