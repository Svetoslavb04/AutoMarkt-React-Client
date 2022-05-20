import { useState, useEffect } from "react";

import { getLatestVehicles } from "../../services/vehicleService";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

import { Button, Grid, Typography } from '../../mui-imports';

import VehicleCard from '../../Components/VehicleCard/VehicleCard';

import image1 from '../../assets/images/home-carousel-1.jpg';
import image2 from '../../assets/images/home-carousel-2.jpg';
import image3 from '../../assets/images/home-carousel-3.jpg';

import CommonPage from "../CommonPage/CommonPage";

import './Home.scss';

export default function Home() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {

        const vehiclesCount = window.innerWidth <= 1440 && window.innerWidth >= 980 ? 2 : 3;

        getLatestVehicles(vehiclesCount)
            .then(vehicles => setVehicles(vehicles))
            .catch(err => setVehicles([]));

    }, []);

    return (
        <CommonPage breadcrumbs={[]}>
            <div className="home-wrapper">
                <div className="home-carousel-wrapper">
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
                </div>
                <div className='home-services'>
                    <div className='home-services-item'>
                        <Button className='home-services-item-content' variant="outlined" disableRipple>Sell for free</Button>
                    </div>
                    <div className='home-services-item'>
                        <Button className='home-services-item-content' variant="outlined" disableRipple>Find your vehicle</Button>
                    </div>
                    <div className='home-services-item'>
                        <Button className='home-services-item-content' variant="outlined" disableRipple>Clear records</Button>
                    </div>
                    <div className='home-services-item'>
                        <Button className='home-services-item-content' variant="outlined" disableRipple>Support 24/7</Button>
                    </div>
                </div>
                <div className="home-latest-posts-wrapper">
                    <div className="home-latest-posts-heading">
                        <Typography variant="h4" component='h2'>Latest Posts</Typography>
                        <div className="home-divider"></div>
                    </div>
                    <div className="home-latest-posts-cards">
                        {
                            vehicles.length > 0
                                ? vehicles.map(vehicle =>
                                    <Link key={vehicle._id} to={`/catalog/${vehicle._id}`} className="navigation-link-element">
                                        <VehicleCard
                                            make={vehicle.make}
                                            model={vehicle.model}
                                            year={vehicle.year}
                                            mileage={vehicle.mileage}
                                            price={vehicle.price}
                                            imageUrl={vehicle.imageUrl}
                                            buttons={false}
                                        />
                                    </Link>
                                )
                                : <Typography variant="h4">There are no vehicles available</Typography>
                        }
                    </div>
                </div>
            </div>
        </CommonPage>
    );
}