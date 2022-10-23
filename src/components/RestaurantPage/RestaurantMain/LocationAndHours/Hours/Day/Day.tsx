import React from 'react';
import { OpenType } from '../../../../../../types/types';
import s from '../Day/Day.module.css'

type PropsType = {
    open: OpenType
}

const Day: React.FC<PropsType> = (open) => {
    return (
        <p >
            {open.open.day === 0 ? 'Mon' : open.open.day === 1 ? 'Tue' : open.open.day === 2 ? 'Wed' : open.open.day === 3 ? 'Thu' : open.open.day === 4 ? 'Fri' : open.open.day === 5 ? 'Sat' : open.open.day === 6 ? 'Sun' : ''}
        </p>
    );
};

export default Day;