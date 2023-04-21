
import './App.css'

import Navbar from './components/navbar/Navbar'
import HeroFeature from './components/heroFeature/HeroFeature'
import Features from './components/features/Features'
import CallToAction from './components/callToAction/CallToAction'
import Comments from './components/comments/Comments'
import Footer from './components/footer/Footer'
import RegisterModal from './components/modals/RegisterModal'

function App() {

  return (
    <>
      <RegisterModal />
      <Navbar />
      <HeroFeature />
      <hr />
      <Features />
      <hr />
      <CallToAction />
      <hr />
      <Comments />
      <hr />
      <Footer />
    </>
  )
}

export default App
