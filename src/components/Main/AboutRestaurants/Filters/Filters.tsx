import React from 'react';
import s from '../Filters/Filters.module.css'

const Filters = () => {
    return (
        <div className={s.main}>
            <h3 className={s.heading}>Filters</h3>
            <div className={s.prices}>
                <button className={`${s.price} ${s.leftPrice}`}>$</button>
                <button className={s.price}>$$</button>
                <button className={s.price}>$$$</button>
                <button className={`${s.price} ${s.rightPrice}`}>$$$$</button>
            </div>
            <label htmlFor="isOpen" className={s.label}>
                <input className={s.checkbox} type="checkbox" name="isOpen" id="isOpen" />
                <p className={s.isOpen}>Open now</p>
            </label>
        </div>
    );
};

export default Filters;