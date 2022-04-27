import {
    Box, Grid, Typography
} from '@mui/material';
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
                    <Typography variant='body1'>About Us</Typography>
                    <Typography variant='body1'>Privacy Policy</Typography>
                </Grid>
                <Grid item className='footer-grid-item'>
                    <Typography variant='h5'>My Account</Typography>
                    <Typography variant='body1'>Order History</Typography>
                    <Typography variant='body1'>Wish List</Typography>
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