import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { RestaurantType } from '../../../../types/types';
import RestaurantPhoto from './RestaurantPhoto/RestaurantPhoto';
import s from '../RestaurantGalerey/RestaurantGalerey.module.css'

const RestaurantGallery = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div className={s.main} >
            {restaurant.photos ? restaurant.photos.map(photo => <RestaurantPhoto img={photo} />) : 'Loading'}
        </div>
    );
};

export default RestaurantGallery;