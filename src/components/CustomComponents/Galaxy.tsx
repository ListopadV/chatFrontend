import React from 'react';
import { Box, Typography } from '@mui/material';
import { FC} from 'react';
import {Python} from "../../SVG/Python";
import { React as ReactIcon } from '../../SVG/React'
import {Skull} from "../../SVG/Skull";
import {Brain} from "../../SVG/Brain";

const guys = [
  {
    logo: <Python />,
    text: 'Python',
    title: 'Python was used for backend and it is connected to PostgreSQL',
  },
  {
    logo: <ReactIcon />,
    text: 'React',
    title: 'Frontend for this website was built using React.js and MUI library',
  },
  {
    logo: <Skull />,
    text: 'Skull',
    title: 'I fucking love this skull, it is sexy',
  },
  {
    logo: <Brain />,
    text: 'Brain',
    title: 'Human intelligence is interesting, but using and CREATING one is absolute fun',
  },
];

const Galaxy: FC = () => {
  return (
      <Box>

      </Box>
  );
};

export default Galaxy;
