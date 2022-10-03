import React from 'react';
import Restaurants from './Restaurants/Restaurants';
import Filters from './Filters/Filters';
import s from '../AboutRestaurants/AboutRestaurants.module.css'

const AboutRestaurants: React.FC = () => {
    return (
        <div className={s.main}>
            <Filters />
            <Restaurants />
        </div>
    );
};

export default AboutRestaurants;