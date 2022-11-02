import React, { MouseEvent } from 'react';
import s from '../Filters/Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../../../../redux/mainReducer';
import { AppStateType } from '../../../../redux/store';
import { getRestaurantsThunk } from './../../../../redux/mainReducer';


const Filters: React.FC = () => {
    const dispatch = useDispatch<Dispatch>()
    const isClosed = useSelector<AppStateType, boolean>(state => state.main.isClosed)
    const price = useSelector<AppStateType, string>(state => state.main.priceLevel)
    const clickHandler: (e: any) => void = (e) => {
        let button = e.target.closest('button')
        if (!button) return
        dispatch(actions.setPriceLevelAC(String(button.textContent.length)))
    }
    const changeHandler = (isClosed: boolean) => {
        dispatch(actions.isClosedAC(isClosed))
    }
    const reset = () => {
        //@ts-ignore
        dispatch(getRestaurantsThunk())
    }
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return (
        <div className={s.main}>
            <h3 className={s.heading}>Filters</h3>
            <button onClick={() => { reset() }} className={s.reset}>
                Reset filters
            </button>
            <div role='button' onClick={(e: any) => clickHandler(e)} className={s.prices}>
                <button className={price === '1' ? `${s.price} ${s.leftPrice__active}` : `${s.price} ${s.leftPrice}`}>$</button>
                <button className={price === '2' ? s.price__active : s.price}>$$</button>
                <button className={price === '3' ? s.price__active : s.price}>$$$</button>
                <button className={price === '4' ? `${s.price} ${s.rightPrice__active}` : `${s.price} ${s.rightPrice}`}>$$$$</button>
            </div>
            <label htmlFor="isOpen" className={s.label}>
                <input onChange={() => { changeHandler(!isClosed) }} className={s.checkbox} type="checkbox" name="isOpen" id="isOpen" />
                <p className={s.isOpen}>Open now <span className={s.hours}>{`${hours}:${minutes}`}</span> </p>
            </label>
        </div>
    );
};

export default Filters;