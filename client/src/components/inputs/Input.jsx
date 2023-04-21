import React from 'react'
import { BiDollar } from "react-icons/bi";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


const Input = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    register,
    required,
    errors
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2"/>
      )}
      <input id={id} type={type} disabled={disabled} {...register(id, {required})}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9':'pl-4'}
                    ${errors[id] ? 'border-green-600':'border-neutral-300'}
                    ${errors[id] ? 'focus:border-green-600':'focus:border-black'}`} />
        <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                           ${formatPrice ? 'left-9':'left-4'}
                           peer-placeholder-shown:scale-100
                           peer-placeholder-showm:translate-y-0
                           peer-focus:scale-75
                           peer-focus:-translate-y-4
                           ${errors[id] ? 'text-green-600':'text-zinc-400'}`}>
            {label}
        </label>
    </div>
  )
}

export default Input
