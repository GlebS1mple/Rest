import React from 'react'
import LocationAndHours from '../LocationAndHours/LocationAndHours'
import Reviews from '../Reviews/Reviews'
import s from '../RestaurantInfo/RestaurantInfo.module.css'

const RestaurantInfo: React.FC = () => {
    return (
        <div className={s.main}>
            <LocationAndHours />
            <Reviews />
        </div>
    );
};

export default RestaurantInfo;