import React from 'react'
import clsx from 'clsx'

const FeatureCard = ({
    title,
    desc,
    color,
    icon: Icon
}) => {
  
  return (
    <div className='bg-white flex flex-col items-center justify-center px-5 py-10 min-w-[280px] min-h-[320px] w-1/4 gap-4 rounded-lg shadow-md'>
      <div className={`rounded-full p-5 text-${color}-800`}>
        <Icon size={24} />
      </div>
      <div className="text-center font-semibold text-lg text-neutral-800">
        {title}
      </div>
      <div className="text-center text-neutral-600">
        {desc}
      </div>
    </div>
  )
}

export default FeatureCard
