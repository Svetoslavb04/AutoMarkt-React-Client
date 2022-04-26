import {
  Grid, Container, Typography, Button, AppBar, Box, StyledEngineProvider
} from '@mui/material';
import Searchbar from '../../Searchbar/Searchbar.js';
import './UpperNavbarLargeScreen.scss';

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
                <Typography variant="h3" component="h1" align='center' fontFamily={'Lora'} fontWeight={800}>
                  eLaden
                </Typography>
              </Grid>
              <Grid item xs={6} className='header-upper-searchbar-cell'>
                <Searchbar color='primary' className='header-upper-searchbar' />
              </Grid>
              <Grid item xs={3} className='header-upper-buttons-cell'>
                <Button variant="contained" href="#contained-buttons" className='header-upper-buttons' >
                  Logout
                </Button>
                <Button variant="contained" href="#contained-buttons" className='header-upper-buttons' >
                  Login
                </Button>
                <Button variant="contained" href="#contained-buttons" className='header-upper-buttons' >
                  Register
                </Button>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
      </Container >
    </StyledEngineProvider>
  );
}