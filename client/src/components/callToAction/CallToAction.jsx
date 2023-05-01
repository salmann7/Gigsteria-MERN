import React from 'react'
import Container from '../container/Container'
import { CgCommunity } from 'react-icons/cg';
import useRegisterModal from '../../hooks/useRegisterModal';
import useUploadGigModal from '../../hooks/useUploadGigModal';

const CallToAction = () => {
  const registerModal = useRegisterModal();
  const uploadGigModal = useUploadGigModal();

  const handleSignup = () => {
     registerModal.onOpen();
  }

  const handleUploadGig = () => {
     uploadGigModal.onOpen();
  }
  return (
    <div className='py-[99px]'>
      <Container>
        <div className="flex flex-col gap-9">
            <h1 className='text-center text-4xl font-bold text-neutral-700 pt-10'>Join our <span className='text-blue-800'>community<CgCommunity className=' inline'/></span> of talented Gigsters and clients today.</h1>
            <div className="flex flex-row items-center justify-center gap-5">
                <button onClick={handleSignup} className='bg-green-600 px-4 py-2 text-white rounded-full font-semibold hover:bg-green-700 transition hover:shadow-md'>Create Profile</button>
                <button onClick={handleSignup} className='border-[1px] border-green-600 px-4 py-2 rounded-full text-green-500 font-semibold hover:border-green-700 hover:text-green-700 transition hover:shadow-md'>Upload Gig</button>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default CallToAction
