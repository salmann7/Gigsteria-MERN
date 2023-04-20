import React from 'react';
import { BsTwitter, BsFacebook } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import Container from '../container/Container';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
        <Container>
        <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1">
            <h2 className="mb-4 font-semibold text-md text-2xl cursor-pointer"><span className=' text-green-600'>Gig</span>steria<span className=' text-green-600'>.</span></h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat nulla eu nunc interdum, nec euismod magna sagittis.</p>
          </div>
          <div className="flex-1 md:text-center lg:text-right">
            <ul className="flex flex-col md:flex-row justify-center lg:justify-end items-center">
              <li className="mx-3">
                <a href="#" className="hover:text-white"><BsTwitter /></a>
              </li>
              <li className="mx-3">
                <a href="#" className="hover:text-white"><AiFillGithub /></a>
              </li>
              <li className="mx-3">
                <a href="#" className="hover:text-white"><BsFacebook /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2023 My Website. All Rights Reserved.</p>
        </div>
      </div>
        </Container>
    </footer>
  );
};

export default Footer;
