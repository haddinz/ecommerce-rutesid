import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/custom/button";
import CheckOutStep from "../../../components/custom/checkoutStep";
import { Store } from "../../../utils/store";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout";

function Payment() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search).get('redirect')
  const redirect = params ? params : '/cart/placeOrder'

  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  useEffect(() => {
    if (
      !shippingAddress.address &&
      !shippingAddress.fullName &&
      !shippingAddress.postalCode
    ) {
      navigate("/cart/shipping");
    }
  }, [navigate, shippingAddress]);

  const paypalPayment = "PayPal";
  const stripePayment = "Stripe";
  const [payment, setPayment] = useState(paymentMethod || paypalPayment || " ");

  const submitPaymentHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT", payload: payment });
    localStorage.setItem("paymentMethod", payment);
    navigate(redirect);
  };
  return (
    <Layout title="Payment" description="Payment Method">
      <CheckOutStep step1 step2 step3 />
      <div className="container">
        <div className="mt-10 flex items-center flex-col">
          <div className="text-xl md:text-4xl font-bold text-cyan-600 mb-10">
            Payment Method
          </div>
          <form onSubmit={submitPaymentHandler} className="w-3/4 md:w-[450px]">
            <div>
              <input
                className="bg-emerald-600 focus:outline-none h-4 w-4 mr-3"
                type="radio"
                value={paypalPayment}
                id={paypalPayment}
                checked={payment === paypalPayment}
                onChange={(e) => setPayment(e.target.value)}
              />
              <label className="text-lg font-semibold">{paypalPayment}</label>
            </div>
            <div className="mt-5 mb-10">
              <input
                className="bg-emerald-600 focus:outline-none h-4 w-4 mr-3"
                type="radio"
                value={stripePayment}
                id={stripePayment}
                checked={payment === stripePayment}
                onChange={(e) => setPayment(e.target.value)}
              />
              <label className="text-lg font-semibold">{stripePayment}</label>
            </div>
            <Button type="submit" text="Continue" condition="on" />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
