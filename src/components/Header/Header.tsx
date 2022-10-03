import React, { useState } from 'react';
import s from './Header.module.css'
import logo from '../../../src/img/Logo.png'
import searchPhoto from '../../..//src/img/search.png'
import { useDispatch } from 'react-redux';
import { actions, searchRestaurantsThunk } from './../../redux/mainReducer';
import { useEffect } from 'react';
import useDebounce from './../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { RestaurantsType } from '../../types/types';

const Header: React.FC = () => {
    const [location, setLocation] = useState<string>('NewYork')
    const [restaurant, setRestaurant] = useState<string>('restaurants')
    const dispatch = useDispatch()
    const debouncedSearchTerm = useDebounce(location, 500);
    const debouncedSearchRestaurant = useDebounce(restaurant, 500);
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const search = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()


        //@ts-ignore
        dispatch(searchRestaurantsThunk(restaurant, location))
        /*         if (restaurants.length > 0 && restaurant) {
                    let searchedRestaurants = restaurants.filter((rest) => {
                        return rest.name.toLowerCase().includes(restaurant.toLowerCase());
                    }, []);
                    //@ts-ignore
                    dispatch(actions.setFilteredRestaurantsAC(searchedRestaurants));
                } */

    }
    /*     useEffect(
            () => {
                //@ts-ignore
                dispatch(searchRestaurantsThunk('restaurants', location))
            },
            [debouncedSearchTerm]
        );
    
        useEffect(
            () => {
                if (restaurants.length > 0) {
                    let searchedRestaurants = restaurants.filter((rest) => {
                        return rest.name.toLowerCase().includes(restaurant.toLowerCase());
                    }, []);
                    dispatch(actions.setFilteredRestaurantsAC(searchedRestaurants));
                } */
    /*             //@ts-ignore
                dispatch(searchRestaurantsThunk('restaurants', location)) */
    /*         },
            [debouncedSearchRestaurant]
        ); */
    return (
        <div className={s.main}>
            <div className={s.container}>
                <div className={s.logoBlock}>
                    <img src={logo} alt="Logo" className={s.logo} />
                    <div className={s.name}>Rest</div>
                </div>
                <div className={s.search}>
                    <form className={s.form}>
                        <div className={s.inputs}>
                            <input onChange={(e) => setRestaurant(e.target.value)} type="text" placeholder='Restaurants' className={`${s.searchInput} ${s.serchInputRestaurants}`} />
                            <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder='New York' className={s.searchInput} />
                        </div>
                        <button onClick={search} className={s.searchButton}>
                            <img src={searchPhoto} alt="Search" className={s.searchImg} />
                        </button>
                    </form>

                </div>
                <button className={s.link}>For business</button>
                <button className={s.link}>Write some review</button>
            </div>
        </div>
    );
};

export default Header;



