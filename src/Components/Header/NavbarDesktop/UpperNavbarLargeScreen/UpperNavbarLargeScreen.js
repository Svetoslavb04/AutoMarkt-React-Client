import {
  Grid, Container, Typography, Button, AppBar, Box
} from '@mui/material';
import Searchbar from '../../Searchbar/Searchbar.js';
import './UpperNavbarLargeScreen.scss';
import { Link } from "react-router-dom";
import { useAuthContext } from '../../../../contexts/AuthContext.js';

export default function UpperHeaderSearchBar() {

  const { user } = useAuthContext();

  return (
    <Container maxWidth="xl">
      <Box>
        <AppBar className='header-upper-app-bar' color='white' elevation={0}>
          <Grid
            container
            className='header-upper-app-bar-grid'
          >
            <Grid item xs={3}>
              <Link to="/" className='navigation-link-element logo-wrapper header-upper-logo-wrapper'>
                <Typography className='logo-dashes' variant="h3" component="h1" fontFamily={'Montserrat'} color='primary.main'>
                    //
                </Typography>
                <Typography className='logo-text' variant="h3" component="h1" fontFamily={'Montserrat'}>
                  AutoMarkt
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} className='header-upper-searchbar-cell'>
              <Searchbar color='primary' className='header-upper-searchbar' />
            </Grid>
            <Grid item xs={3} className='header-upper-buttons-cell'>
              {
                user.xToken
                  ? (
                    <Link to="/logout" className='navigation-link-element'>
                      <Button variant="contained" component='button' className='header-upper-buttons' >
                        Logout
                      </Button>
                    </Link>
                  )
                  : (
                    <>
                      <Link to="/login" className='navigation-link-element'>
                        <Button variant="contained" component='button' className='header-upper-buttons' >
                          Login
                        </Button>
                      </Link>
                      <Link to="/register" className='navigation-link-element'>
                        <Button variant="contained" component='button' className='header-upper-buttons' >
                          Register
                        </Button>
                      </Link>
                    </>
                  )
              }
            </Grid>
          </Grid>
        </AppBar>
      </Box>
    </Container >
  );
}