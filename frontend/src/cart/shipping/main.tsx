import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/custom/button";
import CheckOutStep from "../../../components/custom/checkoutStep";
import { Store } from "../../../utils/store";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout";

function ShippingPage() {
  const { search } = useLocation()
  const params = new URLSearchParams(search).get("redirect");
  const redirect = params ? params : "/cart/payment";
  const navigate = useNavigate()
  
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  useEffect(() => {
    if (cartItems.length === 0 || !userInfo) {
      navigate("/");
    }
  }, [userInfo, cartItems, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const submitShippingHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, country, postalCode },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        country,
        postalCode,
      })
    );

    navigate(redirect);
  };
  return (
    <Layout title="Shipping" description="Write down your address for shipping items to your home buddy">
      <CheckOutStep step1 step2 />
      <div className="container">
        <div className="mt-10 flex items-center flex-col">
          <div className="text-xl md:text-4xl font-bold text-cyan-600 mb-10">
            Shipping Address
          </div>
          <form onSubmit={submitShippingHandler} className="w-full md:w-[450px]">
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                className="px-4 py-4 mt-2 focus:outline-none text-sm md:text-base bg-cyan-700 rounded-lg"
                type="name"
                autoFocus
                required
                value={fullName}
                id="name"
                placeholder="Input full name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                className="px-4 py-4 mt-2 focus:outline-none text-sm md:text-base bg-cyan-700 rounded-lg"
                type="address"
                required
                value={address}
                id="address"
                placeholder="Input address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="country">Country</label>
              <input
                className="px-4 py-4 mt-2 focus:outline-none text-sm md:text-base bg-cyan-700 rounded-lg"
                type="country"
                required
                value={country}
                id="country"
                placeholder="Input country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                className="px-4 py-4 mt-2 focus:outline-none text-sm md:text-base bg-cyan-700 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                required
                value={postalCode}
                id="postalCode"
                placeholder="Input postal code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="mb-10 flex flex-col">
              <label htmlFor="city">City</label>
              <input
                className="px-4 py-4 mt-2 focus:outline-none text-sm md:text-base bg-cyan-700 rounded-lg"
                type="city"
                required
                value={city}
                id="city"
                placeholder="Input city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Button text="Continue" condition="on" type="submit" />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ShippingPage;
