import axios from 'axios';
import Cookies from 'js-cookie';
import { AiFillGithub, AiOutlineUsergroupDelete } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from "react-hot-toast";
import {useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { useHistory } from 'react-router-dom';

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Modal from './Modal';
import Button from '../buttton/Button'
import Heading from '../heading/Heading'
import Input from '../inputs/Input'
import getGoogleUrl from '../../utils/getGoogleUrl';
import CheckoutForm from '../checkoutForm/CheckoutForm';

import './paymentModal.css';
import usePaymentModal from '../../hooks/usePaymentModal';


const stripePromise = loadStripe("pk_test_51N1dqRSF8yPcIvMfd48NGKyCUOW1oqslCuCTmdmktbjICuO4xE4mRwj2JS92aLcNzEE7P1ad6wdIHRssAQlPPZq00042hshfdD");

const STEP = {
    CARDDETAIL: 0,
    SUCCESS: 1,
    FAILURE: 2
}

const PaymentModal = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // const registerModal = useRegisterModal();
    // const loginModal = useLoginModal();
    const location = useLocation();
    console.log(location);
    const [ step, setStep ] = useState(STEP.CATEGORY);

    const [clientSecret, setClientSecret] = useState("");
    // const { id } = useParams();
    const id = location.pathname.split('/')[2];
    const paymentModalHook = usePaymentModal();

    useEffect(() => {
        if(paymentModalHook.isOpen){
            const paymentIntent = async () => {
            try{
                const data = id;
                console.log("inside payment modal" + id)
                const res = await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
                  withCredentials: true,
                });
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
              } catch(e){
                console.log(e);
              }
        }
        paymentIntent();
    }
    },[paymentModalHook.isOpen])

    useEffect(() => {
        if(location?.search === '?payment_success=true'){
            setStep(STEP.SUCCESS);
        }
        if(location?.search === '?payment_success=false'){
            setStep(STEP.FAILURE);
        }
    },[location])

    

    // useEffect(() => {
    //     console.log(clientSecret);
        
    //     const paymentIntent = async () => {
    //         try{
    //             const data = id;
    //             const res = await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
    //               withCredentials: true,
    //             });
    //             console.log(res.data.clientSecret);
    //             setClientSecret(res.data.clientSecret);
    //           } catch(e){
    //             console.log(e);
    //           }
    //     }
    //     if(clientSecret, paymentModalHook.isOpen ){
    //         paymentIntent();
    //     }
    //     return;
    // },[clientSecret]);


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    // const { register, handleSubmit, formState: {errors,},} = useForm({
    //     defaultValues: {
    //         email: '',
    //         password: ''
    //     },
    // });

    // const onSubmit = async (data) => {
    //     setIsLoading(true);
    //     await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
    //     withCredentials: true,
    //   })

    //     .then(( res ) => {
    //         // console.log('Setting cookies...');
    //         // Cookies.set('accessToken', res.data.accessToken);
    //         // Cookies.set('refreshToken', res.data.refreshToken);
    //         // console.log(Cookies.get());
    //         // toast.success('Logged in.');
    //         // loginModal.onClose();
    //         // history.go(0); // Refresh the page
    //         // navigate("/");
    //         // window.location.reload();
            
    //     })
    //     .catch((error) => {
    //         toast.error(error);
    //     })
    //     .finally(() => {
    //         setIsLoading(false);
    //     })
    // }

    // const onToggle = useCallback(() => {
    //     loginModal.onClose();
    //     registerModal.onOpen();
    // },[registerModal, loginModal]);

    // const handleGoogleLogin = async () => {
    //     console.log("here")
    //     const url = getGoogleUrl();
    //     console.log(url)
    //     window.location.href = url;
    //     // navigate("/session-timed-out");
    //     // const res = await axios.get(url);
    //     // console.log(res);
    //     // console.log('Setting cookies...');
    //     //     Cookies.set('accessToken', res.data.accessToken);
    //     //     Cookies.set('refreshToken', res.data.refreshToken);
    //     //     console.log(Cookies.get());
    //     //     toast.success('Logged in.');
    //     //     loginModal.onClose();
    //         // history.go(0); // Refresh the page
    //         // window.location.reload();
    // }

    
    let bodyContent = (
        
        <div>
            {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
    )

    // if(location?.search === '?payment_success=true'){
    //     setStep(STEP.SUCCESS);
    // }

    if(step === STEP.SUCCESS){
        bodyContent = (
            <div className="">
                Success
            </div>
        )
    }

    if(step === STEP.FAILURE){
        bodyContent = (
            <div className="">
                failure
            </div>
        )
    }

    const onCloseReset = () => {
        setStep(STEP.CARDDETAIL);
        paymentModalHook.onClose();

    }
    // const footerContent = (
    //     <div className="flex gap-4 flex-col mt-3">
    //         <hr />
    //         <Button outline label="Continue with Google" icon={FcGoogle} onClick={handleGoogleLogin} />
    //         <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => (getGoogleUrl())} />
    //         <div className="text-neutral-500 text-center mt-4 font-light">
    //             <p>First time using Gigsteria?
    //                 <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Create an account</span>
    //             </p>
    //         </div>
    //     </div>
    // )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={paymentModalHook.isOpen}
      title='Payment'
    //   actionLabel="Continue"
      onClose={onCloseReset}
    //   onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    //   footer={footerContent}
    />
  )
}

export default PaymentModal
