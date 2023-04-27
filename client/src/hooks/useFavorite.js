import axios from 'axios';

import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';

const useFavorite = ({
    gigId,
    currentUser
}) => {
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        console.log(currentUser?.favoriteIds)
         return list.includes(gigId);
    },[currentUser, gigId]);

    const toggleFavorite = useCallback( async () => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;
            if(hasFavorited){
                let data = currentUser;
                console.log("deleteHere")
                request = () => axios.put(`http://localhost:8800/api/user/favorites/${gigId}`, data);
            } else{
                let data = currentUser;
                console.log(data);
                request = () => axios.post(`http://localhost:8800/api/user/favorites/${gigId}`, data);
            }
            await request();
            console.log("done");
        }catch(error){
            console.log(error);
        }
    },[loginModal, hasFavorited, gigId, currentUser]);
    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;