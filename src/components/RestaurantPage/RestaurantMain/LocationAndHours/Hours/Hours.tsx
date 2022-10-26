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
        <>
            <div className={s.main}>
                <div className={s.day}>
                    {open[0].map((day, index) => <Day key={index} open={day} />)}
                </div>
                <div className={s.hour}>
                    {open[0].map((day, index) => <Hour key={index} open={day} />)}
                </div>
            </div>
            <div className={restaurant.is_closed ? `${s.isClosed}` : `${s.isOpen}`}>
                {restaurant.is_closed ? 'Closed now' : 'Open now'}
            </div>
        </>
    );
};

export default Hours;