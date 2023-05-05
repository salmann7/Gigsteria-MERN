import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from '../container/Container';
import Listings from '../Listings/Listings';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [ gigsList, setGigsList ] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const url = category
          ? `http://localhost:8800/api/gigs?category=${category}`
          : "http://localhost:8800/api/gigs";

        const response = await axios.get(url);
        setGigsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGigs();
  },[location])
  return (
      <Container>
        { gigsList && (
          <Listings gigsList={gigsList} />
        )}
      </Container>
  )
}

export default Dashboard
