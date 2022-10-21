import React from 'react';
import s from '../Restaurant/Restaurant.module.css'
import { RestaurantsType } from '../../../../../types/types'
import phone from '../../../../../../src/img/phone.png'
import food from '../../../../../../src/img/food.png'
import Feature from './Feature/Feature'
import star from '../../../../../img/star.png'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { actions } from '../../../../../redux/restaurantReducer';
import { getRestaurantThunk } from './../../../../../redux/restaurantReducer';

type PropsType = {
    rest: RestaurantsType
}

const Restaurant: React.FC<PropsType> = ({ rest }) => {
    let dispatch = useDispatch()
    const clickHandler = (id: string) => {
        //@ts-ignore
        dispatch(getRestaurantThunk(id))
    }
    return (
        <Link onClick={() => { clickHandler(rest.id) }} to='/restaurant' className={s.main}>
            <img src={rest.image_url} alt="Photo of restaurant" className={s.img} />
            <div className={s.about}>
                <h2 className={s.name}>{rest.name}</h2>
                <div className={s.rating}>
                    <div className={s.stars}>
                        {rest.rating}
                        <img src={star} alt="rating" className={s.star} />
                    </div>
                    <span className={s.reviewsNumber}>{rest.review_count}</span>
                </div>
                <div className={s.info}>{rest.location.display_address.map(el => `${el}, `)}{rest.price}</div>
                <div className={s.time}>
                    <span className={s.isOpen}>{rest.is_closed ? 'Closed' : 'Open'}</span>
                </div>
                <div className={s.food}>
                    <img src={food} alt="What kind of food" className={s.foodIcon} />
                    <p className={s.foodText}>
                        {rest.categories.map(el => `${el.title}, `)}
                        <button className={s.more}>more</button>
                    </p>
                </div>
                <div className={s.phone}>
                    <img src={phone} alt="phone" className={s.phoneIcon} />
                    <p className={s.phoneText}>{rest.display_phone ? rest.display_phone : '-'}</p>
                </div>
                <div className={s.footer}>
                    <div className={s.features}>
                        {rest.transactions.length > 0 ? rest.transactions.map((el, index) => <Feature key={index} el={el} />) : ''}
                    </div>
                    <a href={rest.url} className={s.link}>Watch on yelp</a>
                </div>
            </div>
        </Link>
    );
};

export default Restaurant;