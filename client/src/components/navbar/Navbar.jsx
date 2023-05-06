import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch, BiUserPlus } from 'react-icons/bi';
import { BsBell, BsGraphUpArrow, BsFileEarmarkSpreadsheet, BsPerson } from 'react-icons/bs';
import { MdOutlineLogout, MdOutlineFileUpload, MdFavoriteBorder, MdHome, MdOutlineLogin } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

import Container from '../container/Container'
import Avatar from '../avatar/Avatar';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import useUploadGigModal from '../../hooks/useUploadGigModal';
import Categories from './Categories';
import useNotificationModal from '../../hooks/useNotificationModal';
import useSearchModal from '../../hooks/useSearchModal';

const Navbar = ({currentUser}) => {
  const {pathname} = useLocation();
  console.log(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const uploadGigModal = useUploadGigModal();
  const searchModal = useSearchModal();
  const [ activeLink, setActiveLink ] = useState(false);
  const navigate = useNavigate();
  const notificationModal = useNotificationModal();
  const [ hasNotification, setHasNotification ] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

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
    const getUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user`, { withCredentials: true});
      setHasNotification(res.data?.hasNotification);
      setIsSeller(res.data?.isSeller);
    }
    getUser();
  },[])

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

  const handleToggleSeller = async () => {
    try{
      const res = await axios.put(`http://localhost:8800/api/user`, { isSeller: (isSeller ? false : true) }, {
        withCredentials: true
      })
      setIsSeller(res.data?.isSeller);
    } catch(e){
      console.log(e);
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
                        <div onClick={() => searchModal.onOpen()} className="flex flex-row items-center justify-between">
                            <div className="text-sm font-semibold md:px-6 px-3">
                               Search 
                            </div>
                            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                                Title
                            </div>
                            <div className="hidden sm:block text-sm font-semibold pl-6 pr-1  flex-1 text-center">
                                Cost
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
                        <div onClick={() => setActiveLink(true)} className={`${activeLink && 'bg-neutral-100 shadow-md'} hidden cursor-pointer sm:block  font-semibold text-neutral-500 text-md px-6 ml-2 hover:bg-neutral-100 py-3 rounded-full `}>
                          <div className="flex flex-row items-center justify-around"><span className=' ml-1'>Home</span></div>
                        </div>
                      </Link>
                    ):(
                      <Link to='/dashboard'>
                        <div onClick={() => setActiveLink(true)} className={`${activeLink && 'bg-neutral-100 shadow-md'} hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 ml-2 hover:bg-neutral-100 py-3 rounded-full`}>
                        <div className="flex flex-row items-center justify-around"><span className=' ml-1'>Home</span></div>
                        </div>
                      </Link>
                    )}
                    
                  </li>
                  <li>
                    <div onClick={handleUploadGig} className="hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 mx-2 hover:bg-neutral-100 py-3 rounded-full">
                      Create
                    </div>
                  </li>
                  <li className='relative'>
                    <div onClick={toggleOpen} className="border-[1px] rounded-full p-4 md:py-2 md:px-2 border-x-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
                        <div className="relative"><AiOutlineMenu  />{hasNotification && <span className='bg-red-500 w-[10px] h-[10px] rounded-full absolute -right-1 -top-1'></span>}</div>
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.picture} />
                        </div>
                    </div>
                    {isOpen && (
                  <div className="absolute bg-white rounded-xl shadow-md w-[150px] overflow-hidden right-0 top-12 text-sm font-semibold">
                    {currentUser ? (
                      <div className="flex flex-col cursor-pointer">
                      {/* <div onClick={handleSignup} className="p-4 hover:bg-neutral-50 border-b-[1px] transition">Sign up</div> */}
                      <div onClick={handleUploadGig} className="sm:hidden p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Create Gig</span><MdOutlineFileUpload size={17} /></div>
                      <div onClick={handleToggleSeller} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Seller</span><BsToggleOff className={`text-red-500 ${isSeller ? 'hidden':'block'}`} size={17} /><BsToggleOn className={`text-green-500 ${isSeller ? 'block':'hidden'}`} size={17} /></div>
                      <div onClick={handleOrder} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Console</span><BsGraphUpArrow size={17} /></div>
                      <div onClick={handleFav} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Favorites</span><MdFavoriteBorder size={17} /></div>
                      <div onClick={handleOrder} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Orders</span><BsFileEarmarkSpreadsheet size={17} /></div>
                      <div onClick={handleNotification} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Notification</span><div className="relative"><BsBell size={17} />{hasNotification && <span className='bg-red-500 w-[10px] h-[10px] rounded-full absolute -right-1 -top-1'></span>}</div></div>
                      <div onClick={handleProfile} className=" p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>My Profile</span><BsPerson size={17} /></div>
                      <div onClick={handleLogout} className="p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Logout</span><MdOutlineLogout size={17} /></div>
                    </div>
                    ) : (
                      <div className="flex flex-col cursor-pointer">
                      <div onClick={handleSignup} className="p-4 hover:bg-neutral-50 border-b-[1px] transition flex justify-between items-center"><span>Sign up</span><BiUserPlus size={17} /></div>
                      <div onClick={handleLogin} className="p-4 hover:bg-neutral-50 transition flex justify-between items-center"><span>Login</span><MdOutlineLogin size={17} /></div>
                    </div>
                    )}
                    
                  </div>
                )}
                  </li>
                </ul>
              </div>
            </Container>
            {(currentUser || isMainPage) && (<Categories currentUser={currentUser} />)}
        </div>
    </div>
  )
}

export default Navbar
