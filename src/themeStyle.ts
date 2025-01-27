import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    authentication: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldVariantOverrides {
    authentication: true;
  }
}
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3ac5c3',
    },
    secondary: {
      main: '#616161',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'authentication' },
          style: {
            margin: '10px auto',
            color: 'white',
            backgroundColor: '#530b59',
            '&:hover': {
              backgroundColor: 'gray',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            margin: '10px auto',
            color: 'black',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'gray',
            },
          }
        }
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h6' },
          style: ({theme }) => ({
            color: theme.palette.secondary.main,
            fontSize: theme.breakpoints.down('xs')
            ? '12px'
            : theme.breakpoints.down('sm')
            ? '14px'
            : theme.breakpoints.down('md')
            ? '18px'
            : theme.breakpoints.down('lg')
            ? '20px'
            : '15px',
          })
        }
      ]
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'standard' },
          style: {
            backgroundColor: 'dark',
            backgroundImage: 'linear-gradient(dark, gray)',
            color: 'white',
            borderRadius: '20px',
            padding: '6px',
            '&::placeholder': {
                color: 'gray',
                opacity: 1,
            },
          }
        },
        {
          props: { variant: 'outlined'},
          style: {
            backgroundColor: 'dark',
            color: 'white',
            borderRadius: '20px',
            '&::placeholder': {
              color: 'gray',
              opacity: 1
            }
          }
        }
      ]
    }
  },
   breakpoints: {
    values: {
      xs: 320,
      sm: 500,
      md: 768,
      lg: 900,
      xl: 1024,
    },
  },
});

export default theme;
