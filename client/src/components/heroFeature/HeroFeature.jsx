import React from 'react'
import Container from '../container/Container'

const HeroFeature = () => {
  return (
    <Container>
        <div className="flex flex-row items-center pt-[130px] gap-10 justify-between pb-14">
            <div className="flex flex-col gap-10">
                <h1 className=' leading-relaxed font-light text-neutral-600 text-4xl'><span className='text-blue-600 font-normal'>Find</span> the perfect <span className='line-through'>freelancer</span> <span className='text-green-600 italic font-extrabold'>Gig</span>ster for your project, or offer your own services and start <span className='text-blue-600 font-normal'>earning</span> today with our platform.</h1>
                <div className="flex flex-row gap-4">
                    <button className='bg-green-600 px-4 py-2 text-white rounded-full font-semibold hover:bg-green-700 transition hover:shadow-md'>Create porfile</button>
                    <button className='border-[1px] border-green-600 px-4 py-2 rounded-full text-green-500 font-semibold hover:border-green-700 hover:text-green-700 transition hover:shadow-md'>Upload Gig</button>
                </div>
            </div>
            <div className="flex-shrink-0">
                <img src="/images/featurepng.png" alt="" className='w-full h-[500px] rounded-full bg-green-50' />
            </div>
        </div>
    </Container>
  )
}

export default HeroFeature
