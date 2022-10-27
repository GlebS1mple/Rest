import React from 'react'
import s from '../SwiperSlide/SwiperSlide.module.css'

type PropsType = {
    photo: string
}

const SwiperRestaurantSlide: React.FC<PropsType> = ({ photo }) => {
    return (
        <picture><source srcSet={photo} type="image/webp" /><img src={photo} alt="Restaurant" className={s.image} /></picture>
    );
};

export default SwiperRestaurantSlide;