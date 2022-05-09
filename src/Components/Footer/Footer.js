import { Link } from 'react-router-dom'

import {
    Box, Grid, Typography
} from '../../mui-imports.js';

import './Footer.scss';

export default function Footer() {
    return (
        <Box component='footer' className="site-footer">
            <Grid container className='footer-grid'>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5'>Contact Us</Typography>
                    <Typography variant='body1'>Some fake address, Beetle, USA</Typography>
                    <Typography variant='body1'>SomeEmail@gmail.com</Typography>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5'>Information</Typography>
                    <Link to='/about-us' className='navigation-link-element'>
                        <Typography variant='body1'>About Us</Typography>
                    </Link>
                    <Link to='/privacy-policy' className='navigation-link-element'>
                        <Typography variant='body1'>Privacy Policy</Typography>
                    </Link>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5'>My Account</Typography>
                    <Link to='/order-history' className='navigation-link-element'>
                        <Typography variant='body1'>Order History</Typography>
                    </Link>
                    <Link to='/wish-list' className='navigation-link-element'>
                        <Typography variant='body1'>Wish List</Typography>
                    </Link>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5'>Features</Typography>
                    <Typography variant='body1'>Buy Safely</Typography>
                    <Typography variant='body1'>Sell Safely</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}