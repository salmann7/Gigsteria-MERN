import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const navigate = useNavigate();
    
  const stripe = useStripe();
  const elements = useElements();
  console.log(elements);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = elements._commonOptions.clientSecret.clientSecret;

    console.log(new URLSearchParams(window.location.search));

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // setClientSecret(clientSecretUrl);


    console.log(clientSecret);

    if (!clientSecret) {
        console.log("no clientscecret");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
            console.log("here payment success")
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
            console.log("here payment")
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(clientSecret);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const {error} = await stripe.confirmPayment({
      elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: null,
    //     // redirect: 'none',
    //   }
    redirect: 'if_required'
    });
    if(!error){
        navigate({
            pathname: window.location.pathname,
            search: '?payment_success=true',
        });
        return;
    }

    // console.log(res.paymentIntent.status);

    // const { error } = await stripe.confirmCardPayment( clientSecret, {
    //     payment_method: {
    //         card: elements,
    //         billing_details: {
    //           email: email,
    //         },
    //     },
    // })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } 
    else {
        navigate({
            pathname: window.location.pathname,
            search: '?payment_success=false',
        });

      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e?.target?.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}