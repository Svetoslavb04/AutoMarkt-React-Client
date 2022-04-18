import {
  Grid, Container, Typography, Button, AppBar, Box
} from '@mui/material';
import Searchbar from '../Searchbar/Searchbar.js'

export default function UpperHeaderSearchBar() {

  return (
    <Container maxWidth="xl">
      <Box>
        <AppBar position='relative' color='white' elevation={0} sx={{ py: '20px'}} >
          <Grid
            container
            spacing={0}
            justifyContent='center'
            direction='row'
            alignItems='center'
          >
            <Grid item xs={3}>
              <Typography variant="h3" component="h1" align='center'>
                eLaden
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center'}}>
              <Searchbar />
            </Grid>
            <Grid item xs={3} display="flex" sx={{justifyContent: 'end'}}>
              <Button variant="contained" href="#contained-buttons" sx={{ fontSize: '1.1rem', mx: '20px' }} >
                Login
              </Button>
              <Button variant="contained" href="#contained-buttons" sx={{ fontSize: '1.1rem', mr: '2vw' }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Box>
    </Container >
  );
}