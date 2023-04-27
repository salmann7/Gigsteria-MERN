import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from '../container/Container';
import Listings from '../Listings/Listings';

const Dashboard = () => {
  const [ gigsList, setGigsList ] = useState([]);

  useEffect(() => {
    const getGigs = async () => {
      const res = await axios.get('http://localhost:8800/api/gigs');
      console.log(res.data);
      setGigsList(res.data);
    }
    getGigs();
  },[])
  return (
      <Container>
        { gigsList && (
          <Listings gigsList={gigsList} />
        )}
      </Container>
  )
}

export default Dashboard
