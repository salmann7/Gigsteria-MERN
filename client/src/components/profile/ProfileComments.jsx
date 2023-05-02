import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import Avatar from '../avatar/Avatar';


const ProfileComments = ({
    data
}) => {

    const getRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<BsFillStarFill key={i} size={15} className="text-yellow-400" />);
          } else {
            stars.push(<BsFillStarFill key={i} size={15} className="text-gray-300" />);
          }
        }
        return stars;
      };

  return (
    <div className='flex flex-col bg-neutral-50 rounded-md p-3 gap-3 mb-4'>
      <div className="flex flex-row">{getRatingStars(data.rating)}</div>
      <p className='text-sm font-light text-neutral-500'>{data.comment}</p>
      <div className="flex flex-row gap-3">
        <Avatar src={data.profilePic} />
        <div className="font-semibold text-sm text-neutral-500">{data.username}</div>
      </div>
    </div>
  )
}

export default ProfileComments
