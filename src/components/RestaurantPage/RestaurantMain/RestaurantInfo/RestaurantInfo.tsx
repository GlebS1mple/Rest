import React from 'react'
import LocationAndHours from '../LocationAndHours/LocationAndHours'
import Reviews from '../Reviews/Reviews'

const RestaurantInfo: React.FC = () => {
    return (
        <>
            <LocationAndHours />
            <Reviews />
        </>
    );
};

export default RestaurantInfo;