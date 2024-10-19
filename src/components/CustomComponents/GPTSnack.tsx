import { FC, useEffect } from 'react';
import { TransitionProps } from '@mui/material/transitions';import * as React from 'react';
import Fade from '@mui/material/Fade';
import { Snackbar,IconButton, Button } from '@mui/material';

export const GPTSnack: FC = ()  => {
    const [state, setState] = React.useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
            children: React.ReactElement<any, any>;
        }
        >;
    }>({
        open: false,
        Transition: Fade,
    });

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setState({
                ...state,
                open: true
            })
        }, 1000)
    }, []);

    return (
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message={
            <span style={{ fontSize: '0.875rem' }}>
              * Requests to ChatGPT may not be sent due to Azure restrictions. Many users ask ChatGPT :))
            </span>
          }
          key={state.Transition.name}
          autoHideDuration={4800}
          action={
            <React.Fragment>
              <Button
                size="small"
                onClick={handleClose}
                sx={{ color: '#9c27b0' }}
              >
                Close
              </Button>
            </React.Fragment>
          }
          sx={{
            fontSize: {xs: '9px', sm: '9px', md: '10px', lg: '13px', xl: '15px'},
              '& .MuiSnackbarContent-root': {
              backgroundColor: '#212121',
              color: 'white',
            },
          }}
        />

    )
}