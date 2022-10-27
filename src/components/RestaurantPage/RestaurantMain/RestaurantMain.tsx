import React from 'react'
import s from '../RestaurantMain/RestaurantMain.module.css'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/store'
import { RestaurantType } from '../../../types/types'
import RestaurantGallery from './RestaurantGalerey/RestaurantGalerey'
import RestaurantInfo from './RestaurantInfo/RestaurantInfo'
import RestaurantCard from './RestaurantCard/RestaurantCard'

const RestaurantMain: React.FC = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div>
            {restaurant.id ?
                <>
                    <RestaurantGallery />
                    <div className={s.container}>
                        <RestaurantInfo />
                        <RestaurantCard />
                    </div>
                </>
                : 'Loading'}
        </div>
    );
};

export default RestaurantMain;