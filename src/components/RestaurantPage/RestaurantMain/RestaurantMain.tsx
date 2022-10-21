import React from 'react';
import s from '../RestaurantMain/RestaurantMain.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { RestaurantType } from '../../../types/types';
import RestaurantGallery from './RestaurantGalerey/RestaurantGalerey';

const RestaurantMain = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div>
            {restaurant ? <RestaurantGallery /> : 'Loading'}
        </div>
    );
};

export default RestaurantMain;