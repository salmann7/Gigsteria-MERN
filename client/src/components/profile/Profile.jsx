import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { AiFillPlusCircle } from 'react-icons/ai'
import ListingCard from '../listingCard/ListingCard';
// import { data } from '../comments/Comments';
import ProfileComments from './ProfileComments';
import { MdEmail, MdArrowDropDown } from 'react-icons/md';
import { BsTwitter } from 'react-icons/bs';
import { TiSocialLinkedin } from 'react-icons/ti';
import { BsFillStarFill, BsToggleOn, BsToggleOff } from 'react-icons/bs';

import api from '../../utils/apiCall.js';


const Profile = ({
  currentUser
}) => {
    const { id } = useParams();
    const [ user, setUser ] = useState({});
    const [ userGigs, setUserGigs ] = useState([]);
    const [ commPost, setCommPost ] = useState([]);
    const [ inputPost, setInputPost ] = useState('');
    const [ name, setName ] = useState(user?.name || '');
    const [ role, setRole ] = useState(user?.role || 'Gigster');
    const [ skills, setSkills ] = useState(user?.skills || []);
    const [ skill, setSkill ] = useState('');
    const [ self, setSelf ] = useState(false);
    const [ editMode, setEditMode ] = useState(false);
    const [data, setData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [ selectSocial, setSelectSocial ] = useState('');
    const [ socialLink, setSocialLink ] = useState('');
    const [ totalOrders, setTotalOrders ] = useState(0);
    const [profileData, setProfileData] = useState({});
    // const [isSeller, setIsSeller] = useState(false);
    const comments = [];

    // const toggleIsSeller = () => {
    //   setIsSeller(!isSeller);
    // };

    const getProfileDetails = async () => {
      try{
        const res = await api.get(`/api/profile/${id}`);
        console.log(res.data);
        setProfileData(res.data);
        setUser(res.data?.userObj);
        setUserGigs(res.data?.userGigObj);
        setCommPost(res.data?.commObj);
        setTotalOrders(res.data?.orderLength);
        setSkills(res.data?.userObj?.skills)
      }catch(e){
        console.log(e);
      }
    }

    const createPost = async () => {
      try{
        const res = await api.post(`/api/communityPosts`, {
          desc: inputPost,
        });
        setInputPost('');
        setCommPost(res.data);
      } catch(e){
        console.log(e);
      }
    }

    const getRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<BsFillStarFill key={i} size={15} className="text-yellow-400" />);
          } else {
            stars.push(<BsFillStarFill key={i} size={15} className="text-gray-300" />);
          }
        }
        return stars;
    };

    const handleEdit = (e) => {
      if(!editMode){
        setEditMode(true);
      } else {
        handleSubmit();
        setEditMode(false);
      }
    }

    const handleSubmit = async () => {
      setData({...data, name, role});
      // updateUser();
    }

    const handleSkills = async () => {
      if(!editMode){
        setEditMode(true);
      } else {
        skills.push(skill);
        setData({...data, skills});
        // updateUser();
        setEditMode(false);
        setSkill(null);
      }
      
    }

    const handleContact = async () => {
      if(!editMode){
        setEditMode(true);
      } else {
        let updatedData;
        if(selectSocial === 'twitter'){
          updatedData = { ...data, twitter: socialLink };
        } else {
          updatedData = { ...data, linkedin: socialLink };
        }
        setData(updatedData);
        // updateUser();
        setEditMode(false);
      }
    }

    // const updateUser = async () => {
    //   try{
    //     const res = await axios.put('http://localhost:8800/api/user', data , { withCredentials: true});
    //     setUser(res.data);
    //     // setName(res.data?.name);
    //   }catch(e){
    //     console.log(e);
    //   }
    // }

    useEffect(() => {
      const updateUser = async () => {
        try{
          const res = await api.put('/api/user', data);
          setUser(res.data);
          setName(res.data?.name);
        }catch(e){
          console.log(e);
        }
      }
      updateUser();
    },[data])
    
    useEffect(() => {
      if(currentUser && (id === currentUser?._id)){
        setSelf(true);
      }
      getProfileDetails();
    },[])

  return (
    <Container>
        <div className="pb-24 flex flex-col md:flex-row gap-3">
            <div className="md:w-1/3 lg:w-1/4">
                <div className="flex flex-col gap-3">
                    <div className="bg-white shadow-lg flex flex-col gap-3 items-center justify-center p-4">
                        <img src={user?.picture || '/images/placeholder.jpg'} alt="profile pic" className=' w-44 h-44 rounded-full' />
                        <div className="text-center flex flex-col">
                          {!editMode 
                          ? (<h3 className='text-xl font-semibold text-neutral-800'>{user?.name}</h3>)
                          : (
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className='border text-center text-xl font-semibold text-neutral-800 block' placeholder={name} />
                          )}
                          {!editMode
                          ? (<h6 className='font-light text-md text-neutral-500'>{role}</h6>)
                          : (<input type='text' name='role' value={role} onChange={(e) => setRole(e.target.value)} className='font-light text-md text-neutral-500 text-center border block flex-grow' placeholder={role} />) }
                        </div>
                        <div className="flex flex-row gap-5 text-sm font-semibold text-neutral-500 text-center">
                            <p>{profileData?.userObj?.followerIds.length || 0} Followers</p>
                            <p>{profileData?.userObj?.followingIds.length || 0} Followings</p>
                        </div>
                        {self && <button onClick={() => handleEdit()} className='text-center px-5 py-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:shadow-sm transition text-white text-xl font-semibold'>{editMode ? 'Submit':'Edit'}</button>}
                    </div>
                    {/* <div className="bg-white shadow-md p-4 flex flex-col gap-4 items-start">
                      <h3 className='font-semibold text-xl text-neutral-800'>Account Type</h3>
                      <label className='switch'>
        <input type='checkbox' checked={isSeller} onChange={toggleIsSeller} />
        <span className='slider round'></span>
      </label>
      <span className='ml-4'>
        {isSeller ? 'Seller' : 'Buyer'}
      </span>
                    </div> */}
                    <div className="bg-white shadow-lg p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800'>Achievements</h3>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Rating:- </h6>
                          <div className="flex flex-row">{getRatingStars(3)}</div>
                        </div>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Orders:- </h6>
                          <p>{totalOrders}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md">
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className='font-semibold text-lg text-neutral-800'>Testimonials</h3>
                            <div className="flex flex-nowrap overflow-x-auto">
                          {comments ? (comments.map((comment) => (
                            <div key={comment.id} className="flex-shrink-0 w-72 mr-4">
                                <ProfileComments data={comment} />
                            </div>
                          ))):(null)}
                        </div>
                        </div>
                    </div>
                    {profileData?.userObj?.isSeller && <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                              {self && <button  onClick={() => handleSkills()} className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>{editMode ? 'Submit':'+ Add'}</button>}
                            </div>
                            {editMode && (<div className="flex gap-2"><input type='text' name='skill' value={skill} onChange={(e) => setSkill(e.target.value)} placeholder='Enter skill' className='border text-center flex-grow'/><button className='' onClick={() => setEditMode(false)}>X</button></div>)}
                            <div className="flex flex-row gap-3 flex-wrap">
                              {skills && skills.map((skill, i) => (
                                  <div key={skill} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill}</div>
                              ))}
                            </div>
                        </div>
                    </div>}
                    <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          {self && <button onClick={() => handleContact()} className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>{editMode ? 'Submit':'Edit'}</button>}
                          </div>
                          {editMode && (
                            <div className="flex flex-row gap-2 relative items-center">
                              <button onClick={() => setIsOpen((p) => {return !p })} className='hover:cursor-pointer border px-1 text-neutral-500 bg-white '><MdArrowDropDown className='inline-block' size={20}  /></button>
                              {isOpen && (
                                <div className="absolute top-[106%] bg-white flex flex-col border text-sm font-semibold text-neutral-500">
                                  <p onClick={() => setSelectSocial('twitter')} className='border-b-[1px] py-1 px-2 hover:cursor-pointer hover:bg-gray-100'>Twitter</p>
                                  <p onClick={() => setSelectSocial('other')} className='py-1 px-2 hover:cursor-pointer hover:bg-gray-100'>Linkdeln</p>
                                </div>
                              )}
                              {selectSocial && (
                                selectSocial === 'twitter' ? <BsTwitter className='text-neutral-500' size={15} /> : <TiSocialLinkedin className='text-neutral-500' size={15} />
                              )}
                              <input onChange={(e) => setSocialLink(e.target.value)} type='text' placeholder='Enter home-link of your social' className='border text-xs text-center flex-grow p-1' />
                              <button className='' onClick={() => setEditMode(false)}>X</button>
                            </div>
                          )}
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            {user && user?.email && <div className='' onClick={() => ({})}><MdEmail size={28} className='hover:cursor-pointer'/></div>}
                            {user && user?.twitter && <div className='' onClick={() => ({})}><BsTwitter size={28} className='hover:cursor-pointer' /></div>}
                            {user && user?.linkedin && <div className='' onClick={() => ({})}><TiSocialLinkedin size={28} className='hover:cursor-pointer'/></div>}
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/3 lg:w-3/4 ">
                <div className="flex flex-col-reverse gap-6 shadow-sm bg-white">
                    <div className="shadow-sm bg-white flex flex-col gap-3 p-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>Community</h3>
                        {self ? (<div className="flex flex-row gap-3 justify-center">
                            <input onChange={(e) => setInputPost(e.target.value)} value={inputPost} type="text" placeholder='What on your mind?' className='p-4 bg-neutral-50 rounded-lg flex-grow text-center' />
                            <button disabled={inputPost ? false:true} onClick={() => {createPost()}} className='disabled:cursor-not-allowed text-green-500 hover:text-green-600'><AiFillPlusCircle size={46} /></button>
                        </div>):(
                          <p className='text-sm font-semibold text-neutral-500 text-center'>Stay updated on my latest gigs and projects by following me.</p>
                        )}
                        <div className="flex flex-col gap-4 bg-neutral-50 rounded-lg p-4 max-h-80 overflow-y-scroll scroll-smooth">
                            {commPost && commPost.slice().reverse().map((post) => (
                                <div className="bg-white rounded-md shadow-md w-fit p-2" key={post._id}>
                                    <div className="flex flex-row gap-3 items-center">
                                      <img src={user?.picture || '/images/placeholder.jpg'} alt="" className='w-7 h-7 rounded-full' />
                                      <p className='text-sm font-semibold text-neutral-500'>{post.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {profileData?.userObj?.isSeller && (<div className="shadow-lg bg-white p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>My Gig Dashboard</h3>
                        <p className='text-sm font-semibold text-neutral-500 text-center'>Manage your gigs and track their performance by <span className=' underline text-blue-500 hover:cursor-pointer'><Link to={`/profiledashboard/${id}`}>clicking here!</Link></span></p>
                        <div className="flex flex-nowrap overflow-x-auto scrollbar-none">
                          {userGigs ? (userGigs.map((gig) => (
                            <div key={gig._id} className="flex-shrink-0 w-72 mr-4">
                                <ListingCard data={gig} />
                            </div>
                          ))):(null)}
                        </div>
                    </div>)}
                </div>
            </div>
            {profileData?.userObj?.isSeller && (<div className="bg-neutral-50 shadow-md block md:hidden">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                              {self && <button className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>+ Add</button>}
                            </div>
                            <div className="flex flex-row gap-3 flex-wrap">
                              {skills && skills.map((skill, index) => (
                                  <div key={index} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill.name}</div>
                              ))}
                            </div>
                        </div>
                    </div>)}
                    <div className="bg-neutral-50 shadow-md block md:hidden">
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          {self && <button className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>Edit</button>}
                          </div>
                          {editMode && (
                            <div className="flex flex-row gap-3">
                              <button>Hi</button>
                            </div>
                          )}
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            <MdEmail size={28} className='hover:cursor-pointer'/>
                            <BsTwitter size={28} className='hover:cursor-pointer' />
                            <TiSocialLinkedin size={28} className='hover:cursor-pointer'/>
                            <MdArrowDropDown size={28} />
                          </div>
                        </div>
                    </div>
            {/* <div className="md:w-1/4">
                <div className="flex flex-col gap-3">
                    <div className="bg-white shadow-lg p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800'>Achievements</h3>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Rating:- </h6>
                          <div className="flex flex-row">{getRatingStars(3)}</div>
                        </div>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Orders:- </h6>
                          <p>55</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md">
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className='font-semibold text-lg text-neutral-800'>Testimonials</h3>
                            <div className="flex flex-nowrap overflow-x-auto">
                          {comments ? (comments.map((comment) => (
                            <div key={comment.id} className="flex-shrink-0 w-72 mr-4">
                                <ProfileComments data={comment} />
                            </div>
                          ))):(null)}
                        </div>
                        </div>
                    </div>
                    <div className="bg-neutral-50 shadow-md">
                        <div className="flex flex-col gap-4 p-4">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            <MdEmail size={28} className='hover:cursor-pointer'/>
                            <BsTwitter size={28} className='hover:cursor-pointer' />
                            <TiSocialLinkedin size={28} className='hover:cursor-pointer'/>
                          </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </Container>
  )
}

export default Profile
