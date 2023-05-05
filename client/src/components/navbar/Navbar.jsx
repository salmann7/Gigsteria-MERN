import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import Container from '../container/Container'
import Avatar from '../avatar/Avatar';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import useUploadGigModal from '../../hooks/useUploadGigModal';
import Categories from './Categories';
import useNotificationModal from '../../hooks/useNotificationModal';

const Navbar = ({currentUser}) => {
  const {pathname} = useLocation();
  console.log(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const uploadGigModal = useUploadGigModal();
  const [ activeLink, setActiveLink ] = useState(false);
  const navigate = useNavigate();
  const notificationModal = useNotificationModal();

  const isMainPage = (pathname === '/dashboard');

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => (!value))
  },[]);

  useEffect(() => {
    if(pathname === '/'&& currentUser){
      setActiveLink(true);
    }
  })

  useEffect(() => {
    console.log(pathname);
    if(pathname === '/' && currentUser){
      console.log("here nav")
      setActiveLink(true);
    }
    else if(pathname === '/'){
      setActiveLink(false);
    }
    else if(pathname === '/dashboard'){
      setActiveLink(true);
    } else{
      setActiveLink(false);
    }
  },[pathname]);
  
  const handleSignup = () => {
    registerModal.onOpen();
  }

  const handleLogin = () => {
    loginModal.onOpen();
  }

  const handleOrder = () => {
    console.log("order");
    navigate('/orders');
  }

  const handleFav = () => {
    console.log("favorites");
    navigate('/favorites');
  }

  const handleProfile = () => {
    console.log("Profile");
    navigate(`/myprofile/${currentUser?._id}`);
  }

  const handleNotification = () => {
    notificationModal.onOpen();
  }

  const handleUploadGig = () => {
    if(currentUser){
      uploadGigModal.onOpen();
    } else{
      registerModal.onOpen();
    }
    
  }

  const handleLogout = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    await axios.post("http://localhost:8800/api/auth/logout");
    window.location.href = '/';
  }

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="border-b-[1px] py-4">
            <Container>
              <div className="flex justify-between items-center">
                <Link to='/'>
                  <div className="font-semibold text-md text-2xl cursor-pointer"><span className=' text-green-600'>Gig</span>steria<span className=' text-green-600'>.</span></div>
                </Link>
                <div className="flex flex-row items-center justify-center w-full md:w-auto mx-1 sm:mx-0">
                    <div className="border-[1px] rounded-full hover:shadow-md transition cursor-pointer py-2 w-full md:w-auto">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-sm font-semibold md:px-6 px-3">
                                Find gig
                            </div>
                            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                                Category
                            </div>
                            <div className="hidden sm:block text-sm font-semibold pl-6 pr-1  flex-1 text-center">
                                Title
                            </div>
                            <div className="bg-green-600 p-2 rounded-full mx-2 text-white">
                                <BiSearch size={18} />
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='flex items-center'>
                  <li>
                    {currentUser ? (
                      <Link to='/'>
                        <div onClick={() => setActiveLink(true)} className={`${activeLink && 'bg-neutral-100 shadow-md'} hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 ml-2 hover:bg-neutral-100 py-3 rounded-full`}>
                          Gig Home
                        </div>
                      </Link>
                    ):(
                      <Link to='/dashboard'>
                        <div onClick={() => setActiveLink(true)} className={`${activeLink && 'bg-neutral-100 shadow-md'} hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 ml-2 hover:bg-neutral-100 py-3 rounded-full`}>
                          Gig Home
                        </div>
                      </Link>
                    )}
                    
                  </li>
                  <li>
                    <div onClick={handleUploadGig} className="hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 mx-2 hover:bg-neutral-100 py-3 rounded-full">
                      Upload Gig
                    </div>
                  </li>
                  <li className='relative'>
                    <div onClick={toggleOpen} className="border-[1px] rounded-full p-4 md:py-2 md:px-2 border-x-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.picture} />
                        </div>
                    </div>
                    {isOpen && (
                  <div className="absolute bg-white rounded-xl shadow-md w-[150px] overflow-hidden right-0 top-12 text-sm font-semibold">
                    {currentUser ? (
                      <div className="flex flex-col cursor-pointer">
                      {/* <div onClick={handleSignup} className="p-4 hover:bg-neutral-50 border-b-[1px] transition">Sign up</div> */}
                      <div onClick={handleUploadGig} className="sm:hidden p-4 hover:bg-neutral-50 transition">Upload Gig</div>
                      <div onClick={handleOrder} className=" p-4 hover:bg-neutral-50 transition">Console</div>
                      <div onClick={handleFav} className=" p-4 hover:bg-neutral-50 transition">Favorites</div>
                      <div onClick={handleOrder} className=" p-4 hover:bg-neutral-50 transition">Orders</div>
                      <div onClick={handleNotification} className=" p-4 hover:bg-neutral-50 transition">Notification</div>
                      <div onClick={handleProfile} className=" p-4 hover:bg-neutral-50 transition">My Profile</div>
                      <div onClick={handleLogout} className="p-4 hover:bg-neutral-50 transition">Logout</div>
                    </div>
                    ) : (
                      <div className="flex flex-col cursor-pointer">
                      <div onClick={handleSignup} className="p-4 hover:bg-neutral-50 border-b-[1px] transition">Sign up</div>
                      <div onClick={handleLogin} className="p-4 hover:bg-neutral-50 transition">Login</div>
                    </div>
                    )}
                    
                  </div>
                )}
                  </li>
                </ul>
              </div>
            </Container>
            {(currentUser || isMainPage) && (<Categories />)}
        </div>
    </div>
  )
}

export default Navbar
