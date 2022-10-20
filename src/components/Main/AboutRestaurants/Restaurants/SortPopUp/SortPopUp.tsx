import React, { useState } from 'react';
import s from '../SortPopUp/SortPopUp.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../../../../../redux/store';
import { SortType } from '../../../../../types/types';
import { actions } from '../../../../../redux/mainReducer';
const SortPopUp = () => {
    const isPopUpActive = useSelector<AppStateType, boolean>(state => state.main.isPopUpActive)
    const sortBy = useSelector<AppStateType, SortType>(state => state.main.sortBy)
    const dispatch = useDispatch()
    const setActive = (isPopUpActive: boolean) => {
        dispatch(actions.isPopUpActiveAC(isPopUpActive))
    }
    let sort
    switch (sortBy) {
        case 'best_match': {
            sort = 'Recomended'
            break
        }
        case 'rating': {
            sort = 'Highest Rated'
            break
        }
        case 'review_count': {
            sort = 'Most Reviewed'
            break
        }
    }
    const clickHandler: (e: any) => void = (e) => {
        let option = e.target.closest('button')
        if (!option) return
        let sort: SortType = 'best_match'
        switch (option.textContent) {
            case 'Recomended': {
                sort = 'best_match'
                break
            }
            case 'Highest Rated': {
                sort = 'rating'
                break
            }
            case 'Most Reviewed': {
                sort = 'review_count'
                break
            }
        }
        dispatch(actions.setSortByAC(sort))
    }
    return (
        <div className={s.main}>
            <p className={s.heading}>
                Sort:
            </p>
            <div onClick={(e: any) => { e.stopPropagation() }} className={s.flex}>
                <button onClick={() => { setActive(!isPopUpActive) }} className={isPopUpActive ? s.button__active : s.button}>
                    {sort} <span className={isPopUpActive ? s.arrow__active : s.arrow}>&#9660;</span>
                </button>
                <div role='option' onClick={(e: any) => clickHandler(e)} className={isPopUpActive ? s.popup__active : s.popup}>
                    <button className={s.option}>Recomended</button>
                    <button className={s.option}>Highest Rated</button>
                    <button className={s.option}>Most Reviewed</button>
                </div>
            </div>
        </div>
    );
};

export default SortPopUp;