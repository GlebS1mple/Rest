import React from 'react'
import loader from '../../../../img/Loader.gif'
import s from '../MapLoader/MapLoader.module.css'

const MapLoader: React.FC = () => {
    return (
        <div className={s.main}>
            <img src={loader} alt="Loading..." className={s.img} />
        </div>
    );
};

export default MapLoader;