import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ListingCard = ({
    data
}) => {
    console.log(data);
  return (
    <div className="group border-2 rounded-lg overflow-hidden cursor-pointer">
  <div className="relative">
    <img
      src={data?.coverImageSrc}
      alt=""
      className="w-full transition-transform transform group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg">
        Order Now
      </button>
    </div>
  </div>
  <div className="flex flex-col justify-between">
    <div className="p-4">
    <p className="text-gray-500">{data?.cat}</p>
    <h3 className="text-xl font-semibold text-gray-800">{data?.title}</h3>
    </div>
    <div className="p-4 flex justify-between items-center mt-4">
      <p className="text-gray-700 font-bold text-lg">$ {data?.price}</p>
      <p className="text-gray-600">{data?.deliveryTime} Days</p>
    </div>
  </div>
</div>

    // <div onClick={() => ({})} className='cursor-pointer border-2 rounded-lg overflow-hidden group'>
    //     <div className="flex flex-col gap-2 w-full">
    //         <div className="">
    //           <img src={data?.coverImageSrc} alt="" className='group-hover:scale-90 transition w-full' />
    //           <div className="font-light text-neutral-500 px-3">
    //               {data?.cat}
    //           </div>
    //           <div className="font-semibold text-neutral-800 px-3">
    //               {data?.title}
    //           </div>
    //         </div>
    //         <div className="font-semibold text-neutral-800 px-3 pb-3 flex flex-row justify-between">
    //             <p>$ {data?.price}</p>
    //             <p>{data?.deliveryTime} Days</p>
    //         </div>
    //     </div>
    // </div>
  )
}

export default ListingCard
