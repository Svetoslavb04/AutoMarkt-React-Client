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
                    <Typography variant='h5' className='footer-grid-item-header-text'>Contact Us</Typography>
                    <Typography variant='body1' className='footer-grid-item-content-text'>Some address in some town in Bulgaria</Typography>
                    <Typography variant='body1' className='footer-grid-item-content-text'>svetoslavb1234@gmail.com</Typography>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5' className='footer-grid-item-header-text'>Information</Typography>
                    <Link to='/about-us' className='navigation-link-element'>
                        <Typography variant='body1' className='footer-grid-item-content-text'>About Us</Typography>
                    </Link>
                    <Typography variant='body1' className='footer-grid-item-content-text'>Privacy Policy</Typography>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5' className='footer-grid-item-header-text'>My Account</Typography>
                    <Link to='/order-history' className='navigation-link-element'>
                        <Typography variant='body1' className='footer-grid-item-content-text'>Order History</Typography>
                    </Link>
                    <Link to='/wish-list' className='navigation-link-element'>
                        <Typography variant='body1' className='footer-grid-item-content-text'>Wish List</Typography>
                    </Link>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5' className='footer-grid-item-header-text'>Features</Typography>
                    <Typography variant='body1' className='footer-grid-item-content-text'>Buy Safely</Typography>
                    <Typography variant='body1' className='footer-grid-item-content-text'>Sell Safely</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}