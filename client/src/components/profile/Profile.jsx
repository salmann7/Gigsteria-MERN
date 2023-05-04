import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { AiFillPlusCircle } from 'react-icons/ai'
import ListingCard from '../listingCard/ListingCard';
// import { data } from '../comments/Comments';
import ProfileComments from './ProfileComments';
import { MdEmail } from 'react-icons/md';
import { BsTwitter } from 'react-icons/bs';
import { TiSocialLinkedin } from 'react-icons/ti';
import { BsFillStarFill } from 'react-icons/bs'

// const skills = [
//     {
//         id:2,
//         name:'css'
//     },
//     {
//         id:3,
//         name:'html'
//     },
//     {
//         id:4,
//         name:'reactjs'
//     },
//     {
//         id:5,
//         name:'nodejs'
//     },
//     {
//         id:6,
//         name:'web'
//     },
//     {
//         id:7,
//         name:'angular'
//     }

// ]

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
    // let tempSkills = skills;
    const [ skill, setSkill ] = useState('');
    const [ self, setSelf ] = useState(false);
    const [ editMode, setEditMode ] = useState(false);
    const [data, setData] = useState(user || {});
    const comments = [];

    const getUser = async () => {
        const res = await axios.get(`http://localhost:8800/api/user/${id}`)
        setUser(res.data);
    }

    const getGigs = async () => {
        const res = await axios.get(`http://localhost:8800/api/gigs/${id}`)
        setUserGigs(res.data);
    }

    const getCommPosts = async () => {
      const res = await axios.get(`http://localhost:8800/api/communityPosts/${id}`);
      setCommPost(res.data.userPosts);
    }

    const createPost = async () => {
      try{
        const res = await axios.post(`http://localhost:8800/api/communityPosts`, {
          desc: inputPost,
        },
        {
          withCredentials: true,
        });

        setInputPost('');
        
        getCommPosts();
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
    }

    const handleSkills = async () => {
      if(!editMode){
        setEditMode(true);
      } else {
        // tempSkills.push(skill);
        skills.push(skill);
        // setSkills([...skills, [tempSkills]]);
        setData({...data, skills});
        setEditMode(false);
        setSkill(null);
      }
      
    }

    const handleContact = async () => {
      if(!editMode){
        setEditMode(true);
      } else {
        setEditMode(false);
      }
      
    }

    const handleFollow = async () => {
      if(!editMode){
        console.log("here in edit mode on")
        setEditMode(true);
      } else {
        console.log("here in edit mode off")
        setEditMode(false);
      }
    }

    useEffect(() => {
      const updateUser = async () => {
        try{
          const res = await axios.put('http://localhost:8800/api/user', data , { withCredentials: true});
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
        getUser();
        getGigs();
        getCommPosts();
    },[])

    useEffect(() => {
      setSkills(user?.skills)
    },[user])

  return (
    <Container>
        <div className="pb-24 flex flex-col md:flex-row gap-3">
            <div className="md:w-1/3 lg:w-1/4">
                <div className="flex flex-col gap-3">
                    <div className="bg-white shadow-lg flex flex-col gap-3 items-center justify-center p-4">
                        <img src={user?.picture || '/images/placeholder.jpg'} alt="profile pic" className=' w-44 h-44 rounded-full' />
                        <div className="text-center">
                          {!editMode 
                          ? (<h3 className='text-xl font-semibold text-neutral-800'>{user?.name}</h3>)
                          : (
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className='border text-center text-xl font-semibold text-neutral-800 block' placeholder={name} />
                          )}
                          {!editMode
                          ? (<h6 className='font-light text-md text-neutral-500'>{role}</h6>)
                          : (<input type='text' name='role' value={role} onChange={(e) => setRole(e.target.value)} className='font-light text-md text-neutral-500 text-center border block' placeholder={role} />) }
                        </div>
                        <div className="flex flex-row gap-5 text-sm font-semibold text-neutral-500 text-center">
                            <p>99 Followers</p>
                            <p>75 Followings</p>
                        </div>
                        {self && <button onClick={() => handleEdit()} className='text-center px-5 py-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:shadow-sm transition text-white text-xl font-semibold'>{editMode ? 'Submit':'Edit'}</button>}
                        
                        {!self && <button onClick={() => {handleFollow()}} className='text-center px-5 py-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:shadow-sm transition text-white text-xl font-semibold'>Follow</button>}
                    </div>
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
                    <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex flex-row justify-between">
                              <h3 className='font-semibold text-neutral-800 text-xl'>Skills</h3>
                              {self && <button  onClick={() => handleSkills()} className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>{editMode ? 'Submit':'+ Add'}</button>}
                            </div>
                            {editMode && (<div className=""><input type='text' name='skill' value={skill} onChange={(e) => setSkill(e.target.value)} placeholder='Enter skill' className='border text-center'/><button className='ml-2' onClick={() => setEditMode(false)}>X</button></div>)}
                            <div className="flex flex-row gap-3 flex-wrap">
                              {skills && skills.map((skill, i) => (
                                  <div key={skill} className="hover:cursor-pointer bg-green-50 text-green-500 text-sm px-4 py-2">{skill}</div>
                              ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-50 shadow-md hidden md:block">
                        <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          {self && <button onClick={() => handleContact()} className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>{editMode ? 'Submit':'Edit'}</button>}
                          </div>
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            <MdEmail size={28} className='hover:cursor-pointer'/>
                            <BsTwitter size={28} className='hover:cursor-pointer' />
                            <TiSocialLinkedin size={28} className='hover:cursor-pointer'/>
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
            <div className="bg-neutral-50 shadow-md block md:hidden">
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
                    </div>
                    <div className="bg-neutral-50 shadow-md block md:hidden">
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex flex-row justify-between">
                          <h3 className='font-semibold text-lg text-neutral-800'>Contacts</h3>
                          {self && <button className='text-white text-xs px-4 py-2 bg-blue-400 rounded-full border-none hover:bg-blue-500 hover:cursor-pointer hover:shadow-sm'>Edit</button>}
                          </div>
                          
                          <div className="flex flex-row gap-4 text-gray-700 justify-around">
                            <MdEmail size={28} className='hover:cursor-pointer'/>
                            <BsTwitter size={28} className='hover:cursor-pointer' />
                            <TiSocialLinkedin size={28} className='hover:cursor-pointer'/>
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
