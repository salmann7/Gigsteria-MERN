import React from 'react'
import Container from '../container/Container'

import { BiSearch, BiNotepad } from 'react-icons/bi'
import { AiOutlineMessage, AiOutlineStar } from 'react-icons/ai'
import { MdPayment } from 'react-icons/md'
import { GiHumanTarget } from 'react-icons/gi'
import FeatureCard from '../featureCard/FeatureCard'

const Features = () => {
  return (
    <div className='bg-green-50'>
      <Container>
        <div className="text-center text-4xl font-bold text-neutral-700 pt-10">Why Choose Us?</div>
        <div className="flex flex-wrap items-center justify-center gap-9 py-10">
            <FeatureCard title="Powerful Search" desc="Search and connect with top-rated freelancers in your industry easily." icon={BiSearch} color="blue" />
            <FeatureCard title="Secure Messaging System" desc="Collaborate effectively with secure freelancer messaging for optimal results." icon={AiOutlineMessage} color="purple" />
            <FeatureCard title="Reliable Payment System" desc="Only pay for quality work with our secure payment system." icon={MdPayment} color="red" />
            <FeatureCard title="Ratings and Reviews" desc="Easily search for and connect with top-rated freelancers in your industry using our powerful search and filter function." icon={AiOutlineStar} color="yellow" />
            <FeatureCard title="Project Management Tools" desc="Easily search for and connect with top-rated freelancers in your industry using our powerful search and filter function." icon={BiNotepad} color="green" />
            <FeatureCard title="Job Posting Feature" desc="Easily search for and connect with top-rated freelancers in your industry using our powerful search and filter function." icon={GiHumanTarget} color="orange" />
        </div>
      </Container>
    </div>
  )
}

export default Features
