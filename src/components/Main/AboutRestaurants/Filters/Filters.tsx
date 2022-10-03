import React, { MouseEvent, useEffect } from 'react';
import s from '../Filters/Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../../../../redux/mainReducer';
import { AppStateType } from '../../../../redux/store';
import { PriceLevelType, RestaurantsType } from '../../../../types/types';


const Filters: React.FC = () => {
    const priceLevel = useSelector<AppStateType, PriceLevelType | ''>(state => state.main.priceLevel)
    const isClosed = useSelector<AppStateType, boolean>(state => state.main.isClosed)
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const filteredRestaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.filteredRestaurants)
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
        if (filteredRestaurants.length !== 0) {
            let newRestaurants = restaurants.filter(rest => rest.price === priceLevel)
            dispatch(actions.setFilteredRestaurantsAC(newRestaurants))
            if (!isClosed) {
                let someRestaurants = newRestaurants.filter(rest => rest.is_closed === isClosed)
                dispatch(actions.setFilteredRestaurantsAC(someRestaurants))
            }
        }
        let filtered = restaurants.filter(rest => rest.price === priceLevel)
        dispatch(actions.setFilteredRestaurantsAC(filtered))
    }, [priceLevel, isClosed])
    /*     useEffect(() => {
            let filtered = restaurants.filter(rest => rest.is_closed === isClosed)
            dispatch(actions.setFilteredRestaurantsAC(filtered))
        }, [isClosed]) */

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