import { useState } from 'react';
import * as authService from '../../services/authService.js';
import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Box, Typography, TextField, Button, StyledEngineProvider, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import './Login.scss';

export default function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [validity, setValidity] = useState({
        email: 'initial',
        password: 'initial'
    });

    const [alert, setAlert] = useState({
        visible: false,
        message: ''
    });

    const { login } = useAuthContext();
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();

        if (Object.values(validity).some(v => v == false)) return;

        if (values.email.length === 0 || values.password.length === 0) {
            return setAlert({
                visible: true,
                message: 'All fields are required!'
            });
        }

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');

        authService.login(email, password)
            .then(user => {
                login(user);
                navigate('/', { replace: true });
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

    const handleChange = (valueType, e) =>
        valueType === 'email'
            ? setValues(prev => { return { ...prev, email: e.target.value } })
            : valueType === 'password' ? setValues(prev => { return { ...prev, password: e.target.value } }) : ''


    const handleBlur = (valueType, e) => {

        if (valueType === 'email') {
            setValues(prev => { return { ...prev, email: e.target.value } });

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email) || values.email.length === 0) {
                setValidity(prev => { return { ...prev, email: true } })
            } else {
                setValidity(prev => { return { ...prev, email: false } })
            }
        } else if (valueType === 'password') {
            setValues(prev => { return { ...prev, password: e.target.value } });

            if (values.password.length >= 8 || values.password.length === 0) {
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
                                    value={values.email}
                                    error={validity.email ? false : true}
                                    helperText={validity.email ? '' : 'Invalid email'}
                                    onChange={handleChange.bind(null, 'email')}
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
                                    value={values.password}
                                    error={validity.password ? false : true}
                                    helperText={validity.password ? '' : 'Password too short! Password should be at least 8 symbols'}
                                    onChange={handleChange.bind(null, 'password')}
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