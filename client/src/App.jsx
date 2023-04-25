
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

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  function getCurrentUser() {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null
      }
    }; 
    return axios.get("http://localhost:8800/api/auth/me", config)
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
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />

      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
      
      <hr />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
