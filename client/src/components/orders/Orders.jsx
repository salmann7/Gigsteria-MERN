import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import axios from 'axios';

const Orders = ({currentUser}) => {
  const [ orders, setOrders ] = useState([]);
  const userId = currentUser._id;

  const getOrders = async () => {
    const res = await axios.get("http://localhost:8800/api/orders",{
      withCredentials: true
    });
    console.log(res);
  }

  useEffect(() => {
    getOrders();
  })

  return (
    <Container>
      orders
    </Container>
  )
}

export default Orders
