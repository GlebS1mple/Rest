import React from 'react';
import Map from './Map/Map';
import s from '../Main/Main.module.css'
import AboutRestaurants from './AboutRestaurants/AboutRestaurants';
import { useEffect } from 'react';
import { getRestaurantsThunk } from '../../redux/mainReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resturantsAPI } from './../../api/api';


const Main = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(getRestaurantsThunk())
    }, [])
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