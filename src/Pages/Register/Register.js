import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService.js';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext.js';

import { isEmail, isLongerThan } from '../../helpers/validator.js';

import { Typography, TextField, Button, Alert } from '../../mui-imports';

import CommonPage from '../CommonPage/CommonPage.js';

import './Register.scss';

export default function Register() {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { login } = useAuthContext();

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

    const { popNotification } = useNotificationContext();

    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const email = formdata.get('email');
        const username = formdata.get('username');

        if (Object.values(validity).some(v => v == false)) return;

        if (email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            return setAlert({
                visible: true,
                message: 'All fields are required!'
            });
        }

        try {

            await authService.register(email, username, password);

            const user = await authService.login(email, password);

            login(user);

            navigate('/', { replace: true });

            popNotification('Registered Succesfully!', types.success);

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

    const handleBlur = (valueType, e) => {

        if (valueType === 'email') {
            const email = e.target.value;

            if (isEmail(email) || email.length === 0) {

                setValidity(prev => { return { ...prev, email: true } });

            } else {

                setValidity(prev => { return { ...prev, email: false } });

            }
        } else if (valueType === 'username') {

            const username = e.target.value;

            if (isLongerThan(username, 3) || username.length === 0) {

                setValidity(prev => { return { ...prev, username: true } });

            } else {

                setValidity(prev => { return { ...prev, username: false } });

            }
        } else if (valueType === 'password') {

            if (isLongerThan(password, 8) || password.length === 0) {

                setValidity(prev => { return { ...prev, password: true } });

            } else {

                setValidity(prev => { return { ...prev, password: false } });

            }

            if (password == confirmPassword || confirmPassword.length === 0) {

                setValidity(prev => { return { ...prev, confirmPassword: true } });

            } else {

                setValidity(prev => { return { ...prev, confirmPassword: false } });

            }

        } else if (valueType === 'confirmPassword') {

            if (password == confirmPassword || confirmPassword.length === 0) {

                setValidity(prev => { return { ...prev, confirmPassword: true } });

            } else {

                setValidity(prev => { return { ...prev, confirmPassword: false } });

            }
        }
    }

    return (
        <CommonPage breadcrumbs={['Home', 'Register']}>
            <Typography variant='h3' component='h1' className='register-header-text'>Register</Typography>
            <div className='register-form-wrapper'>
                <form method="post" className='register-form' onSubmit={registerHandler}>
                    <Alert severity="error" className={alert.visible ? '' : 'hidden'}>{alert.message}</Alert>
                    <div className='register-form-input-wrapper'>
                        <div className='register-form-item-wrapper'>
                            <TextField
                                className="register-form-text-field"
                                size='small'
                                label="Email Address"
                                variant="outlined"
                                name='email'
                                error={validity.email ? false : true}
                                helperText={validity.email ? '' : 'Invalid email'}
                                onBlur={handleBlur.bind(null, 'email')}
                                onFocus={handleFocus}
                            />
                        </div>
                        <div className='register-form-item-wrapper'>
                            <TextField
                                className="register-form-text-field"
                                size='small'
                                label="Username"
                                variant="outlined"
                                name='username'
                                error={validity.username ? false : true}
                                helperText={validity.username ? '' : 'Username too short! It should be at least 3 symbols'}
                                onBlur={handleBlur.bind(null, 'username')}
                                onFocus={handleFocus}
                            />
                        </div>
                        <div className='register-form-item-wrapper'>
                            <div className='register-form-item-wrapper'>
                                <TextField
                                    type='password'
                                    className="register-form-text-field"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    error={validity.password ? false : true}
                                    helperText={validity.password ? '' : 'Password too short! Password should be at least 8 symbols'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={handleBlur.bind(null, 'password')}
                                    onFocus={handleFocus}
                                />
                            </div>
                        </div>
                        <div className='register-form-item-wrapper'>
                            <TextField
                                type='password'
                                className="register-form-text-field"
                                size='small'
                                label="Cofnirm Password"
                                variant="outlined"
                                name='confirmPassword'
                                error={validity.confirmPassword ? false : true}
                                helperText={validity.confirmPassword ? '' : 'Passwords does not match'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleBlur.bind(null, 'confirmPassword')}
                                onFocus={handleFocus}
                            />
                        </div>
                    </div>
                    <div className='register-form-item-wrapper'>
                        <Button variant="contained" size='large' type='submit' component='button' className='register-button'>Register</Button>
                    </div>
                </form>
            </div>
        </CommonPage>
    )
}