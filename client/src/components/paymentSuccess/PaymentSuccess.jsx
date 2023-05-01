import axios from 'axios';
import React, { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {

    // const { search } = useLocation();
    // const navigate = useNavigate();
    // const params = new URLSearchParams(search);
    // const payment_intent = params.get("payment_intent");

    // useEffect(() => {
    //     const confirmOrder = async () => {
    //         await axios.put("http://localhost:8800/api/orders", {payment_intent} );
    //         setTimeout(() => {
    //             navigate("/orders");
    //         },5000);
    //     }

    //     confirmOrder();
    // },[]);
  return (
    <div>
      Please wait your order. redirect to orders page.
    </div>
  )
}

export default PaymentSuccess
