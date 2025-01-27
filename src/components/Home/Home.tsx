import { FC } from 'react';
import { Button, keyframes, Box, Typography, AppBar,
    Toolbar, IconButton, styled, alpha,
    InputBase
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import AppleIcon from '@mui/icons-material/Apple';
import SearchIcon from '@mui/icons-material/Search';
import Aquarium from "../LandingComponents/Aquarium";
import Carousel from "../LandingComponents/Carousel";
import {Bitcoins} from "../LandingComponents/Bitcoins";
import {WelcomePictures} from "../LandingComponents/WelcomePictures";

const welcome = keyframes`
0% {
  opacity: 0;
  transform: translateY(120px);
}
100% {
  opacity: 1;
  transform: translateY(0px) 
}
`

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Home: FC = () => {
    const nav = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>

          <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '25vw' }}>
                <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                  <AppleIcon />
                </IconButton>
                <Search sx={{ flexGrow: 1 }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={() => {
                    nav('/login');
                  }}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    nav('/registration');
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Toolbar>
          </AppBar>


            <Box sx={{
                animation: `${welcome} 1.8s ease-out`,
                margin: '50px auto',
                padding: 0,
            }}>
                    <Typography variant={"h3"} sx={{ margin: 'auto', textAlign: 'center'}}>
                        Choose. Chat. Create
                    </Typography>

                    <Typography variant={"h5"} sx={{ maxWidth: '50vw', textAlign: 'center', padding: '25px 0'}}>
                        Select from a range of AI personalities and models to solve problems, brainstorm ideas, or just have a conversation tailored to your needs.
                    </Typography>
            </Box>
            <WelcomePictures />
            <Aquarium />
            <Bitcoins />
            <Carousel />
            {/*<Cards />*/}
            </Box>
    )
}

export default Home;