import axios from 'axios';
import Cookies from 'js-cookie';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from "react-hot-toast";
import {useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import useNotificationModal from '../../hooks/useNotificationModal';
import Modal from './Modal';
import Button from '../buttton/Button'
import Heading from '../heading/Heading'
import Input from '../inputs/Input'
import getGoogleUrl from '../../utils/getGoogleUrl';

const NotificationModal = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const notificationModal = useNotificationModal();

    const getNotification = async () => {
        const res = await axios.get(`https://gigsteria-api.onrender.com/api/notification`, { withCredentials: true });
        setList(res.data);
    }

    const close = async () => {
        const res = await axios.put(`https://gigsteria-api.onrender.com/api/user`, { hasNotification: false }, { withCredentials: true});
        notificationModal.onClose();
    }

    useEffect(() => {
        if(notificationModal.isOpen){
            getNotification();
        }
    },[notificationModal.isOpen])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Notifications" subtitle="Stay up-to-date with your latest notifications!" />
            <div className="flex flex-col">
                {list && list.slice().reverse().map((item) => (
                    <div key={item._id} className="text-sm font-semibold border-b-[1px] border-neutral-500 text-neutral-500 py-2 hover:bg-neutral-50 hover:cursor-pointer">{item.body}</div>
                ))}
            </div>
        </div>
    )

  return (
    <Modal 
      isOpen={notificationModal.isOpen}
      title='Activity Feed'
    //   actionLabel="Continue"
      onClose={close}
    //   onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    //   footer={footerContent}
    />
  )
}

export default NotificationModal
