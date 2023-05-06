import React from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import { MdDesignServices, MdAddAPhoto } from 'react-icons/md'
import { GiSpiderWeb, GiClawHammer } from 'react-icons/gi';
import { TfiWrite } from 'react-icons/tfi';
import { SiStylelint } from 'react-icons/si'
import { BsCameraVideo, BsFileEarmarkMusic, BsCodeSlash, BsDatabaseDown } from 'react-icons/bs';



import useUploadGigModal from '../../hooks/useUploadGigModal.js';
import Modal from './Modal.jsx';
import CategoryInput from '../inputs/CategoryInput.jsx';
import Input from '../inputs/Input.jsx'
import Heading from '../heading/Heading.jsx';
import useRegisterModal from '../../hooks/useRegisterModal.js';
import ImageUpload from '../inputs/ImageUpload.jsx';

const STEPS = {
    CATEGORY: 0,
    INFO: 1,
    COVERIMG: 2,
    PRICE: 3,
    DELIVERYTIME: 4,
}

export const deliveryTimeCat = [
  {
    label: 'Day',
    // icon: MdDesignServices
  },
  {
    label: 'Week',
    // icon: MdDesignServices
  },
  {
    label: 'Month',
    // icon: MdDesignServices
  },]

export const categories = [
    {
      label: 'Graphic Design',
      icon: MdDesignServices,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Digital Marketing',
      icon: GiSpiderWeb,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Writing and Translation',
      icon: TfiWrite,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Video and Animation',
      icon: BsCameraVideo,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Music and Audio',
      icon: BsFileEarmarkMusic,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Programming',
      icon: BsCodeSlash,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Lifestyle',
      icon: SiStylelint,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Photography',
      icon: MdAddAPhoto,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Legal',
      icon: GiClawHammer,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Data Entry',
      icon: BsDatabaseDown,
      description: 'This property is close to the beach!',
    },
]

const UploadGigModal = () => {

    const uploadGigModal = useUploadGigModal();
    const registerModal = useRegisterModal();
    const [ isloading, setIsLoading ] = useState(false);
    const [ step, setStep ] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors,}, reset} = useForm({
        defaultValues: {
            cat: '',
            title: '',
            desc: '',
            coverImageSrc: '',
            price: '',
            deliveryTime: '',
        }
    });

    const cat =  watch('cat');
    const title = watch('title');
    const desc = watch('desc');
    const coverImageSrc = watch('coverImageSrc');
    const price = watch('price');
    const deliveryTime = watch('deliveryTime');

    const setCustomValue = ( id, value) => {
        setValue( id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit = (data) => {
        // if(!currentUser){
        //   registerModal.onOpen();
        // }
        if(step !== STEPS.DELIVERYTIME){
            return onNext();
        }
        setIsLoading(true);
        axios.post('http://localhost:8800/api/gigs', data,{
          withCredentials: true,
        })
        .then((res) => {
          console.log(res)
            toast.success('Gig created');
            
            reset();
            setStep(STEPS.CATEGORY);
            uploadGigModal.onClose();
        })
        .catch(() => {
            toast.error('something went wrong');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.DELIVERYTIME){
            return 'Create'
        }
        return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
          return undefined
        }
        return 'Back'
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='Which of these best describes your interest?' subtitle='Pick a category'/>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
               {categories.map((item) => (
                 <div className="col-span-1" key={item.label}>
                   <CategoryInput onClick={(cat) => setCustomValue('cat', cat)} selected={cat === item.label} label={item.label} icon={item.icon}/>
                 </div>
                ))}
             </div>
        </div>
    )

    if(step === STEPS.INFO){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="How would you describe your Gig?" subtitle="Tell us about your Gig!" />
            <Input id='title' label='Title' disabled={isloading} register={register} errors={errors} required />
            <hr />
            <Input id='desc' label='Description' disabled={isloading} register={register} errors={errors} required />
          </div>
        )
    }

    if(step === STEPS.COVERIMG){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Add a photo" subtitle="Showcase Your Brand with Stunning Images!" />
            <ImageUpload id='coverImageSrc' disabled={isloading} register={register} errors={errors} required value={coverImageSrc} onChange={(value) => setCustomValue('coverImageSrc', value)} />
          </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Now, set your price" subtitle="Set Your Price and Attract Potential Buyers" />
            <Input id='price' label='Price' disabled={isloading} register={register} errors={errors} required formatPrice type='number' />
          </div>
        )
    }

    if(step === STEPS.DELIVERYTIME){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Set Your Delivery Time" subtitle="Timely Delivery for Satisfied Customers! " />
          <Input id='deliveryTime' label='In Days' disabled={isloading} register={register} errors={errors} required type='number' />
        </div>
      )
  }

  return (
    <Modal 
      disabled={isloading}
      isOpen={uploadGigModal.isOpen}
      title='Create a Gig'
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined: onBack}
      onClose={uploadGigModal.onClose}
      body={bodyContent}
    />
  )
}

export default UploadGigModal
