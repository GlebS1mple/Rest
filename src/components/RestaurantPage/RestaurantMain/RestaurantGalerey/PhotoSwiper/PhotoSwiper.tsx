import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../redux/store'
import SwiperRestaurantSlide from './SwiperSlide/SwiperSlide'
import s from '../PhotoSwiper/PhotoSwiper.module.css'
import arrow from '../../../../../img/arrow.png'

const PhotoSwiper = () => {
    const photos = useSelector<AppStateType, Array<string>>(state => state.restaurant.restaurant.photos)
    return (
        <Swiper
            className={s.photo__swiper}
            modules={[Navigation]}
            navigation={{
                nextEl: '#next',
                prevEl: '#prev',
            }}
            spaceBetween={0}
            slidesPerView={2.2}
            slideToClickedSlide={false}
        >
            <div className={s.swiper}>
                {photos && photos.map((photo, index) =>
                    <SwiperSlide key={index} className="swiper-slide popup__slide">
                        <SwiperRestaurantSlide photo={photo} />
                    </SwiperSlide>
                )}
            </div>
            <div id='prev'>
                <img className={s.prev} src={arrow} alt="Предыдущая страница" />
            </div>
            <div id='next'>
                <img className={s.next} src={arrow} alt="Следующая страница" />
            </div>
        </Swiper>
    );
};

export default PhotoSwiper;