import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from '../container/Container';
import Listings from '../Listings/Listings';
import { useParams } from 'react-router-dom';
import Heading from '../heading/Heading';

const ProfileDashboard = ({currentUser}) => {
  const [ gigsList, setGigsList ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const url = `https://gigsteria-api.onrender.com/api/gigs/${id}`;
        const response = await axios.get(url);
        setGigsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGigs();
  },[])
  return (
      <Container>
        <div className="flex flex-col gap-4 mb-6">
            <Heading 
              title={currentUser && currentUser?._id === id ? 'My Gig Dashboard':'Check Out My Gig'} 
              subtitle={currentUser && currentUser?._id === id ? 'Manage your gigs and track their performance':'Browse my portfolio of gigs and select the one that matches your requirements'} />
        </div>
        { gigsList && (
          <Listings gigsList={gigsList} noTopPadding={true} />
        )}
      </Container>
  )
}

export default ProfileDashboard
