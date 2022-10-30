import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/store'
import { OpenType, RestaurantType } from '../../../../types/types'
import s from '../RestaurantGalerey/RestaurantGalerey.module.css'
import PhotoSwiper from './PhotoSwiper/PhotoSwiper'
import star from '../../../../img/star.png'

const RestaurantGallery: React.FC = () => {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    const arr = restaurant.hours.map(hour => hour.open.map(open => open))
    let days = arr[0]
    let date = new Date()
    const day = date.getDay()
    let dayInfo: OpenType = days[day]
    let startNum: string | number = Array.from(dayInfo.start).filter((n, index) => index === 0 || index === 1).reduce((prev, curr) => prev + curr)
    let endNum: string | number = Array.from(dayInfo.end).filter((n, index) => index === 0 || index === 1).reduce((prev, curr) => prev + curr)
    startNum = Number(startNum)
    endNum = Number(endNum)
    const start = dayInfo.start.toString()
    const end = dayInfo.end.toString()
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
                        <div className={s.about}>
                            <p className={s.categories}>{restaurant.categories && restaurant.categories.map(cat => `${cat.title} `)}</p>
                            <p className={s.price}>{restaurant.price}</p>
                        </div>
                        <div className={s.block}>
                            {restaurant.is_closed ?
                                <p className={s.closed}>Closed</p>
                                : <p className={s.opened}>Open</p>}
                            {`${start[0] === '0' ? '' : start[0]}${start[1]}:${start[2]}${start[3]} ${startNum > 12 ? 'PM' : 'AM'} - ${end[0]}${end[1]}:${end[2]}${end[3]}  ${endNum > 12 ? 'PM' : 'AM'}`}
                        </div>

                    </div>
                </>
                : 'Loading'}
        </div>
    )
}

export default RestaurantGallery;