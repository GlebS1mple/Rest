import React from 'react';
import { OpenType } from '../../../../../../types/types';

type PropsType = {
    open: OpenType
}


const Hour: React.FC<PropsType> = (open) => {
    const start = open.open.start.toString()
    const end = open.open.end.toString()
    return (
        <p >
            {`${start[1]}:${start[2]}${start[3]} AM - ${end[0]}${end[1]}:${end[2]}${end[3]} PM`}
        </p>
    );
};

export default Hour;