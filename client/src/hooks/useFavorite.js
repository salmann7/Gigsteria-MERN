import axios from 'axios';

import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';

import api from '../utils/apiCall.js';

const useFavorite = ({
    gigId,
    user
}) => {
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = user?.favoriteIds || [];
        console.log(user?.favoriteIds)
         return list.includes(gigId);
    },[user, gigId]);

    const toggleFavorite = useCallback( async () => {
        if(!user){
            return loginModal.onOpen();
        }

        try{
            let request;
            if(hasFavorited){
                let data = user;
                console.log("deleteHere")
                request = () => api.put(`/api/user/favorites/${gigId}`, data);
            } else{
                let data = user;
                console.log(data);
                request = () => api.post(`/api/user/favorites/${gigId}`, data);
            }
            await request();
            console.log("done");
        }catch(error){
            console.log(error);
        }
    },[loginModal, hasFavorited, gigId, user]);
    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;