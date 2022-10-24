import React from 'react';
import s from '../Hours/Hours.module.css'
import { useSelector } from 'react-redux';
import { RestaurantType } from '../../../../../types/types';
import { AppStateType } from '../../../../../redux/store';
import Day from './Day/Day';
import Hour from './Hour/Hour';

const Hours: React.FC = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    const open = restaurant.hours.map(hour => hour.open.map(open => open))
    let monday = open[0].filter(day => day.day === 0)
    return (
        <div className={s.main}>
            <div className={s.day}>
                {open[0].map(day => <Day open={day} />)}
            </div>
            <div className={s.hour}>
                {open[0].map(day => <Hour open={day} />)}
            </div>
        </div>
    );
};

export default Hours;