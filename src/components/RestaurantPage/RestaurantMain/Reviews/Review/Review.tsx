import React from 'react'
import { ReviewType } from '../../../../../types/types'
import s from '../Review/Review.module.css'
import user from '../../../../../img/user.png'

type PropsType = {
    review: ReviewType
}

const Review: React.FC<PropsType> = ({ review }) => {
    return (
        <div className={s.main}>
            <div className={s.user}>
                <img src={review.user.image_url ? review.user.image_url : user} alt="User photo" className={s.photo} />
                <p className={s.name}>
                    {review.user.name}
                </p>
            </div>
            <p className={s.text}>
                {review.text}
            </p>
        </div>
    );
};

export default Review;