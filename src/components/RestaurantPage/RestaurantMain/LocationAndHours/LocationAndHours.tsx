import React from 'react'
import Location from './Location/Location'
import Hours from './Hours/Hours'
import s from '../LocationAndHours/LocationAndHours.module.css'

const LocationAndHours: React.FC = () => {
    return (
        <div className={s.main}>
            <h2 className={s.heading}>Location & Hours</h2>
            <div className={s.block}>
                <Location />
                <Hours />
            </div>
        </div>
    );
};

export default LocationAndHours;