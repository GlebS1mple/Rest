import React from 'react';
import { OpenType } from '../../../../../../types/types';

type PropsType = {
    open: OpenType
}


const Hour: React.FC<PropsType> = (open) => {
    let startNum: string | number = Array.from(open.open.start).filter((n, index) => index === 0 || index === 1).reduce((prev, curr) => prev + curr)
    let endNum: string | number = Array.from(open.open.end).filter((n, index) => index === 0 || index === 1).reduce((prev, curr) => prev + curr)
    startNum = Number(startNum)
    endNum = Number(endNum)
    const start = open.open.start.toString()
    const end = open.open.end.toString()
    return (
        <p >
            {`${start[0] === '0' ? '' : start[0]}${start[1]}:${start[2]}${start[3]} ${startNum > 12 ? 'PM' : 'AM'} - ${end[0]}${end[1]}:${end[2]}${end[3]}  ${endNum > 12 ? 'PM' : 'AM'}`}
        </p>
    );
};

export default Hour;