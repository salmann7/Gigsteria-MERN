import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkoutForm/CheckoutForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../container/Container";

import './payment.css';

const stripePromise = loadStripe("pk_test_51N1dqRSF8yPcIvMfd48NGKyCUOW1oqslCuCTmdmktbjICuO4xE4mRwj2JS92aLcNzEE7P1ad6wdIHRssAQlPPZq00042hshfdD");

const Payment = ({ currentUser }) => {

    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const paymentIntent = async () => {
            try{
                const data = id;
                const res = await axios.post(`http://localhost:8800/api/orders/create-payment-intent/${id}`, data, {
                  withCredentials: true,
                });
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
              } catch(e){
                console.log(e);
              }
        }
        paymentIntent();
    },[]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


  return (
    <Container>
        <div className="flex flex-row justify-center pb-10">
            <div className="max-w-md">
            {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
        </div>
    </Container>
  )
}

export default Payment
