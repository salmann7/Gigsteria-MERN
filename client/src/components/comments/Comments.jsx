import React from 'react'
import Container from '../container/Container'
import { BiUserCircle } from 'react-icons/bi'
import { BsFillStarFill } from 'react-icons/bs'
import Slider from 'infinite-react-carousel'
import Avatar from '../avatar/Avatar'

const Comments = () => {
    const data = [
        {
            id: 2,
            username: 'Cilian Murphy',
            profilePic: '/images/placeholder.jpg',
            comment: "I've been using this platform for a few months now, and I've been blown away by the quality of the freelancers I've found. Not only have they delivered high-quality work, but they've also been a pleasure to work with. I highly recommend this platform to anyone looking for top-notch freelancers.",
            rating: 4
        },
        {
            id: 3,
            username: 'Tom Hardy',
            profilePic: '/images/placeholder.jpg',
            comment: "I was hesitant to try yet another freelancer platform, but I'm so glad I did. The search function is incredibly powerful, and I was able to find the perfect freelancer for my project in just a few clicks. The messaging system also made it easy to communicate with my freelancer and ensure that everything was on track.",
            rating: 5
        },
        {
            id: 4,
            username: 'Harvey Spector',
            profilePic: '/images/placeholder.jpg',
            comment: "As a freelancer, I've been blown away by the quality of clients I've found on this platform. The payment system is also incredibly secure and reliable, so I never have to worry about getting paid for my work. I highly recommend this platform to any freelancer looking for quality clients and a hassle-free experience.",
            rating: 3.5
        },
        {
            id: 5,
            username: 'John Snow',
            profilePic: '/images/placeholder.jpg',
            comment: "I've used a number of freelancer platforms in the past, but this one stands out for its exceptional customer service. Whenever I've had a question or issue, the support team has been incredibly responsive and helpful. It's clear that they truly care about their users and their experience on the platform.",
            rating: 4.5
        },
        {
            id: 6,
            username: 'Ross Michael',
            profilePic: '/images/placeholder.jpg',
            comment: "I've been using this platform for a few months now, and I've been blown away by the quality of the freelancers I've found. Not only have they delivered high-quality work, but they've also been a pleasure to work with. I highly recommend this platform to anyone looking for top-notch freelancers.",
            rating: 5
        },
        {
            id: 7,
            username: 'Rachel Dice',
            profilePic: '/images/placeholder.jpg',
            comment: "I've been using this platform for a few months now, and I've been blown away by the quality of the freelancers I've found. Not only have they delivered high-quality work, but they've also been a pleasure to work with. I highly recommend this platform to anyone looking for top-notch freelancers.",
            rating: 4
        }
    ]
    const getRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<BsFillStarFill key={i} size={20} className="text-yellow-400" />);
          } else {
            stars.push(<BsFillStarFill key={i} size={20} className="text-gray-300" />);
          }
        }
        return stars;
      };
  return (
    <div className='bg-green-50 py-10'>
      <Container>
        <div className="text-center text-4xl font-bold text-neutral-700 py-10">Check Out What Our <span className='text-blue-800'>Users <BiUserCircle  className=' inline'/></span> Have to Say</div>
        <Slider slidesPerRow={4}>
            {data.map((review) => (
                <div className="flex flex-row gap-4 my-2" key={review.id}>
                    <div className="min-w-[280px] min-h-[320px] max-h-[400px] bg-white w-1/4 gap-4 rounded-3xl shadow-md flex flex-col px-5 py-10">
                      <div className="flex flex-row">{getRatingStars(review.rating)}</div>
                      <div className="text-neutral-500 leading-5">{'"'+review.comment+'"'}</div>
                      <div className="flex flex-row gap-4 cursor-pointer">
                        <Avatar src={review.profilePic} />
                        <div className="font-semibold text-md">{review.username}</div>
                      </div>
                </div>
                </div>
            ))}
        </Slider>
      </Container>
    </div>
  )
}

export default Comments
