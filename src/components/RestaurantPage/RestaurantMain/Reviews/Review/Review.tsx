import React from 'react'
import { ReviewType } from '../../../../../types/types'
import s from '../Review/Review.module.css'
import user from '../../../../../img/user.png'
import star from '../../../../../img/star2.png'

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
            <div className={s.rating}>
                <div className={s.rate}>
                    <p className={s.grade}>
                        {review.rating}
                    </p>
                    <img src={star} alt="Star" className={s.star} />
                </div>
                <p className={s.date}>
                    {review.time_created.substr(0, 10)}
                </p>
            </div>
            <p className={s.text}>
                {review.text}
            </p>
        </div>
    );
};

export default Review;