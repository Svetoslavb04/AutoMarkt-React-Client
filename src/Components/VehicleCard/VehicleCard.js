import { 
  Card, CardContent, CardMedia,
  Grid, Divider, Typography
} from '@mui/material';

import image2 from '../../assets/images/home-carousel-3.jpg';

import './VehicleCard.scss';

export default function VehicleCard(props) {
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
              {props.make}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className='vehicle-card-model' variant="h5">
            {props.model}
            </Typography>
          </Grid>
        </Grid>
        <Divider className='vehicle-card-divider' />
        <Grid container className='vehicle-card-make-model-flex'>
          <Grid item className='vehicle-card-year-milage-cell'>
            <Typography className='vehicle-card-year' variant="h6">
              {props.year},
            </Typography>
          </Grid>
          <Grid item>
            <Typography className='vehicle-card-milage' variant="h6">
              {props.mileage}km
            </Typography>
          </Grid>
        </Grid>
        <Typography className='vehicle-card-price' variant="h6">
          €{props.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
