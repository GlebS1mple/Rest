import React from 'react'
import { AppStateType } from '../../../../redux/store'
import s from '../RestaurantCard/RestaurantCard.module.css'
import { useSelector } from 'react-redux'
import { RestaurantType } from '../../../../types/types'
import address from '../../../../img/address.png'
import link from '../../../../img/link.png'
import phone from '../../../../img/phone.png'

const RestaurantCard: React.FC = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div className={s.main}>
            <div className={s.block}>
                <a href={restaurant.url} className={s.link}>
                    {restaurant.url.substr(0, 25)}
                </a>
                <img src={link} alt="Link" className={s.img} />
            </div>
            <div className={s.block}>
                <p className={s.phone}>
                    {restaurant.display_phone}
                </p>
                <img src={phone} alt="Phone" className={s.img} />
            </div>
            <div className={s.block}>
                <p className={s.address}>
                    {restaurant.location.display_address}
                </p>
                <img src={address} alt="Adress" className={s.img} />
            </div>
        </div>
    );
};

export default RestaurantCard;