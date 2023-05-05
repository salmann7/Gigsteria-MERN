import React from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from "query-string";

import Modal from './Modal.jsx';
import Input from '../inputs/Input.jsx'
import Heading from '../heading/Heading.jsx';
import useSearchModal from '../../hooks/useSearchModal.js';

const STEPS = {
    TITLE: 0,
    PRICE: 1
}

const SearchModal = ({
    currentUser
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchModal = useSearchModal();
    const [ isloading, setIsLoading ] = useState(false);
    const [ step, setStep ] = useState(STEPS.TITLE);
    const [range, setRange] = useState({ min: 0, max: 9999 });

    const { register, handleSubmit, setValue, watch, formState: { errors,}, reset} = useForm({
        defaultValues: {
            title: '',
            price: {
                min: range.min,
                max: range.max,
            }
        }
    });

    const title = watch('title');
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

    const handleChange = (value) => {
        setRange({ min: value[0], max: value[1] });
        setCustomValue('price', range);
    }

    const onSubmit = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);
        console.log(data);
        let currentQuery = {};

        if(queryParams){
            currentQuery = qs.parse(qs.stringify(queryParams))
        }

        const updatedQuery = {
            ...currentQuery,
            search: data?.title,
            min: data?.price?.min,
            max: data?.price?.max,
        }


        if(currentUser){
           const url = qs.stringifyUrl({
             url: '/',
             query: updatedQuery
           },{ skipNull: true});
           navigate(url);
        } else{
           const url = qs.stringifyUrl({
             url: '/dashboard',
             query: updatedQuery
           },{ skipNull: true});
           navigate(url);
        }
        setStep(STEPS.TITLE);
        searchModal.onClose();
        setIsLoading(false);
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Find'
        }
        return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.TITLE){
          return undefined
        }
        return 'Back'
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='Find Your Perfect Gig Today' subtitle='Search gig titles to find the perfect match for your project needs.'/>
            <Input id='title' label='Title' disabled={isloading} register={register} errors={errors} required />
        </div>
    )

    if(step === STEPS.PRICE){
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Filter Gigs by Price Range" subtitle="Use the slider below to search for gigs that fit your budget." />
            <div className='flex flex-col gap-4'>
                <div className="bg-neutral-50 p-2 text-green-500"><Slider id='price' range min={0} max={9999} value={[range.min, range.max]} onChange={handleChange} /></div>
                <p className='font-semibold text-neutral-500'>Price Range: ${range.min} - ${range.max}</p>
            </div>
          </div>
        )
    }

  return (
    <Modal 
      disabled={isloading}
      isOpen={searchModal.isOpen}
      title='Find Your Gig!'
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TITLE ? undefined: onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal;
