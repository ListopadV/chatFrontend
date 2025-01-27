import {useEffect, useState, FC, } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import PaymentIcon from '@mui/icons-material/Payment';
import {Python} from "../../extra/SVG/Python";
import {Brain} from "../../extra/SVG/Brain";
import { React} from "../../extra/SVG/React";
import {Skull} from "../../extra/SVG/Skull";
import { keyframes } from "@mui/system";
import {HoverState} from "../../types";

const radius = {
    xs: '100px',
    sm: '100px',
    md: '200px',
    lg: '250px',
    xl: '300px',
}

const margin = {
    xs: '200px auto',
    sm: '200px auto',
    md: '300px auto',
    lg: '350px auto',
    xl: '500px auto',
}

const width = {
    xs: '100px',
    sm: '100px',
    md: '190px',
    lg: '210px',
    xl: '220px',
}

const height = {
    xs: '200px',
    sm: '200px',
    md: '150px',
    lg: '150px',
    xl: '170px',
}

const mini = {
    xs: '25px',
    sm: '25px',
    md: '30px',
    lg: '40px',
    xl: '50px',
}

const r = {
    xs: '50px',
    sm: '50px',
    md: '70px',
    lg: '90px',
    xl: '100px',
}

const fromLeft = keyframes`
  0% {
    bottom: -2px;
    left: -2px;
    opacity: 0;
  }
  100% {
    bottom: 5px;
    left: 5px;
    opacity: 1;
  }
`;

const fromRight = keyframes`
  0% {
    bottom: -2px;
    right: -2px;
    opacity: 0;
  }
  100% {
    bottom: 5px;
    right: 5px;
    opacity: 1;
  }
`;

const bigger = keyframes`
0% {
  transform: scale(1);
}
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.1);
  }
`

const carouselChild = {
     position: 'absolute',
              border: '1px solid gray',
              backgroundColor: 'dark',
              borderRadius: '20px',
            transition: 'transform 0.3s ease-out',
            width: width,
            height: height,
            textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '15px',
}


const Carousel: FC = () => {

  const [degree, setDegree] = useState(0);
    const [hovered, setHovered] = useState<HoverState>({
        '1': false,
        '2': false,
        '3': false,
        '4': false,
    });

  const icons = [
      {
          title: 'Frontend',
          text: 'React is used here for frontend',
          icon: <React />
      },
      {
          title: 'Backend',
          text: 'Backend was written in Python',
          icon: <Python />
      },
      {
          title: 'Skull',
          text: 'AI might be deadly one day',
          icon: <Skull />
      },
      {
          title: 'Intelligence',
          text: 'Just a fucking svg brain',
          icon: <Brain />
      }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setDegree((scrollPosition / 2500) * 360);
    };

    const debouncedHandleScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return (
    <Box>
      <Box
          className={'object'}
          sx={{
              margin: margin,
              width: r,
              height: r,
              transform: `rotate(${degree}deg)`,
          }}
              >
        {icons.map((item, index) => (
              <Box
                  onMouseEnter={() => {
                      setHovered((h) => ({
                              ...h,
                              [index]: true
                      }));
                  }}
                  onMouseLeave={() => {
                      setHovered((h) => ({
                              ...h,
                              [index]: false
                      }));
                  }}
            key={index}
            className={hovered[index] ? 'hovered' : '' }
            sx={{
              ...carouselChild,
                '&:hover': {
                    opacity: 0.5,
                    transform: `scale(1.1) rotate(${-degree}deg)`
                },
              transform: `rotate(${-degree}deg)`,
              ...(index === 0 && { top: radius }),
              ...(index === 1 && { bottom: radius }),
              ...(index === 2 && { right: radius }),
              ...(index === 3 && { left: radius }),
            }}
          >
            <Typography variant={"h6"}>{item.title}</Typography>
            <Box
              sx={{
                width: mini,
                height: mini,
                  animation: hovered[index.toString()] ? `${bigger} 1.5s ease-in` : ''
              }}
            >
              {item.icon}
            </Box>
            <Typography variant={"h6"}>{item.text}</Typography>
              <IconButton sx={{
                  position :'absolute',
                  animation: hovered[index.toString()]
                  ? `${fromLeft} 1s forwards`
                  : "none",
                opacity: 0,

              }}>
                <InsightsIcon />
              </IconButton>
                  <IconButton sx={{
                  position :'absolute',
                  animation: hovered[index.toString()]
                  ? `${fromRight} 1s forwards`
                  : "none",
                opacity: 0,
              }}>
                <PaymentIcon />
              </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;