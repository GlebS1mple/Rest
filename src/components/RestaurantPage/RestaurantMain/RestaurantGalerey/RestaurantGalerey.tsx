import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { RestaurantType } from '../../../../types/types';
import RestaurantPhoto from './RestaurantPhoto/RestaurantPhoto';
import s from '../RestaurantGalerey/RestaurantGalerey.module.css'
import PhotoSwiper from './PhotoSwiper/PhotoSwiper';
import star from '../../../../img/star.png'

const RestaurantGallery = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    return (
        <div className={s.main} >
            {restaurant.photos ?
                <>
                    <PhotoSwiper />
                    <div className={s.mainInfo}>
                        <p className={s.name}>{restaurant.name}</p>
                        <div className={s.rating}>
                            <div className={s.stars}>{restaurant.rating}
                                <img src={star} alt="Star" className={s.star} />
                            </div>
                            <p className={s.reviews}>{restaurant.review_count} reviews</p>
                        </div>
                        <div className={s.block}>
                            {restaurant.is_closed ?
                                <p className={s.closed}>Closed</p>
                                : <p className={s.opened}>Open</p>}
                            <p className={s.categories}>{restaurant.categories && restaurant.categories.map(cat => `${cat.title} `)}</p>
                        </div>
                    </div>
                </>
                : 'Loading'}
        </div>
    )
}
//{restaurant.photos ? restaurant.photos.map(photo => <RestaurantPhoto img={photo} />) : 'Loading'}
export default RestaurantGallery;