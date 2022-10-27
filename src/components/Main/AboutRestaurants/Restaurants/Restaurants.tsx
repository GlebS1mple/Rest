import React from 'react';
import s from '../Restaurants/Restaurants.module.css'
import Restaurant from './Restaurant/Restaurant';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { RestaurantsType } from '../../../../types/types';
import SortPopUp from './SortPopUp/SortPopUp';
import MyLoader from './RestaurantLoader/RestaurantLoader';

const Restaurants: React.FC = () => {
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const location = useSelector<AppStateType, string>(state => state.main.location)
    const isFetching = useSelector<AppStateType, boolean>(state => state.main.isFetching)
    let newLoader = [];
    for (let i = 1; i <= 10; i++) {
        newLoader.push(i);
    }
    return (
        <div className={s.main}>
            <div className={s.opening}>
                <h1 className={s.heading}>The Best 10 Restaurants in {location}</h1>
                <SortPopUp />
            </div>
            {isFetching ? newLoader.map(n => <MyLoader key={n} />) : restaurants.map(rest => <Restaurant key={rest.id} rest={rest} />)}
        </div>
    );
};

export default Restaurants;