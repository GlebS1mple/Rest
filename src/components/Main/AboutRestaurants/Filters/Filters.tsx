import React, { MouseEvent, useEffect } from 'react';
import s from '../Filters/Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../../../../redux/mainReducer';
import { AppStateType } from '../../../../redux/store';
import { PriceLevelType, RestaurantsType } from '../../../../types/types';



const Filters = () => {
    const priceLevel = useSelector<AppStateType, PriceLevelType | ''>(state => state.main.priceLevel)
    const isClosed = useSelector<AppStateType, boolean>(state => state.main.isClosed)
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const filteredRestaurnts = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.filteredRestaurants)
    const dispatch = useDispatch<Dispatch>()
    const changeHandler: (isClosed: boolean) => void = (isClosed) => {
        dispatch(actions.isClosedAC(isClosed))
    }
    const clickHandler: (e: any) => void = (e) => {
        let button = e.target.closest('button')
        if (!button) return
        dispatch(actions.setPriceLevelAC(button.textContent))
    }
    useEffect(() => {
        if (filteredRestaurnts.length > 0) {
            const newRestaurants = filteredRestaurnts
            let filteredRestaurants = restaurants.filter(rest => rest.price === priceLevel)
            filteredRestaurants = newRestaurants.filter(rest => rest.is_closed === isClosed)
            dispatch(actions.setFilteredRestaurantsAC(filteredRestaurants))
        }
        let filteredRestaurants = restaurants.filter(rest => rest.price === priceLevel)
        /* if (filteredRestaurants.length === 0) {
            alert('Sorry, we dont have such restaurants') TO DO
        } */
        dispatch(actions.setFilteredRestaurantsAC(filteredRestaurants))
    }, [priceLevel])
    useEffect(() => {
        if (filteredRestaurnts.length > 0) {
            const newRestaurants = filteredRestaurnts
            let filteredRestaurants = newRestaurants.filter(rest => rest.is_closed === isClosed)
            filteredRestaurants = restaurants.filter(rest => rest.price === priceLevel)
            dispatch(actions.setFilteredRestaurantsAC(filteredRestaurants))
        }
        let filteredRestaurants = restaurants.filter(rest => rest.is_closed === isClosed)
        dispatch(actions.setFilteredRestaurantsAC(filteredRestaurants))
        /* if (filteredRestaurants.length === 0) {
            alert('Sorry, we dont have such restaurants') TO DO
        } */
    }, [isClosed])
    return (
        <div className={s.main}>
            <h3 className={s.heading}>Filters</h3>
            <div onClick={(e: any) => clickHandler(e)} className={s.prices}>
                <button className={`${s.price} ${s.leftPrice}`}>$</button>
                <button className={s.price}>$$</button>
                <button className={s.price}>$$$</button>
                <button className={`${s.price} ${s.rightPrice}`}>$$$$</button>
            </div>
            <label htmlFor="isOpen" className={s.label}>
                <input onChange={() => { changeHandler(!isClosed) }} className={s.checkbox} type="checkbox" name="isOpen" id="isOpen" />
                <p className={s.isOpen}>Open now</p>
            </label>
        </div>
    );
};

export default Filters;