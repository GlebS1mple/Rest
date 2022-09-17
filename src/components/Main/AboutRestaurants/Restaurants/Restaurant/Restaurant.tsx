import React from 'react';
import s from '../Restaurant/Restaurant.module.css'
import { RestaurantsType } from '../../../../../types/types';
import phone from '../../../../../../src/img/phone.png'
import food from '../../../../../../src/img/food.png'
import Feature from './Feature/Feature';

type PropsType = {
    rest: RestaurantsType
}

const Restaurant: React.FC<PropsType> = ({ rest }) => {
    return (
        <div className={s.main}>
            <img src={rest.image_url} alt="Photo of restaurant" className={s.img} />
            <div className={s.about}>
                <h2 className={s.name}>{rest.name}</h2>
                <div className={s.rating}>
                    <div className={s.stars}></div>
                    <span className={s.reviewsNumber}>{rest.review_count}</span>
                </div>
                <div className={s.info}>
                    <div className={s.address}>{rest.location.display_address.map(el => `${el}, `)}</div>
                    <p className={s.price}>{rest.price}</p>
                </div>
                <div className={s.time}>
                    <span className={s.isOpen}>{rest.is_closed ? 'Closed' : 'Open'}</span>
                </div>
                <div className={s.food}>
                    <img src={food} alt="Review" className={s.foodIcon} />
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
        </div>
    );
};

export default Restaurant;