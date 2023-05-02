import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { AiFillPlusCircle } from 'react-icons/ai'
import ListingCard from '../listingCard/ListingCard';
import { data } from '../comments/Comments';
import ProfileComments from './ProfileComments';
import { MdEmail } from 'react-icons/md';
import { BsTwitter } from 'react-icons/bs';
import { TiSocialLinkedin } from 'react-icons/ti';
import { BsFillStarFill } from 'react-icons/bs'

const skills = [
    {
        id:2,
        name:'css'
    },
    {
        id:3,
        name:'html'
    },
    {
        id:4,
        name:'reactjs'
    },
    {
        id:5,
        name:'nodejs'
    },
    {
        id:6,
        name:'web'
    },
    {
        id:7,
        name:'angular'
    }

]

const communityPosts = [
    {
        id: 8,
        desc: 'this is my first post'
    },
    {
        id: 9,
        desc: 'new'
    }
]

const Profile = () => {
    const { id } = useParams();
    const [ user, setUser ] = useState({});
    const [ userGigs, setUserGigs ] = useState([]);
    const comments = data;

    const getUser = async () => {
        const res = await axios.get(`http://localhost:8800/api/user/${id}`)
        setUser(res.data);
    }

    const getGigs = async () => {
        const res = await axios.get(`http://localhost:8800/api/gigs/${id}`)
        setUserGigs(res.data);
        console.log(res.data);
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
    
    useEffect(() => {
        getUser();
        getGigs();
        console.log(user);
    },[])
  return (
    <Container>
        <div className="pb-24 flex flex-col md:flex-row gap-3">
            <div className="md:w-1/4">
                <div className="flex flex-col gap-3">
                    <div className="bg-white shadow-lg flex flex-col gap-3 items-center justify-center p-4">
                        <img src={user?.picture || '/images/placeholder.jpg'} alt="profile pic" className=' w-44 h-44 rounded-full' />
                        <div className="text-center">
                          <h3 className='text-xl font-semibold text-neutral-800'>{user?.name}</h3>
                          <h6 className='font-light text-md text-neutral-500'>Programmer</h6>
                        </div>
                        <div className="flex flex-row gap-5 text-sm font-semibold text-neutral-500 text-center">
                            <p>99 Followers</p>
                            <p>75 Followings</p>
                        </div>
                        <button className='text-center px-5 py-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:shadow-sm transition text-white text-xl font-semibold'>Follow</button>
                    </div>
                    <div className="bg-neutral-50 shadow-md">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                              <button className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>+ Add</button>
                            </div>
                            <div className="flex flex-row gap-3 flex-wrap">
                              {skills.map((skill) => (
                                  <div key={skill.id} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill.name}</div>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/4 ">
                <div className="flex flex-col gap-6 shadow-sm bg-white">
                    <div className="shadow-sm bg-white flex flex-col gap-3 p-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>Community</h3>
                        <div className="flex flex-row gap-3 justify-center">
                            <input type="text" placeholder='What on your mind?' className='p-4 bg-neutral-50 rounded-lg flex-grow text-center' />
                            <button className='text-green-500 hover:text-green-600'><AiFillPlusCircle size={46} /></button>
                        </div>
                        <div className="flex flex-col-reverse gap-4 bg-neutral-50 rounded-lg p-4 max-h-80 overflow-y-scroll scroll-smooth">
                            {communityPosts.map((post) => (
                                <div className="bg-white rounded-md shadow-md w-fit p-2" key={post.id}>
                                    <div className="flex flex-row gap-3 items-center">
                                      <img src={user?.picture || '/images/placeholder.jpg'} alt="" className='w-7 h-7 rounded-full' />
                                      <p className='text-sm font-semibold text-neutral-500'>{post.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="shadow-lg bg-white p-4 flex flex-col gap-4">
                        <h3 className='font-semibold text-lg text-neutral-800 text-center'>Check out my list of top-rated gigs</h3>
                        <p className='text-sm font-semibold text-neutral-500 text-center'>Explore all my Gigs by <span className=' underline text-blue-500 hover:cursor-pointer'>clicking here!</span></p>
                        <div className="flex flex-nowrap overflow-x-auto scrollbar-none">
                          {userGigs ? (userGigs.map((gig) => (
                            <div key={gig._id} className="flex-shrink-0 w-72 mr-4">
                                <ListingCard data={gig} />
                            </div>
                          ))):(null)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/4">
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
            </div>
        </div>
    </Container>
  )
}

export default Profile
