
import './App.css'

import Navbar from './components/navbar/Navbar'
import HeroFeature from './components/heroFeature/HeroFeature'
import Features from './components/features/Features'
import Slide from './components/slide/Slide'
import CallToAction from './components/callToAction/CallToAction'

function App() {

  return (
    <>
      <Navbar />
      <HeroFeature />
      <hr />
      <Features />
      <hr />
      <CallToAction />
      <Slide />
    </>
  )
}

export default App
