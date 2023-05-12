
import './App.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import Payment from './components/payment/Payment';
import PaymentSuccess from './components/paymentSuccess/PaymentSuccess';
import Orders from './components/orders/Orders';
import PaymentModal from './components/modals/PaymentModal';
import Favorites from './components/favorites/Favorites';
import Profile from './components/profile/Profile';
import ProfileWrapper from './components/profile/ProfileWrapper';
import ProfileOther from './components/profile/ProfileOther';
import NotificationModal from './components/modals/NotificationModal';
import SearchModal from './components/modals/SearchModal';
import ProfileDashboard from './components/dashboard/profileDashboard';

import api from './utils/apiCall.js';

const accessTokenCookieOptions = {
  expires: 900000, // 15 mins
  domain: process.env.NODE_ENV === 'production' ? '.gigsteria.onrender.com':'localhost',
  path: "/",
  sameSite: "none",
  secure: true,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  expires: 3.154e10, // 1 year
};

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const accessTokenUrl = urlParams.get('accesstoken');
  const refreshTokenUrl = urlParams.get('refreshtoken');
  console.log(accessTokenUrl);


  const [currentUser, setCurrentUser] = useState(null);
  // const [ user, setUser ] = useState({});

  // const getUser = async () => {
  //   const res = await axios.get(`http://localhost:8800/api/user/${currentUser?._id}`);
  //   setUser(res.data);
  //   console.log(res.data);
  // }

  async function getCurrentUser() {
    const accessToken = Cookies.get('accessToken') || accessTokenUrl;
    console.log(accessToken)
    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null,
        withCredentials: true
      },
    }; 
    return await api.get("/api/auth/me", config)
    .then((res) => {
      setCurrentUser(res.data._doc);
      // getUser();
      console.log(res.data._doc)})
    .catch(e => console.log(e))
  }
  const setCookie = () => {
    console.log('Setting cookies...');
    Cookies.set('accessToken', accessTokenUrl, accessTokenCookieOptions);
    Cookies.set('refreshToken', refreshTokenUrl, refreshTokenCookieOptions);
  }

  useEffect(() => {
    getCurrentUser();
    if(accessTokenUrl){
      window.location.href = import.meta.env.VITE_APP_NODE_ENV === 'production'? 'https://gigsteria.onrender.com': 'http://localhost:3000'
      setCookie();
    }
  }, []);

  return (
    <>
    <BrowserRouter>
      <SearchModal currentUser={currentUser} />
      <NotificationModal />
      <UploadGigModal />
      <LoginModal />
      <RegisterModal />
      <PaymentModal />
      <Navbar currentUser={currentUser} />

      <div className="pt-[130px]">
        <Routes>
          <Route exact path='/' element={currentUser ? <Dashboard /> : <LandingPage />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/profiledashboard/:id' element={<ProfileDashboard currentUser={currentUser} />} />
          <Route exact path='/gig/:id' element={<SingleGig currentUser={currentUser} />} />
          <Route exact path='/payment/:id' element={<Payment currentUser={currentUser} />} />
          {/* <Route exact path='/paymentsuccess' element={<PaymentSuccess currentUser={currentUser} />} /> */}
          <Route exact path='/orders' element={<Orders currentUser={currentUser} />} />
          <Route exact path='/favorites' element={<Favorites currentUser={currentUser} />} />
          <Route exact path='/profile/:id' element={<ProfileOther currentUser={currentUser} />} />
          <Route exact path='/myprofile/:id' element={<Profile currentUser={currentUser} />}  />
        </Routes>
      </div>
      
      <hr />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
