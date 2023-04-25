import React from 'react'
import HeroFeature from '../heroFeature/HeroFeature'
import Features from '../features/Features'
import CallToAction from '../callToAction/CallToAction'
import Comments from '../comments/Comments'

const LandingPage = () => {
  return (
    <>
      <HeroFeature />
      <hr />
      <Features />
      <hr />
      <CallToAction />
      <hr />
      <Comments />
    </>
  )
}

export default LandingPage
