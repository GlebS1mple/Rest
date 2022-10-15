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
    const isOffersPickUp = useSelector<AppStateType, boolean>(state => state.main.isOffersPickUp)
    const isOffersDelivery = useSelector<AppStateType, boolean>(state => state.main.isOffersDelivery)
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const filteredRestaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.filteredRestaurants)
    let isDelivery: string
    if (isOffersDelivery) {
        isDelivery = 'delivery'
    }
    const dispatch = useDispatch<Dispatch>()
    const changeHandler: (option: boolean, optionName: string) => void = (option, optionName) => {
        switch (optionName) {
            case 'isClosed':
                dispatch(actions.isClosedAC(option))
                break;
            case 'isOffersDelivery':
                dispatch(actions.isOffersDeliveryAC(option))
                break;
            case 'isOffersPickUp':
                dispatch(actions.isOffersPickUpAC(option))
                break;
            default: break
        }
    }
    const clickHandler: (e: any) => void = (e) => {
        let button = e.target.closest('button')
        if (!button) return
        dispatch(actions.setPriceLevelAC(button.textContent))
    }
    useEffect(() => {
        if (filteredRestaurants.length !== 0) {
            let newRestaurants = restaurants.filter(function (rest) { return (rest.price === priceLevel) && (rest.is_closed === isClosed) && (rest.transactions.includes(isDelivery)) && (rest.is_closed === isOffersDelivery) })
            dispatch(actions.setFilteredRestaurantsAC(newRestaurants))
            if (newRestaurants.length > 0) {
                //@ts-ignore
                dispatch(actions.setMapCenter(Object.values(newRestaurants[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })))
            }
            if (!isClosed) {
                let someRestaurants = newRestaurants.filter(rest => rest.is_closed === isClosed)
                dispatch(actions.setFilteredRestaurantsAC(someRestaurants))
                if (someRestaurants.length > 0) {
                    //@ts-ignore
                    dispatch(actions.setMapCenter(Object.values(someRestaurants[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })))
                }
            }
        }
        let filtered = restaurants.filter(rest => rest.price === priceLevel)
        dispatch(actions.setFilteredRestaurantsAC(filtered))
        if (filtered.length > 0) {
            //@ts-ignore
            dispatch(actions.setMapCenter(Object.values(filtered[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })))
        }
    }, [priceLevel, isClosed, isOffersPickUp, isOffersDelivery])
    /*     useEffect(() => {
            let filtered = restaurants.filter(rest => rest.is_closed === isClosed)
            dispatch(actions.setFilteredRestaurantsAC(filtered))
        }, [isClosed]) */

    return (
        <div className={s.main}>
            <h3 className={s.heading}>Filters</h3>
            <div role='button' onClick={(e: any) => clickHandler(e)} className={s.prices}>
                <button className={`${s.price} ${s.leftPrice}`}>$</button>
                <button className={s.price}>$$</button>
                <button className={s.price}>$$$</button>
                <button className={`${s.price} ${s.rightPrice}`}>$$$$</button>
            </div>
            <label htmlFor="isOpen" className={s.label}>
                <input onChange={() => { changeHandler(!isClosed, 'isClosed') }} className={s.checkbox} type="checkbox" name="isOpen" id="isOpen" />
                <p className={s.isOpen}>Open now</p>
            </label>
            <label htmlFor="isOffersDelivery" className={s.label}>
                <input onChange={() => { changeHandler(!isOffersDelivery, 'isOffersDelivery') }} className={s.checkbox} type="checkbox" name="isOffersDelivery" id="isOffersDelivery" />
                <p className={s.isOpen}>isOffersDelivery</p>
            </label>
            <label htmlFor="isOffersPickUp" className={s.label}>
                <input onChange={() => { changeHandler(!isOffersPickUp, 'isOffersPickUp') }} className={s.checkbox} type="checkbox" name="isOffersPickUp" id="isOffersPickUp" />
                <p className={s.isOpen}>isOffersPickUp</p>
            </label>
        </div>
    );
};

export default Filters;