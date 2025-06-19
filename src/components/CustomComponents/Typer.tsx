import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
// import {TextTypingEffectProps} from "../../types";
import useTyper from "../../Hooks/custom/useTyper";

interface TextTypingEffectProps {
    isTypeByLetter: boolean,
    duration: number,
    text: string,
    component: React.ReactNode
}

const Typer: FC<TextTypingEffectProps> = ({ isTypeByLetter, duration, text, component}) => {
  const textToShow = useTyper(text, duration, isTypeByLetter);
    let fontStyle ;
    if (component === 'p'){
        fontStyle = {
            xs: '12px',
                  sm: '12px',
                  md: '13px',
                  lg: '15px',
                  xl: '15px'
        }
    }
    if (component === 'h'){
        fontStyle = {
             xs: '10px',
          sm: '10px',
          md: '11px',
          lg: '12px',
          xl: '12px',
        }
    }

 return (
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Typography sx={{ mt: 1, fontSize: fontStyle }}>{textToShow}</Typography>
    </Box>
 )

}

export default Typer;
