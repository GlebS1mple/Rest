import React, { useState } from 'react';
import s from '../SortPopUp/SortPopUp.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../../redux/store';
import { SortType } from '../../../../../types/types';
const SortPopUp = () => {
    const [active, setActive] = useState(false)
    const sortBy = useSelector<AppStateType, SortType>(state => state.main.sortBy)
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
        case 'best_match': {
            sort = 'Most Reviewed'
            break
        }
    }
    return (
        <div className={s.main}>
            <p onClick={() => { setActive(false) }} className={s.heading}>
                Sort:
            </p>
            <div className={s.flex}>
                <button onClick={() => { setActive(!active) }} className={s.button}>
                    {sort} <span className={active ? s.arrow__active : s.arrow}>&#9660;</span>
                </button>
                <div onClick={(e: any) => { e.stopPropagation() }} className={active ? s.popup__active : s.popup}>
                    <button>Recomended</button>
                    <button>Highest Rated</button>
                    <button>Most Reviewed</button>
                </div>
            </div>
        </div>
    );
};

export default SortPopUp;