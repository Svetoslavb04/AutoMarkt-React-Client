import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as authService from '../../services/authService.js';
import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext.js';
import { isEmail, isLongerThan } from '../../helpers/validator.js';

import { Breadcrumbs, Box, Typography, TextField, Button, StyledEngineProvider, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Login.scss';

export default function Login() {

    const [validity, setValidity] = useState({
        email: 'initial',
        password: 'initial'
    });

    const [alert, setAlert] = useState({
        visible: false,
        message: ''
    });

    const { login } = useAuthContext();

    const { popNotification } = useNotificationContext();

    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const email = formdata.get('email');
        const password = formdata.get('password');

        if (Object.values(validity).some(v => v == false)) return;

        if (email.length === 0 || password.length === 0) {
            return setAlert({
                visible: true,
                message: 'All fields are required!'
            });
        }

        authService.login(email, password)
            .then(user => {

                login(user);

                navigate('/', { replace: true });

                popNotification('Logged in Succesfully!', types.success);
            })
            .catch(err => {
                setAlert({
                    visible: true,
                    message: err.message
                })
            })
    }

    const handleFocus = () => setAlert({
        visible: false,
        message: ''
    });

    const handleBlur = (valueType, e) => {

        if (valueType === 'email') {

            const email = e.target.value;

            if (isEmail(email) || email.length == 0) {
                setValidity(prev => { return { ...prev, email: true } })
            } else {
                setValidity(prev => { return { ...prev, email: false } })
            }

        } else if (valueType === 'password') {

            const password = e.target.value;

            if (isLongerThan(password, 8) || password.length === 0) {
                setValidity(prev => { return { ...prev, password: true } })
            } else {
                setValidity(prev => { return { ...prev, password: false } })
            }

        }
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
                        <Alert severity="error" className={alert.visible ? '' : 'hidden'}>{alert.message}</Alert>
                        <Box className='login-form-input-wrapper'>
                            <Box className='login-form-item-wrapper'>
                                <TextField
                                    className="login-form-text-field"
                                    size='small'
                                    label="Email Address"
                                    variant="outlined"
                                    name='email'
                                    error={validity.email ? false : true}
                                    helperText={validity.email ? '' : 'Invalid email'}
                                    onBlur={handleBlur.bind(null, 'email')}
                                    onFocus={handleFocus}
                                />
                            </Box>
                            <Box className='login-form-item-wrapper'>
                                <TextField
                                    type='password'
                                    className="login-form-text-field"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    error={validity.password ? false : true}
                                    helperText={validity.password ? '' : 'Password too short! It should be at least 8 symbols'}
                                    onBlur={handleBlur.bind(null, 'password')}
                                    onFocus={handleFocus}
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