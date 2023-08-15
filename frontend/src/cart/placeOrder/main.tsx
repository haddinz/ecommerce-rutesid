import { useNavigate } from "react-router-dom";
import Button from "../../../components/custom/button";
import CheckOutStep from "../../../components/custom/checkoutStep";
import Hanger from "../../../components/custom/hanger";
import Loading from "../../../components/custom/loading";
import { PostOrderMutation } from "../../../components/hook/orderHooks";
import { ApiError } from "../../../types/ApiError";
import { getError } from "../../../utils/getError";
import { Store } from "../../../utils/store";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/layout";

function PlaceOrder() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const fulFilled = (num: number) =>
    Math.round(num * 100 + Number.EPSILON) / 100; // => 123.456 digenapkan 123.5
  cart.itemPrice = fulFilled(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemPrice > 100 ? fulFilled(0) : fulFilled(10);
  cart.taxPrice = fulFilled(0.15 * cart.itemPrice);
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = PostOrderMutation();
  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      localStorage.removeItem("paymentMethod");
      navigate(`/order/id/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error as ApiError), { autoClose: 1000 });
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod || !userInfo || cart.cartItems.length === 0) {
      navigate("/");
    }
  }, [cart.cartItems.length, cart.paymentMethod, navigate, userInfo]);

  return (
    <Layout title="Place Order" description="Place Order Items In The Cart">
      <CheckOutStep step1 step2 step3 step4 />
      <div className="container">
        <h1 className="text-xl md:text-4xl font-bold text-cyan-600 my-10">
          Preview Order
        </h1>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="border-2 my-5 border-cyan-900 p-5 rounded-lg">
              <h3 className="h3">Shipping</h3>
              <div>
                <p>
                  Name: <span>{cart.shippingAddress.fullName}</span>
                </p>
                <p>
                  Address:{" "}
                  <span>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </span>
                </p>
                <Hanger link="/cart/shipping?redirect=/cart/placeOrder">
                  Edit
                </Hanger>
              </div>
            </div>

            <div className="border-2 my-5 border-cyan-900 p-5 rounded-lg">
              <h3 className="h3">Payment</h3>
              <div>
                <p>
                  Method: <span>{cart.paymentMethod}</span>
                </p>
              </div>
              <Hanger link="/cart/payment?redirect=/cart/placeOrder">
                Edit
              </Hanger>
            </div>

            <div className="border-2 my-5 border-cyan-900 p-5 rounded-lg">
              <h3 className="h3">Items In Cart</h3>
              {cart.cartItems.map((item) => (
                <div key={item.name} className="grid grid-cols-4 gap-5">
                  <div className="flex items-center col-span-2 ">
                    <img
                      alt={item.name}
                      src={item.image}
                      className="h-14 w-12 m-2"
                    />
                    <p className="text-sm">{item.name}</p>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <p className="text-sm">{item.quantity} Qty</p>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <p className="text-sm">$ {item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
              <Hanger link="/cart/cartPage?redirect=/cart/placeOrder">Edit</Hanger>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="border-2 my-5 border-cyan-900 p-5 rounded-lg">
              <h3 className="h3">Order Summary</h3>
              <div className="flex justify-between">
                <p>Items :</p>
                <p>$ {cart.itemPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Price :</p>
                <p>$ {cart.shippingPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax Price :</p>
                <p>$ {cart.taxPrice.toFixed(2)}</p>
              </div>
              <div className="my-5 w-full h-1 bg-yellow-500 rounded-lg" />
              <div className="flex justify-between mb-10">
                <p>Total Order Price</p>
                <p>$ {cart.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <Button
                  condition={cart.cartItems.length === 0 ? "off" : "on"}
                  text="Place Order"
                  onClickHandler={placeOrderHandler}
                />
                {isLoading && <Loading.Spin />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlaceOrder;
