import React from 'react';
import s from '../RestaurantMain/RestaurantMain.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { RestaurantType } from '../../../types/types';
import RestaurantGallery from './RestaurantGalerey/RestaurantGalerey';
import LocationAndHours from './LocationAndHours/LocationAndHours';
import Reviews from './Reviews/Reviews';

const RestaurantMain = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div>
            {restaurant.id ?
                <>
                    <RestaurantGallery />
                    <div className={s.container}>
                        <LocationAndHours />
                        <Reviews />
                    </div>
                </>
                : 'Loading'}
        </div>
    );
};

export default RestaurantMain;