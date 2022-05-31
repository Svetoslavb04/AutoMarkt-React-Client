import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from '../../../../contexts/AuthContext.js';

import {
  Grid, Container, Typography, Button, AppBar
} from '../../../../mui-imports.js';

import Searchbar from '../../Searchbar/Searchbar.js';

import './UpperNavbarLargeScreen.scss';

export default function UpperHeaderSearchBar() {

  const navigate = useNavigate();
  
  const { user } = useAuthContext();

  const handleSubmitSearch = (value) => navigate(`/catalog?search=${value}`, { replace: true });
  
  return (
    <Container className='header-upper-container'>
      <div>
        <AppBar className='header-upper-app-bar' color='white' elevation={0}>
          <Grid
            container
            className='header-upper-app-bar-grid'
          >
            <Grid item xs={3}>
              <Link to="/" className='navigation-link-element logo-wrapper header-upper-logo-wrapper'>
                <Typography className='logo-dashes' variant="h3" component="h1" fontFamily={'Montserrat'} color='primary.main'>
                    {'//'}
                </Typography>
                <Typography className='logo-text' variant="h3" component="h1" fontFamily={'Montserrat'}>
                  AutoMarkt
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} className='header-upper-searchbar-cell'>
              <Searchbar color='primary' className='header-upper-searchbar' onSubmit={handleSubmitSearch}/>
            </Grid>
            <Grid item xs={3} className='header-upper-buttons-cell'>
              {
                user.isAuthenticated
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
      </div>
    </Container >
  );
}