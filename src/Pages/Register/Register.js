import * as React from 'react';
import { Breadcrumbs, Box, Typography, TextField, Button, StyledEngineProvider } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import './Register.scss';

export default function Register() {
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
                    <form method="post" className='register-form'>
                        <Box className='register-form-input-wrapper'>
                            <Box className='register-form-item-wrapper'>
                                <TextField
                                    className="register-form-text-field"
                                    size='small'
                                    label="Email Address"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Box>
                            <Box className='register-form-item-wrapper'>
                                <TextField
                                    className="register-form-text-field"
                                    size='small'
                                    label="Username"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Box>
                            <Box className='register-form-item-wrapper'>
                                <TextField
                                    className="register-form-text-field"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        type: 'password',
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Box>
                            <Box className='register-form-item-wrapper'>
                                <TextField
                                    className="register-form-text-field"
                                    size='small'
                                    label="Cofnirm Password"
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        type: 'password',
                                        style: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
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