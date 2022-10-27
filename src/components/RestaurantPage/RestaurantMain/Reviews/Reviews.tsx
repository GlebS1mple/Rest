import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/store'
import { ReviewType } from '../../../../types/types'
import s from '../Reviews/Reviews.module.css'
import Review from './Review/Review'

const Reviews: React.FC = () => {
    const reviews = useSelector<AppStateType, Array<ReviewType>>(state => state.restaurant.restaurantReviews)
    return (
        <div className={s.main}>
            <h2 className={s.heading}>Reviews</h2>
            {reviews.length > 0 ? reviews.map(review => <Review key={review.id} review={review} />) : 'Loading...'}
        </div>
    );
};

export default Reviews;