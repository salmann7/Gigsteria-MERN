import React from 'react'

const ProfileGigCard = ({
    data
}) => {
  return (
    <div className='flex flex-col gap-3 group py-3 mb-4'>
      <img src={data.coverImageSrc} alt="" className='w-full transition-transform transform group-hover:scale-105'/>
      <h3 className='text-md font-semibold text-neutral-800'>{data.title}</h3>
    </div>
  )
}

export default ProfileGigCard
