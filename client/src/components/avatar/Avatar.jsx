import React from 'react'


const Avatar = ({src}) => {
  return (
    <div>
      <img src={src || '/images/placeholder.jpg'} alt="avatar" className='rounded-full h-7 w-7' />
    </div>
  )
}

export default Avatar
