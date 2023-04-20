import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from 'react-icons/bi';

import Container from '../container/Container'
import Avatar from '../avatar/Avatar';

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="border-b-[1px] py-4">
            <Container>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-md text-2xl cursor-pointer"><span className=' text-green-600'>Gig</span>steria<span className=' text-green-600'>.</span></div>
                <div className="flex flex-row items-center justify-center w-full md:w-auto mx-1 sm:mx-0">
                    <div className="border-[1px] rounded-full hover:shadow-md transition cursor-pointer py-2 w-full md:w-auto">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-sm font-semibold md:px-6 px-3">
                                Find gig
                            </div>
                            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                                Category
                            </div>
                            <div className="hidden sm:block text-sm font-semibold pl-6 pr-1  flex-1 text-center">
                                Title
                            </div>
                            <div className="bg-green-600 p-2 rounded-full mx-2 text-white">
                                <BiSearch size={18} />
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='flex items-center'>
                  <li>
                    <div className="hidden cursor-pointer sm:block font-semibold text-neutral-500 text-md px-6 mx-2 hover:bg-neutral-100 py-3 rounded-full">
                      Upload Gig
                    </div>
                  </li>
                  <li>
                    <div className="border-[1px] rounded-full p-4 md:py-2 md:px-2 border-x-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar />
                        </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar
