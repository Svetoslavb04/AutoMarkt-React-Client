import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import {
    StyledEngineProvider, Box
} from '@mui/material';
import image1 from './carousel-1-min.jpg';
import image2 from './carousel-2-min.jpg';
import image3 from './carousel-3-min.jpg';
import './Home.scss';

export default function Home() {
    return (
        <StyledEngineProvider injectFirst={true}>
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
        </StyledEngineProvider>
    );
}