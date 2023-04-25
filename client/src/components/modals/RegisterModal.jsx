import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import React, { useCallback, useState } from 'react'
import { toast } from "react-hot-toast";
import {useForm } from "react-hook-form";

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Modal from './Modal';
import Button from '../buttton/Button'
import Heading from '../heading/Heading'
import Input from '../inputs/Input'
import getGoogleUrl from '../../utils/getGoogleUrl';

const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { register, handleSubmit, formState: {errors,},} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        axios.post('http://localhost:8800/api/user/register', data)
        .then(() => {
            toast.success('Registered.');
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error) => {
            toast.error(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal, loginModal]);

    const handleGoogleLogin = async () => {
        console.log("here")
        const url = getGoogleUrl();
        console.log(url)
        window.location.href = url;
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Gigsteria" subtitle="Create an account" />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex gap-4 flex-col mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={handleGoogleLogin} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => ({})} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Log in</span>
                </p>
            </div>
        </div>
    )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
