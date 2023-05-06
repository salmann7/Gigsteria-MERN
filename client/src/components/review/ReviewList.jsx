import React from 'react'
import { BsFillStarFill } from 'react-icons/bs';
import moment from 'moment';

const ReviewList = ({review}) => {
    const formattedDate = moment(review?.createdAt).fromNow();

    const getRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<BsFillStarFill key={i} size={15} className="text-neutral-500" />);
          } else {
            stars.push(<BsFillStarFill key={i} size={15} className="text-gray-300" />);
          }
        }
        return stars;
    };

  return (
    <div className="flex flex-col gap-2 my-5">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1">{getRatingStars(review?.star)}</div>
            <div className="text-sm sm:text-md font-semibold text-neutral-500">{formattedDate}</div>
        </div>
        <p className='sm:text-md text-neutral-800'>{review?.desc}</p>
        <div className="text-md  font-semibold text-neutral-500">By: {review?.userName}</div>
    </div>
  )
}

export default ReviewList
