import { useState } from 'react';
import * as authService from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.js';
import { Breadcrumbs, Box, Typography, TextField, Button, StyledEngineProvider, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import './Register.scss';

export default function Register() {

    const { login } = useAuthContext();

    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [validity, setValidity] = useState({
        email: 'initial',
        username: 'initial',
        password: 'initial',
        confirmPassword: 'initial'
    });

    const [alert, setAlert] = useState({
        visible: false,
        message: ''
    });

    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        if (Object.values(validity).some(v => v == false)) return;

        if (values.email.length === 0 || values.username.length === 0 || values.password.length === 0 || values.confirmPassword.length === 0) {
            return setAlert({
                visible: true,
                message: 'All fields are required!'
            });
        }

        try {

            await authService.register(values.email, values.username, values.password);

            const user = await authService.login(values.email, values.password);

            login(user);

            navigate('/', { replace: true });

        } catch (err) {

            setAlert({
                visible: true,
                message: err.message
            })
            
        }
}

const handleFocus = () => setAlert({
    visible: false,
    message: ''
});

const handleChange = (valueType, e) => {
    switch (valueType) {
        case 'email':
            setValues(prev => { return { ...prev, email: e.target.value } })
            break;
        case 'username':
            setValues(prev => { return { ...prev, username: e.target.value } })
            break;
        case 'password':
            setValues(prev => { return { ...prev, password: e.target.value } })
            break;
        case 'confirmPassword':
            setValues(prev => { return { ...prev, confirmPassword: e.target.value } })
            break;
        default:
            break;
    }
}

const handleBlur = (valueType, e) => {

    if (valueType === 'email') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email) || values.email.length === 0) {

            setValidity(prev => { return { ...prev, email: true } });

        } else {

            setValidity(prev => { return { ...prev, email: false } });

        }
    } else if (valueType === 'username') {

        if (values.username.length >= 3 || values.username.length === 0) {

            setValidity(prev => { return { ...prev, username: true } });

        } else {

            setValidity(prev => { return { ...prev, username: false } });

        }
    } else if (valueType === 'password') {

        if (values.password.length >= 8 || values.password.length === 0) {

            setValidity(prev => { return { ...prev, password: true } });

        } else {

            setValidity(prev => { return { ...prev, password: false } });

        }
    } else if (valueType === 'confirmPassword') {

        if (values.password == values.confirmPassword || values.confirmPassword.length === 0) {

            setValidity(prev => { return { ...prev, confirmPassword: true } });

        } else {

            setValidity(prev => { return { ...prev, confirmPassword: false } });

        }
    }
}

return (
    <StyledEngineProvider injectFirst>
        <Box className='register-wrapper'>
            <Box className='breadcrumbs-wrapper'>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link to="/" className='navigation-link-element breadcrumb-item'>
                        Home
                    </Link>
                    <Link to="/register" className='navigation-link-element breadcrumb-item breadcrumb-item-last'>
                        Register
                    </Link>
                </Breadcrumbs>
            </Box>
            <Typography variant='h3' component='h1' className='register-header-text'>Register</Typography>
            <div className='register-form-wrapper'>
                <form method="post" className='register-form' onSubmit={registerHandler}>
                    <Alert severity="error" className={alert.visible ? '' : 'hidden'}>{alert.message}</Alert>
                    <Box className='register-form-input-wrapper'>
                        <Box className='register-form-item-wrapper'>
                            <TextField
                                className="register-form-text-field"
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
                        <Box className='register-form-item-wrapper'>
                            <TextField
                                className="register-form-text-field"
                                size='small'
                                label="Username"
                                variant="outlined"
                                name='password'
                                value={values.username}
                                error={validity.username ? false : true}
                                helperText={validity.username ? '' : 'Username too short! It should be at least 3 symbols'}
                                onChange={handleChange.bind(null, 'username')}
                                onBlur={handleBlur.bind(null, 'username')}
                                onFocus={handleFocus}
                            />
                        </Box>
                        <Box className='register-form-item-wrapper'>
                            <Box className='login-form-item-wrapper'>
                                <TextField
                                    type='password'
                                    className="register-form-text-field"
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
                        <Box className='register-form-item-wrapper'>
                            <TextField
                                type='password'
                                className="register-form-text-field"
                                size='small'
                                label="Cofnirm Password"
                                variant="outlined"
                                name='confirmPassword'
                                value={values.confirmPassword}
                                error={validity.confirmPassword ? false : true}
                                helperText={validity.confirmPassword ? '' : 'Passwords does not match'}
                                onChange={handleChange.bind(null, 'confirmPassword')}
                                onBlur={handleBlur.bind(null, 'confirmPassword')}
                                onFocus={handleFocus}
                            />
                        </Box>
                    </Box>
                    <Box className='register-form-item-wrapper'>
                        <Button variant="contained" size='large' type='submit' component='button' className='register-button'>Register</Button>
                    </Box>
                </form>
            </div>
        </Box>
    </StyledEngineProvider>
)
}