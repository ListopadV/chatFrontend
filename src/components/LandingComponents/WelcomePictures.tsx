import {Box, Typography, keyframes} from "@mui/material";
import { FC } from 'react';
import { MiniChip } from "./MiniChip";

const right = keyframes`
0% {
  opacity: 0;
    transform: translateX(50vw);

}

100% {
  opacity: 1;
  transform: translateX(5vw); 
}
`

const left = keyframes`
0% {
  opacity: 0;
  transform: translateX(-50vw);
}
100% {
  transform: translateX(-10vw);
}
`

export const WelcomePictures: FC = () => {
  return (
      <>
        <Box sx={{
                animation: ``,
                margin: '50px auto',
                padding: 0
            }}>

                <Box sx={{
                    animation: `${left} 2s forwards`,
                    padding: '20px 40px',
                    textAlign: 'center',
                }}>
                    <Typography sx={{
                        mb: '10px'
                    }}>
                        Do you need intelligent solution ?
                    </Typography>

                    <img src={"https://res.cloudinary.com/quibench/image/upload/v1736364365/Chatok/rzpkjqmvlwn8pjqhdlmv.jpg"} style={{
                        width: '25vw',
                        height: '17vw',
                        borderRadius: '20px'
                    }} alt={"chatgpt"} />
                </Box>

                <Box sx={{
                    animation: `${right} 3s forwards`,
                    padding: '10px',
                    textAlign: 'center',
                    marginTop: '15px',
                }}>
                    <Typography sx={{
                        mb: '10px'
                    }}>
                        Or you want intelligent conversation ?
                    </Typography>
                    <img src={"https://res.cloudinary.com/quibench/image/upload/v1736364405/Chatok/czc8oklhgvo7teq22je7.png"} style={{
                        width: '18vw',
                        height: '15vw',
                        borderRadius: '20px'
                    }} alt={"geminichek"} />
                </Box>

            </Box>

      </>
    )
}