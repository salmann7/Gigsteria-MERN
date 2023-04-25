import React from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import useUploadGigModal from '../../hooks/useUploadGigModal.js';
import Modal from './Modal.jsx';
import CategoryInput from '../inputs/CategoryInput.jsx';
import Input from '../inputs/Input.jsx'
import Heading from '../heading/Heading.jsx';

const STEPS = {
    CATEGORY: 0,
    INFO: 1,
    COVERIMG: 2,
    PRICE: 3,
}

export const categories = [
    {
      label: 'Beach',
    //   icon: TbBeach,
      description: 'This property is close to the beach!',
    },
]

const UploadGigModal = () => {

    const uploadGigModal = useUploadGigModal();
    const [ isloading, setIsLoading ] = useState(false);
    const [ step, setStep ] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors,}, reset} = useForm({
        defaultValues: {
            cat: '',
            title: '',
            desc: '',
            imageSrc: '',
            price: '',
        }
    });

    const cat =  watch('cat');
    const title = watch('title');
    const desc = watch('desc');
    const imageSrc = watch('imageSrc');
    const price = watch('price');

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
        if(step !== STEPS.PRICE){
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
        if(step === STEPS.PRICE){
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
            <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" />
            <Input id='title' label='Title' disabled={isloading} register={register} errors={errors} required />
            <hr />
            <Input id='desc' label='Description' disabled={isloading} register={register} errors={errors} required />
          </div>
        )
    }

    if(step === STEPS.COVERIMG){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
            {/* <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} /> */}
          </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
            <Input id='price' label='Price' disabled={isloading} register={register} errors={errors} required formatPrice type='number' />
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
