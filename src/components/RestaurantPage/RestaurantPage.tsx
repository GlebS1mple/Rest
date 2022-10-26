import React from 'react'
import Header from '../Header/Header'
import RestaurantMain from './RestaurantMain/RestaurantMain'
import { useSelector } from 'react-redux'
import { RestaurantType } from '../../types/types'
import { AppStateType } from '../../redux/store'
import { useNavigate } from 'react-router-dom';

const RestaurantPage = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    /*     const navigate = useNavigate();
        React.useEffect(() => {
            if (!restaurant.name) {
                navigate('/main');
            }
        }, [restaurant]); */
    return (
        <>
            <Header />
            <RestaurantMain />
        </>
    );
};

export default RestaurantPage;