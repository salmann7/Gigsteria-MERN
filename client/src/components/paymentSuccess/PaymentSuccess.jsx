import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import api from '../../utils/apiCall.js';

const PaymentSuccess = () => {

    const { search } = useLocation();
    console.log(search);
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    console.log(params);
    const payment_intent = params.get("payment_intent");
    console.log(payment_intent);

    useEffect(() => {
        const confirmOrder = async () => {
            const res = await api.put("/api/orders", {payment_intent});
            setTimeout(() => {
                navigate("/orders");
            },5000);
        }

        confirmOrder();
    },[]);
  return (
    <div>
      Please wait your order. redirect to orders page.
    </div>
  )
}

export default PaymentSuccess
