import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ListingCard from '../listingCard/ListingCard';
// import { data } from '../comments/Comments';
import ProfileComments from './ProfileComments';
import { MdEmail, MdArrowDropDown } from 'react-icons/md';
import { BsTwitter } from 'react-icons/bs';
import { TiSocialLinkedin } from 'react-icons/ti';
import { BsFillStarFill } from 'react-icons/bs'

import api from '../../utils/apiCall.js';


const ProfileOther = ({
  currentUser
}) => {
    const { id } = useParams();
    const [ followerList, setFollowerList ] = useState([]);
    const [ followingList, setFollowingList ] = useState([]);
    const [ isFollowing, setIsFollowing ] = useState(false);
    const [profileData, setProfileData] = useState({});
    const comments = [];

    const getProfileDetails = async () => {
      try{
        const res = await api.get(`/api/profile/${id}`);
        console.log(res.data);
        setProfileData(res.data);
        if(res.data?.userObj?.followerIds.includes(currentUser?._id)){
          setIsFollowing(true);
        }
        setFollowerList(res.data?.userObj?.followerIds);
        setFollowingList(res.data?.userObj?.followingIds);
      }catch(e){
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

    const handleFollow = async () => {
      if(isFollowing){
       //unfollow logic 
        const filteredFollowerList = followerList.filter(id => id !== currentUser?._id);
        setFollowerList(filteredFollowerList);
        removeFollower();
      } else{
        //follow logic
        followerList.push(currentUser?._id);
        addFollower();
      }
    }

      const addFollower = async () => {
        try{
          const res = await api.put(`/api/user/add/${id}`, {followerIds: followerList});
          setIsFollowing(true);
        } catch(e){
          console.log(e);
        }
      }

      const removeFollower = async () => {
        try{
          const res = await api.put(`/api/user/remove/${id}`, {followerIds: followerList});
          setIsFollowing(false);
        } catch(e){
          console.log(e);
        }
      }
    
    useEffect(() => {
      getProfileDetails();
    },[])

  return (
    <Container>
        <div className="pb-24 flex flex-col md:flex-row gap-3">
            <div className="md:w-1/3 lg:w-1/4">
                <div className="flex flex-col gap-3">
                    <div className="bg-white shadow-lg flex flex-col gap-3 items-center justify-center p-4">
                        <img src={profileData?.userObj?.picture || '/images/placeholder.jpg'} alt="profile pic" className=' w-44 h-44 rounded-full' />
                        <div className="text-center flex flex-col">
                          <h3 className='text-xl font-semibold text-neutral-800'>{profileData?.userObj?.name}</h3>
                          <h6 className='font-light text-md text-neutral-500'>{profileData?.userObj?.role}</h6>
                        </div>
                        <div className="flex flex-row gap-5 text-sm font-semibold text-neutral-500 text-center">
                            <p>{(followerList && followerList.length) || "0"} Followers</p>
                            <p>{(followingList && followingList.length) || '0'} Followings</p>
                        </div>
                        <button onClick={() => {handleFollow()}} className='text-center px-5 py-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:shadow-sm transition text-white text-xl font-semibold'>{isFollowing ? 'Unfollow':'Follow'}</button>
                    </div>
                    <div className="bg-white shadow-lg p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800'>Achievements</h3>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Rating:- </h6>
                          <div className="flex flex-row">{getRatingStars(3)}</div>
                        </div>
                        <div className="flex flex-row justify-between text-neutral-500 font-semibold text-sm">
                          <h6>Total Orders:- </h6>
                          <p>{profileData?.orderLength}</p>
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
                    <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                            </div>
                            <div className="flex flex-row gap-3 flex-wrap">
                              {profileData?.userObj?.skills && profileData?.userObj?.skills.map((skill, i) => (
                                  <div key={skill} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill}</div>
                              ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          </div>
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            {profileData?.userObj && profileData?.userObj?.email && <div className='' onClick={() => ({})}><MdEmail size={28} className='hover:cursor-pointer'/></div>}
                            {profileData?.userObj && profileData?.userObj?.twitter && <div className='' onClick={() => ({})}><BsTwitter size={28} className='hover:cursor-pointer' /></div>}
                            {profileData?.userObj && profileData?.userObj?.linkedin && <div className='' onClick={() => ({})}><TiSocialLinkedin size={28} className='hover:cursor-pointer'/></div>}
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/3 lg:w-3/4 ">
                <div className="flex flex-col-reverse gap-6 shadow-sm bg-white">
                    <div className="shadow-sm bg-white flex flex-col gap-3 p-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>Community</h3>
                        <p className='text-sm font-semibold text-neutral-500 text-center'>Stay updated on my latest gigs and projects by following me.</p>
                        <div className="flex flex-col gap-4 bg-neutral-50 rounded-lg p-4 max-h-80 overflow-y-scroll scroll-smooth">
                            {profileData?.commObj && profileData?.commObj.slice().reverse().map((post) => (
                                <div className="bg-white rounded-md shadow-md w-fit p-2" key={post._id}>
                                    <div className="flex flex-row gap-3 items-center">
                                      <img src={profileData?.userObj?.picture || '/images/placeholder.jpg'} alt="" className='w-7 h-7 rounded-full' />
                                      <p className='text-sm font-semibold text-neutral-500'>{post.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="shadow-lg bg-white p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>Check out my list of top-rated gigs</h3>
                        <p className='text-sm font-semibold text-neutral-500 text-center'>Explore all my Gigs by <span className=' underline text-blue-500 hover:cursor-pointer'><Link to={`/profiledashboard/${id}`}>clicking here!</Link></span></p>
                        <div className="flex flex-nowrap overflow-x-auto scrollbar-none">
                          {profileData?.userGigObj ? (profileData?.userGigObj.map((gig) => (
                            <div key={gig._id} className="flex-shrink-0 w-72 mr-4">
                                <ListingCard data={gig} />
                            </div>
                          ))):(null)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-50 shadow-md block md:hidden">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                            </div>
                            <div className="flex flex-row gap-3 flex-wrap">
                              {profileData?.userObj?.skills && profileData?.userObj?.skills.map((skill, index) => (
                                  <div key={index} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill.name}</div>
                              ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-50 shadow-md block md:hidden">
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          </div>
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            {profileData?.userObj && profileData?.userObj?.email && <div className='' onClick={() => ({})}><MdEmail size={28} className='hover:cursor-pointer'/></div>}
                            {profileData?.userObj && profileData?.userObj?.twitter && <div className='' onClick={() => ({})}><BsTwitter size={28} className='hover:cursor-pointer' /></div>}
                            {profileData?.userObj && profileData?.userObj?.linkedin && <div className='' onClick={() => ({})}><TiSocialLinkedin size={28} className='hover:cursor-pointer'/></div>}
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

export default ProfileOther
