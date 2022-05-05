import * as React from 'react';
import { 
  Card, CardContent, CardMedia,
  Grid, Divider, Typography
} from '@mui/material';
import image2 from '../../assets/images/home-carousel-3.jpg';
import './VehicleCard.scss';

export default function VehicleCard() {
  return (
    <Card className='vehicle-card-wrapper'>
      <div className='vehicle-card-image-wrapper'>
        <CardMedia
          className='vehicle-card-image'
          component="img"
          height="275"
          image={image2}
          alt="green iguana"
        />
      </div>
      <CardContent className='vehicle-card-content-wrapper'>
        <Grid container className='vehicle-card-make-model-flex'>
          <Grid item className='vehicle-card-make-model-cell'>
            <Typography className='vehicle-card-make' variant="h5">
              Ktm
            </Typography>
          </Grid>
          <Grid item>
            <Typography className='vehicle-card-model' variant="h5">
              Exc 300
            </Typography>
          </Grid>
        </Grid>
        <Divider className='vehicle-card-divider' />
        <Grid container className='vehicle-card-make-model-flex'>
          <Grid item className='vehicle-card-year-milage-cell'>
            <Typography className='vehicle-card-year' variant="h6">
              2020,
            </Typography>
          </Grid>
          <Grid item>
            <Typography className='vehicle-card-milage' variant="h6">
              1000km
            </Typography>
          </Grid>
        </Grid>
        <Typography className='vehicle-card-price' variant="h6">
          $5000.00
        </Typography>
      </CardContent>
    </Card>
  );
}
