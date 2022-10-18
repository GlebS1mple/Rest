import React, { MouseEvent, useEffect } from 'react';
import s from '../Filters/Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../../../../redux/mainReducer';
import { AppStateType } from '../../../../redux/store';


const Filters: React.FC = () => {
    const dispatch = useDispatch<Dispatch>()
    const isClosed = useSelector<AppStateType, boolean>(state => state.main.isClosed)
    const clickHandler: (e: any) => void = (e) => {
        let button = e.target.closest('button')
        if (!button) return
        dispatch(actions.setPriceLevelAC(button.textContent.length))
    }
    const changeHandler = (isClosed: boolean) => {
        dispatch(actions.isClosedAC(isClosed))
    }
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
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
                <input onChange={() => { changeHandler(!isClosed) }} className={s.checkbox} type="checkbox" name="isOpen" id="isOpen" />
                <p className={s.isOpen}>Open now {`${hours}:${minutes}`}</p>
            </label>
        </div>
    );
};

export default Filters;