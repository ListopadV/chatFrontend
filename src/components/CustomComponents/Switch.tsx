import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Box, IconButton } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useState, FC } from 'react';
import {SwitchInterface} from "../../types";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 0,
    marginTop: '-3px',
    padding: 0,
    transform: 'translateX(1px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        // background image updated in thumb:before
        backgroundImage: `url('/path/to/smile.png')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#6a0dad', // purple
        ...theme.applyStyles('dark', {
          backgroundColor: '#4a0072', // darker purple
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // The default icon is a keyboard
      backgroundImage: `url('/path/to/keyboard.png')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892', // blue
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5', // lighter background
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5', // darker background
    }),
  },
}));

const Switcher: FC<SwitchInterface> = ({ checked, setChecked }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box display="flex" alignItems="center" sx={{
      mr: 2
  }}>
      <MaterialUISwitch
        checked={checked}
        onChange={handleChange}
        icon={
          <IconButton>
            <KeyboardIcon />
          </IconButton>
        }
        checkedIcon={
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>
        }
        sx={{
          '& .MuiSwitch-thumb': {
            width: 34,
            height: 34,
          },
          '& .MuiSwitch-track': {
            backgroundColor: checked ? 'lightblue' : 'purple',
          },
        }}
      />
    </Box>
  );
};

export default Switcher;
