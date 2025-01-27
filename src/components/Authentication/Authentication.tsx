import { FC } from 'react';
import {Box, TextField, Button, Checkbox, FormControlLabel, Avatar, keyframes} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate, NavigateFunction } from 'react-router-dom'
import {setAccessToken} from "../../redux/loginSlice";
import {githubAuthUrl} from "../../variables";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import { styled } from '@mui/material/styles';
import {AuthenticationProps, FormValues} from "../../types";
import { url } from '../../variables';
import {RequestSnack} from "../CustomComponents/GPTSnack";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'purple',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#530b59',
  },
  '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
    '& fieldset': {
      borderColor: '#530b59',
    },
    '&:hover fieldset': {
      borderColor: 'purple',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'purple',
    },
  },
});

const movingButton = keyframes`
    0% {
    background: linear-gradient(to right, #7b1fa2 10%, transparent 30%, #6a0080 50%);
  }
  25% {
    background: linear-gradient(to right, #6a0080 20%, transparent 40%, #5e0080 60%);
  }
  50% {
    background: linear-gradient(to right, #5e0080 30%, transparent 50%, #500070 70%);
  }
  75% {
    background: linear-gradient(to right, #500070 40%, transparent 60%, #4a0072 80%);
  }
  100% {
    background: linear-gradient(to right, #4a0072 50%, transparent 70%, #400b52 90%);
  }
`

const Authentication: FC<AuthenticationProps> = ({ isLogin, isRegistration }) => {

    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        if (!values.email || !values.password){

        } else
    try {
        let response;
        if (isLogin) {
           try {
                    await axios.post(`${url}/users/login`, {
                        "email": values.email,
                        "password": values.password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        dispatch(setAccessToken(response.data.access_token));
                        navigate('/chats');
                    })
           } catch (e){
               console.error('Error logging user: ', e);
           }
        }
        if (isRegistration) {
            console.log(values)
                await axios.post(`${url}/users/registration`, values, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                .then(response => {
                    dispatch(setAccessToken(response.data.access_token));
                    navigate('/chats');
                })
        }
        resetForm();
    } catch (error) {
        console.error("Error during authentication:", error);
    }
};
     const loginWithGitHub = () => {
        window.location.href = githubAuthUrl;
    };

    return (
       <>
         <Box sx={{
            width: {
                xs: '85vw',
                  sm: '85vw',
                  md: '65vw',
                  lg: '50vw',
                  xl: '50vw'
            },
            height: isRegistration ? '75vh' : '55vh',
            m: isRegistration ? '100px auto' : '150px auto',
            border: '1px solid #231426',
            p: 2,
            maxWidth: '500px',
            textAlign: 'center',
            borderRadius: '25px',
            boxShadow: '1px 2px 6px 6px #231426'
        }}>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    accepting: false
                }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '100%',
                    }}>
                        {isRegistration && (
                            <>
                                <Field style={{
                                    marginBottom: '10px',

                                }}
                                    as={CssTextField}
                                    name="first_name"
                                    label="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    error={touched.first_name && Boolean(errors.first_name)}
                                    helperText={touched.first_name && errors.first_name}
                                    placeholder="First Name"
                                />
                                <Field style={{
                                    marginBottom: '5px'
                                }}
                                    as={CssTextField}
                                    name="last_name"
                                    label="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    error={touched.last_name && Boolean(errors.last_name)}
                                    helperText={touched.last_name && errors.last_name}
                                    placeholder="Last Name"
                                />
                            </>
                        )}

                        <Field style={{
                                    marginBottom: '10px'
                                }}
                            as={CssTextField}
                            name="email"
                            label="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <Field style={{
                                    marginBottom: '10px'
                                }}
                            as={CssTextField}
                            name="password"
                            type="password"
                            label="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />

                        <Box sx={{
                            display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-around', ml: 'auto', mr: 'auto'
                        }}>
                            <Avatar onClick={loginWithGitHub}
                                src={'data:image/png;base64,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'} alt={"Github"}></Avatar>
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', mt: 3 }}>
                            <FormControlLabel
                                name="accepting"
                                control={<Checkbox defaultChecked />}
                                label="By accepting  , you agree with our terms and conditions"
                                  sx={{
                                    margin: 'auto',
                                    '& .MuiFormControlLabel-label': {
                                      fontSize: {
                                        xs: '11px',
                                        sm: '11px',
                                        md: '13px',
                                        lg: '15px',
                                        xl: '16px',
                                      },
                                    },
                                  }}
                            />
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                            }}>
                                <Button
                                    type="submit"
                                    variant="authentication"
                                    sx={{mt: 2, width: '30%',   '&:hover': {
                                              animation: `${movingButton} 1s ease-in-out forward`,
                                              backgroundSize: '200% 100%',
                                              backgroundPosition: 'left',
                                            },}}>
                                    {isLogin ? 'Login' : 'Register'}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 2, width: '30%',  '&:hover': {
                                          animation: `${movingButton} 1s ease-in-out forward`,
                                          backgroundSize: '200% 100%',
                                          backgroundPosition: 'left',
                                        },}}
                                    onClick={() => {
                                        if (isLogin) {
                                            navigate('/registration');
                                        } else {
                                            navigate('/login');
                                        }
                                    }}>
                                    {isLogin ? 'Sign Up' : 'Sign in'}
                                </Button>
                            </Box>
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
           <RequestSnack />
       </>

    );
};

export default Authentication;
