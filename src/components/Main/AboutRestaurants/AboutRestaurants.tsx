import React from 'react';
import Restaurants from './Restaurants/Restaurants';
import Filters from './Filters/Filters';
import s from '../AboutRestaurants/AboutRestaurants.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';

const AboutRestaurants: React.FC = () => {
    const isList = useSelector<AppStateType, boolean>(state => state.main.isList)
    return (
        <div className={isList ? `${s.main}` : `${s.mainActive}`}>
            <Filters />
            <Restaurants />
        </div>
    );
};

export default AboutRestaurants;