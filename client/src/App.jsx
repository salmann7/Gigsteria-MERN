
import './App.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar'
import HeroFeature from './components/heroFeature/HeroFeature'
import Features from './components/features/Features'
import CallToAction from './components/callToAction/CallToAction'
import Comments from './components/comments/Comments'
import Footer from './components/footer/Footer'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import { useEffect, useState } from 'react'
import LandingPage from './components/landingPage/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import UploadGigModal from './components/modals/UploadGigModal';
import SingleGig from './components/singleGig/SingleGig';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  async function getCurrentUser() {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null
      }
    }; 
    return await axios.get("http://localhost:8800/api/auth/me", config)
    .then((res) => {
      setCurrentUser(res.data._doc);
      console.log(res.data._doc)})
    .catch(e => console.log(e))
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
    <BrowserRouter>
      <UploadGigModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />

      <div className="pt-[130px]">
        <Routes>
          <Route exact path='/' element={currentUser ? <Dashboard /> : <LandingPage />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/gig/:id' element={<SingleGig currentUser={currentUser} />} />
        </Routes>
      </div>
      
      <hr />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
