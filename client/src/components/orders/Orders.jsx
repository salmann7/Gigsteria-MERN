import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import axios from 'axios';

const Orders = ({currentUser}) => {
  const [ orders, setOrders ] = useState([]);

  const getOrders = async () => {
    const res = await axios.get("http://localhost:8800/api/orders",{
      withCredentials: true
    });
    console.log(res);
    setOrders(res.data);
  }

  useEffect(() => {
    getOrders();
  },[]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  return (
    <Container>
      <div className="flex flex-col gap-4 bg-neutral-50 rounded-2xl p-4 shadow-xl mb-10 pb-5">
        <h1 className='text-2xl font-semibold text-gray-800'>Orders</h1>
        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="table-auto w-full ">
            <thead>
              <tr className='text-gray-800 border-b-[1px] border-gray-500'>
                <th className='px-4 py-2 text-left'>Order ID</th>
                <th className='px-4 py-2 text-left'>Seller Name</th>
                <th className='px-4 py-2 text-left'>Title</th>
                <th className='px-4 py-2'>Date</th>
                <th className='px-4 py-2'>Payment</th>
                <th className='px-4 py-2 text-left'>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className='text-center hover:shadow-sm bg-white text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:bg-neutral-50 transition' key={order._id}>
                  <td className=" px-4 py-2 text-left">{order._id.substring(0, 8)}</td>
                  <td className=" px-4 py-2 text-left">{order.sellerName}</td>
                  <td className='flex flex-row gap-3 items-center justify-start  px-4 py-2'>
                    <img src={order.img} alt="order image" className='w-9 h-9 rounded-full'  />
                    <p>{order.title.substring(0,40)}...</p>
                  </td>
                  <td className=" px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className=" px-4 py-2 "><p className='font-semibold text-green-500 bg-green-50 rounded-sm'>{order.isCompleted ? 'Done':'Pending'}</p></td>
                  <td className=" px-4 py-2 text-left">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default Orders
