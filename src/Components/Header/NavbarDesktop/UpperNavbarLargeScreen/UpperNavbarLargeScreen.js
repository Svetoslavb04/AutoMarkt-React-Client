import {
  Grid, Container, Typography, Button, AppBar, Box, StyledEngineProvider
} from '@mui/material';
import Searchbar from '../../Searchbar/Searchbar.js';
import './UpperNavbarLargeScreen.scss';
import { Link } from "react-router-dom";

export default function UpperHeaderSearchBar() {

  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="xl">
        <Box>
          <AppBar className='header-upper-app-bar' color='white' elevation={0}>
            <Grid
              container
              className='header-upper-app-bar-grid'
            >
              <Grid item xs={3}>
                <Link to="/" className='navigation-link-element'>
                  <Typography variant="h3" component="h1" align='center' fontFamily={'Lora'} fontWeight={800}>
                    AutoMarkt
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={6} className='header-upper-searchbar-cell'>
                <Searchbar color='primary' className='header-upper-searchbar' />
              </Grid>
              <Grid item xs={3} className='header-upper-buttons-cell'>
                <Link to="/logout" className='navigation-link-element'>
                  <Button variant="contained" component='button' className='header-upper-buttons' >
                    Logout
                  </Button>
                </Link>
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
              </Grid>
            </Grid>
          </AppBar>
        </Box>
      </Container >
    </StyledEngineProvider>
  );
}