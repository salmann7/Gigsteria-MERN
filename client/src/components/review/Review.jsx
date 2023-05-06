import React, { useEffect, useState } from 'react'
import ReviewList from './ReviewList'
import CreateReview from './createReview'

const Review = ({reviewList}) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setReviews(reviewList);
    },[reviewList])

    const addReview = (newReview) => {
        console.log(newReview)
        setReviews([...reviews, newReview]);
    };
    
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-semibold text-2xl text-neutral-800'>What People are Saying</h3>
      <CreateReview addReview={addReview} />
      {reviews && reviews.map((review) => (
        <ReviewList review={review} key={review?._id} />
      ))}
    </div>
  )
}

export default Review
