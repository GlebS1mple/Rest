import React from 'react';
import Map from './Map/Map';
import s from '../Main/Main.module.css'
import AboutRestaurants from './AboutRestaurants/AboutRestaurants';
import { useEffect } from 'react';
import { actions, getRestaurantsThunk, searchRestaurantsThunk } from '../../redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { SortType } from '../../types/types';
import { getRestaurantReviewsThunk } from '../../redux/restaurantReducer';


const Main: React.FC = () => {
    const priceLevel = useSelector<AppStateType, string>(state => state.main.priceLevel)
    const isClosed = useSelector<AppStateType, boolean | null>(state => state.main.isClosed)
    const location = useSelector<AppStateType, string>(state => state.main.location)
    const term = useSelector<AppStateType, string>(state => state.main.term)
    const sortBy = useSelector<AppStateType, SortType>(state => state.main.sortBy)
    let dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(getRestaurantsThunk())
    }, [])
    useEffect(() => {
        //@ts-ignore
        dispatch((searchRestaurantsThunk(term, location, priceLevel, isClosed, sortBy)))
    }, [term, location, priceLevel, isClosed, sortBy])
    return (
        <div className={s.main}>
            <AboutRestaurants />
            <div className={s.sticky}>
                <Map />
            </div>
        </div>
    );
};

export default Main;