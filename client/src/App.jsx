
import './App.css'
import axios from 'axios'
import Cookies from 'js-cookie';

import Navbar from './components/navbar/Navbar'
import HeroFeature from './components/heroFeature/HeroFeature'
import Features from './components/features/Features'
import CallToAction from './components/callToAction/CallToAction'
import Comments from './components/comments/Comments'
import Footer from './components/footer/Footer'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import { useEffect, useState } from 'react'

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  function getCurrentUser() {
    const accessToken = Cookies.get('accessToken');
    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null
      }
    }; 
    console.log(accessToken)
    return axios.get("http://localhost:8800/api/auth/me", config)
    .then((res) => console.log(res.data._doc))
    .catch(e => console.log(e))
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <LoginModal />
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
