import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import {
    Box, Button,
    Grid, Typography
} from '@mui/material';
import VehicleCard from '../../Components/VehicleCard/VehicleCard';

import image1 from '../../assets/images/home-carousel-1.jpg';
import image2 from '../../assets/images/home-carousel-2.jpg';
import image3 from '../../assets/images/home-carousel-3.jpg';

import './Home.scss';

export default function Home() {
    return (
        <>
            <Box className="home-carousel-wrapper">
                <Link to='/catalog' className='navigation-link-element'>
                    <Button className='home-carousel-button' variant="contained">Shop Now</Button>
                </Link>
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    modules={[Autoplay]}
                    className="home-carousel"
                >
                    <SwiperSlide><img src={image1} alt="carousel content 1" loading="lazy" /></SwiperSlide>
                    <SwiperSlide><img src={image2} alt="carousel content 2" loading="lazy" /></SwiperSlide>
                    <SwiperSlide><img src={image3} alt="carousel content 3" loading="lazy" /></SwiperSlide>
                </Swiper>
            </Box>
            <Grid container className='home-services-grid'>
                <Grid item xs={12} sm={4} md={2} className='home-services-grid-item'>
                    <Button className='home-services-grid-item-content' variant="outlined" disableRipple>Sell for Free</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={2} className='home-services-grid-item'>
                    <Button className='home-services-grid-item-content' variant="outlined" disableRipple>Cash on delivery</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={2} className='home-services-grid-item'>
                    <Button className='home-services-grid-item-content' variant="outlined" disableRipple>Vehicle history</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={2} className='home-services-grid-item'>
                    <Button className='home-services-grid-item-content' variant="outlined" disableRipple>Clear records</Button>
                </Grid>
            </Grid>
            <Box className="home-latest-posts-wrapper">
                <Box className="home-latest-posts-heading">
                    <Typography variant="h4" component='h2'>Latest Posts</Typography>
                    <div className="home-divider"></div>
                </Box>
                <Grid container className="home-latest-posts-cards">
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                    <Grid item>
                        <VehicleCard>Beta rr</VehicleCard>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}