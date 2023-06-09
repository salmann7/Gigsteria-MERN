import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from '../container/Container';
import Listings from '../Listings/Listings';
import { useLocation } from 'react-router-dom';

import api from '../../utils/apiCall.js';

const Dashboard = () => {
  const [ gigsList, setGigsList ] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const search = queryParams.get('search');
  const min = queryParams.get('min');
  const max = queryParams.get('max');

  useEffect(() => {
    const fetchGigs = async () => {
      console.log(queryParams);
      try {
        const url = (category || min || max || search)
          ? `/api/gigs?${category && 'category='+category+'&'}${min && '&min='+min}${max && '&max='+max}${search && '&search='+search}`
          : "/api/gigs";

        const response = await api.get(url);
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
