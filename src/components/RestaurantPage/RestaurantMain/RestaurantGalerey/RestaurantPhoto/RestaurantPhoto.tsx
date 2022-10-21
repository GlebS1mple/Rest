import React from 'react';
import s from '../RestaurantPhoto/RestaurantPhoto.module.css'
type PropsType = {
    img: string
}
const RestaurantPhoto: React.FC<PropsType> = ({ img }) => {
    return (
        <img src={img} alt="restaurant's photo" className={s.img} />
    );
};

export default RestaurantPhoto;