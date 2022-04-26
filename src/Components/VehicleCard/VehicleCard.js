import * as React from 'react';
import {
  CardActionArea, Card, CardContent, CardMedia,
  Grid, Button, Typography
} from '@mui/material';
import image2 from '../../Pages/Home/carousel-3-min.jpg';
import './VehicleCard.scss';

export default function VehicleCard() {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="275"
          image={image2}
          alt="green iguana"
        />
        <CardContent className='vehichle-card-content-wrapper'>
          <Typography className='vehichle-card-make' variant="h5">
            Ktm
          </Typography>
          <Typography className='vehichle-card-model' variant="h6">
            Exc 300
          </Typography>
          <Typography className='vehichle-card-price' variant="h6">
            $5000.00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
