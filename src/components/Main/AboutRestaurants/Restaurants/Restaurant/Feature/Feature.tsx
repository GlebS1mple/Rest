import React from 'react';
import checkmark from '../../../../../../../src/img/checkmark.png'
import s from '../Feature/Feature.module.css'

type PropsType = {
    el: string
}
const Feature: React.FC<PropsType> = ({ el }) => {
    return (
        <div className={s.feature}>
            <img src={checkmark} alt="check mark" className={s.icon} />
            <p className={s.featureName}>{el === 'restaurant_reservation' ? 'reservation' : el}</p>
        </div>
    );
};

export default Feature;