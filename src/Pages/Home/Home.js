import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import image1 from './carousel-1.jpg';
import image2 from './carousel-2.jpg';
import image3 from './carousel-3.jpg';
import './Home.scss';

export default function Home() {
    return (
        <>
            <Splide
                className='carousel'
                aria-label="Home Carousel Images"
                options={
                    {
                        type: 'loop',
                        gap: 0,
                        arrows: false
                    }
                }
            >
                <SplideSlide>
                    <img src={image1} alt="Image 1" />
                </SplideSlide>
                <SplideSlide>
                    <img src={image2} alt="Image 2" />
                </SplideSlide>
                <SplideSlide>
                    <img src={image3} alt="Image 3" />
                </SplideSlide>
            </Splide>
        </>
    );
}