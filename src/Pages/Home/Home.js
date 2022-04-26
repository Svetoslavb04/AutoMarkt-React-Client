import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import {
    StyledEngineProvider, Box, Button,
    Grid
} from '@mui/material';
import image1 from './carousel-1-min.jpg';
import image2 from './carousel-2-min.jpg';
import image3 from './carousel-3-min.jpg';
import './Home.scss';

export default function Home() {
    return (
        <StyledEngineProvider injectFirst={true}>
            <Box className="home-carousel-wrapper">
                <Button className='home-carousel-button' variant="contained">Shop Now</Button>
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
                    <SwiperSlide><img src={image1} alt="Image 1" /></SwiperSlide>
                    <SwiperSlide><img src={image2} alt="Image 2" /></SwiperSlide>
                    <SwiperSlide><img src={image3} alt="Image 3" /></SwiperSlide>
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
        </StyledEngineProvider>
    );
}