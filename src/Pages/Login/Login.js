import * as React from 'react';
import authService from '../../services/authService.js';
import { Breadcrumbs, Box, Typography, TextField, Button, StyledEngineProvider } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import './Login.scss';

export default function Login() {

    const loginHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');

        authService.login(email, password)
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box className='login-wrapper'>
                <Box className='breadcrumbs-wrapper'>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link to="/" className='navigation-link-element breadcrumb-item'>
                            Home
                        </Link>
                        <Link to="/login" className='navigation-link-element breadcrumb-item breadcrumb-item-last'>
                            Login
                        </Link>
                    </Breadcrumbs>
                </Box>
                <Typography variant='h3' component='h1' className='login-header-text'>Login</Typography>
                <div className='login-form-wrapper'>
                    <form method="post" className='login-form' onSubmit={loginHandler}>
                        <Box className='login-form-input-wrapper'>
                            <Box className='login-form-item-wrapper'>
                                <TextField
                                    className="login-form-text-field"
                                    size='small'
                                    label="Email Address"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1rem'
                                        },
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        },
                                        name: 'email'
                                    }}
                                />
                            </Box>
                            <Box className='login-form-item-wrapper'>
                                <TextField
                                    className="login-form-text-field"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1rem'
                                        }
                                    }}
                                    inputProps={{
                                        type: 'password',
                                        style: {
                                            fontSize: '1.2rem'
                                        },
                                        name: 'password'
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className='login-form-item-wrapper'>
                            <Button variant="contained" size='large' type='submit' component='button' className='login-button'>Login</Button>
                        </Box>
                    </form>
                </div>
            </Box>
        </StyledEngineProvider>
    )
}