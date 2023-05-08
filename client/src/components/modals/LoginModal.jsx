import axios from 'axios';
import Cookies from 'js-cookie';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import React, { useCallback, useState } from 'react'
import { toast } from "react-hot-toast";
import {useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Modal from './Modal';
import Button from '../buttton/Button'
import Heading from '../heading/Heading'
import Input from '../inputs/Input'
import getGoogleUrl from '../../utils/getGoogleUrl';

const LoginModal = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { register, handleSubmit, formState: {errors,},} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        axios.post('https://gigsteria-api.onrender.com/api/auth/login', data,
          {
            withCredentials: true,
          })
        .then(( res ) => {
            // console.log('Setting cookies...');
            // Cookies.set('accessToken', res.data.accessToken);
            // Cookies.set('refreshToken', res.data.refreshToken);
            console.log(Cookies.get());
            toast.success('Logged in.');
            loginModal.onClose();
            // history.go(0); // Refresh the page
            navigate("/");
            // window.location.reload();
            
        })
        .catch((error) => {
            toast.error(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[registerModal, loginModal]);

    const handleGoogleLogin = async () => {
        console.log("here")
        const url = getGoogleUrl();
        console.log(url)
        window.location.href = url;
        // navigate("/session-timed-out");
        // const res = await axios.get(url);
        // console.log(res);
        // console.log('Setting cookies...');
        //     Cookies.set('accessToken', res.data.accessToken);
        //     Cookies.set('refreshToken', res.data.refreshToken);
        //     console.log(Cookies.get());
        //     toast.success('Logged in.');
        //     loginModal.onClose();
            // history.go(0); // Refresh the page
            // window.location.reload();
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex gap-4 flex-col mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={handleGoogleLogin} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => (getGoogleUrl())} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>First time using Gigsteria?
                    <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Create an account</span>
                </p>
            </div>
        </div>
    )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
