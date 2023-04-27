import React from 'react'
import Container from '../container/Container'
import useRegisterModal from '../../hooks/useRegisterModal';
import useUploadGigModal from '../../hooks/useUploadGigModal';

const HeroFeature = () => {
    const registerModal = useRegisterModal();
    const uploadGigModal = useUploadGigModal();

    const handleSignup = () => {
        registerModal.onOpen();
    }

    const handleUploadGig = () => {
        uploadGigModal.onOpen();
    }
  return (
    <Container>
        <div className="flex flex-row items-center gap-10 justify-between pb-14">
            <div className="flex flex-col gap-10 text-center md:text-start">
                <h1 className=' leading-relaxed font-light text-neutral-600 text-4xl'><span className='text-blue-600 font-normal'>Find</span> the perfect <span className='line-through'>freelancer</span> <span className='text-green-600 italic font-extrabold'>Gig</span>ster for your project, or offer your own services and start <span className='text-blue-600 font-normal'>earning</span> today with our platform.</h1>
                <div className="flex flex-row gap-4 justify-center md:justify-normal">
                    <button onClick={handleSignup} className='bg-green-600 px-4 py-2 text-white rounded-full font-semibold hover:bg-green-700 transition hover:shadow-md'>Create profile</button>
                    <button onClick={handleSignup} className='border-[1px] border-green-600 px-4 py-2 rounded-full text-green-500 font-semibold hover:border-green-700 hover:text-green-700 transition hover:shadow-md'>Upload Gig</button>
                </div>
            </div>
            <div className="flex-shrink-0 hidden md:block">
                <img src="/images/featurepng.png" alt="" className='w-full h-[250px] lg:h-[500px] rounded-full bg-green-50' />
            </div>
        </div>
    </Container>
  )
}

export default HeroFeature
