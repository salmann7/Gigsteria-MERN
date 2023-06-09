import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import axios from 'axios';
import Listings from '../Listings/Listings';
import { AiFillHeart } from 'react-icons/ai';

import api from '../../utils/apiCall.js';

const Favorites = ({
    currentUser
}) => {
    const [ favList, setFavList ] = useState([]);
    // let gigs = [];
    const [ gigsList, setGigsList ] = useState([]);

    useEffect(() => {
        const getFav = async () => {
            console.log(currentUser._id)
            const res = await api.get(`/api/user/${currentUser._id}`);
            setFavList(res.data?.favoriteIds)
        }
        getFav();
    },[])

    useEffect(() => {
        const getGigs = async () => {
          let gigs = [];
      
          if (favList) {
            const promises = favList.map(async (fav) => {
              const res = await api.get(`/api/gigs/single/${fav}`);
              return res.data;
            });
      
            gigs = await Promise.all(promises);
          }
      
          setGigsList(gigs);
        };
      
        getGigs();
      }, [favList]);

    console.log(gigsList)

  return (
    <Container>
        <div className="flex flex-col mb-9">
            <div className="flex flex-row items-center gap-4">
              <AiFillHeart size={24} className='fill-rose-500' />
              <h1 className='text-3xl text-neutral-800 font-semibold'>Your Favorite Gigs</h1>
            </div>
        </div>
        { gigsList && (
           <Listings gigsList={gigsList} noTopPadding={true} />
        )}
    </Container>
  )
}

export default Favorites
