import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Container from '../container/Container';
import HeartButton from '../heartButton/HeartButton';
import usePaymentModal from '../../hooks/usePaymentModal';

const SingleGig = ({ currentUser }) => {
  const { id } = useParams();
  const [ gig, setGig ] = useState({});
  const [ gigUser, setGigUser ] = useState({});
  const paymentModal = usePaymentModal();
  const [ user, setUser ] = useState({});
  const [ heartClick, setHeartClick ] = useState(false);
  // const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user/${currentUser._id}`);
      setUser(res.data);
    }
    getUser();
  },[heartClick, gig]);


  useEffect(() => {
    const getGigInfo = async () => {
      const res = await axios.get(`http://localhost:8800/api/gigs/single/${id}`)
      console.log(res.data);
      setGig(res.data);
    }
    getGigInfo();
    
  },[])

  useEffect(() => {
    const getGigUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user/${gig?.user}`)
      setGigUser(res.data);
      console.log(res.data);
    }
    getGigUser();
  },[gig]);

  const handleSubmitOrder = async () => {
    paymentModal.onOpen();
    // try{
    //   const data = gig;
    //   const res = await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
    //     withCredentials: true,
    //   })
      
    // if(clientSecret ){
    //   const paymentIntent = async () => {
    //     try{
    //         const data = id;
    //         const res = await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
    //           withCredentials: true,
    //         });
    //         console.log(res.data.clientSecret);
    //         setClientSecret(res.data.clientSecret);
    //       } catch(e){
    //         console.log(e);
    //       }
    // }
       
    // }
    // } catch(e){
    //   console.log(e);
    // }
    // try{
    //   const data = gig;
    //   const res = await axios.post(`http://localhost:8800/api/orders/create-checkout-session`, data, {
    //     withCredentials: true,
    //   });
    //   console.log(res.data);
    //   window.location.href = res.data.url;
    // } catch(e) {
    //   console.log(e);
    // }
  }

  return (
    <Container>
      <div className="pb-24 flex flex-col md:flex-row gap-3">
        <div className="md:w-3/4 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-4 p-6">
          <div className="flex flex-row justify-between gap-3">
          <h2 className='font-bold text-neutral-800 text-3xl'>{gig.title}</h2>
          <div className="" onClick={() => setHeartClick((p)=>!p)}><HeartButton gigId={gig._id} user={user} /></div>
          </div>
          <div className="w-full h-60 sm:h-96">
            <img src={`${gig?.coverImageSrc}`} alt="cover image" className='object-cover md:object-contain h-full w-full' />
          </div>
          <div className="">
            <h3 className='font-semibold text-2xl pb-4'>About this gig</h3>
            <p className='text-neutral-800 text-xl'>{gig.desc}</p>
          </div>
          <hr />
        </div>
        <div className="md:w-1/4 flex flex-col gap-3">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg">
  <div class="px-6 py-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Order Now</h3>
    <p class="text-gray-600 mb-4">Get your project done quickly and professionally with our premium service.</p>
    <div class="flex justify-between items-center border-t border-gray-300 pt-6 mt-6">
      <div>
        <p class="text-gray-600 font-semibold">Price</p>
        <p class="text-3xl font-bold text-primary-500">${gig.price}</p>
      </div>
      <div>
        <p class="text-gray-600 font-semibold">Delivery Time</p>
        <p class="text-3xl font-bold text-primary-500">{gig.deliveryTime} Days</p>
      </div>
    </div>
  </div>
  <div class="px-6 py-4 bg-neutral-50 border-t border-gray-300 flex justify-center items-center">
  {/* <form action="http://localhost:8800/api/orders/create-checkout-session" method="POST" > */}
  {/* <input type="hidden" name="gig_id" value={id} /> */}
    {/* <Link to={`/payment/${id}`}> */}
      <button onClick={handleSubmitOrder}  class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline-green transition duration-150 ease-in-out">Order Now</button>
    {/* </Link> */}
    {/* <form action="/create-checkout-session" method="POST"> */}
      {/* <button type="submit" onClick={handleSubmitOrder}>
        Checkout
      </button> */}
    {/* </form> */}
  </div>
</div>

          <div className="bg-neutral-50 rounded-xl shadow-sm max-h-96">
            <div className="flex flex-col items-center py-6 gap-3">
              <h3 className='font-semibold text-neutral-500 text-xl'>About the Seller</h3>
              {/* <div className=""> */}
                <img src={`${gigUser?.picture}` || '/images/placeholder.jpg'} alt="profile photo" className='rounded-full h-28 w-28 shadow-sm'/>
              {/* </div> */}
              <div className="text-center">
                <h3 className='font-semibold text-lg text-neutral-800 uppercase'>{gigUser?.name}</h3>
                {/* <h6 className='font-light text-xs text-neutral-800'>{gigUser?.email}</h6> */}
              </div>
              <p className='font-semibold text-neutral-500'>Programmer</p>
              <Link className='text-md font-semibold text-blue-500 underline' to={(currentUser && currentUser._id === gig?.user) ? (`/myprofile/${gig?.user}`):(`/profile/${gig?.user}`)}>Check profile</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SingleGig
