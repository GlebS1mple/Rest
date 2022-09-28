import React from 'react';
import s from '../Restaurants/Restaurants.module.css'
import Restaurant from './Restaurant/Restaurant';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { RestaurantsType } from '../../../../types/types';

const Restaurants: React.FC = () => {
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const filteredRestaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.filteredRestaurants)
    return (
        <div className={s.main}>
            <h1 className={s.heading}>The Best 10 Restaurants in San Francisco, California</h1>
            {filteredRestaurants.length > 0 ? filteredRestaurants.map(rest => <Restaurant key={rest.id} rest={rest} />) :
                restaurants.length > 0 ? restaurants.map(rest => <Restaurant key={rest.id} rest={rest} />) : 'Loading...'}
        </div>
    );
};

export default Restaurants;