import { Store } from "../utils/store";
import { useContext, useEffect, useState } from "react";
import Icon from "./custom/icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import SearchBox from "../components/custom/searchBox";
import { CartItems } from "../types/Cart";

function Header() {
  const [dropdrown, setDropdown] = useState(false);
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("class", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  const darkmodeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const dropdownHandler = () => {
    setDropdown(!dropdrown);
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT_AUTH" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    toast.success("Log Out Success", { autoClose: 1000 });
    window.location.href = "/user/signin";
  };

  return (
    <div className="fixed w-full h-[80px] bg-gray-100 dark:bg-gray-900 z-10">
      <ToastContainer position="top-center" limit={1} />
      <div className="container dark:dark">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 h-full">
          <div className="col-span-2 md:col-span-3 flex items-center">
            <Link to="/" className="hidden md:block text-xl font-bold md:text-2xl mr-3">
              rutes.ID
            </Link>
            <SearchBox />
          </div>

          <div className="col-span-1 md:col-span-2 my-auto">
            <nav className="block md:hidden">
              <Sidebar />
            </nav>
            <nav className="w-full hidden md:flex items-center justify-end font-bold">
              <Link to="/cart/cartPage" className="md:mr-5 relative">
                {cart.cartItems.length === 0
                  ? ""
                  : cart.cartItems.length > 0 && (
                      <div className="h-5 w-5 flex justify-center items-center rounded-full bg-sky-600 absolute -top-3 -right-2 text-white text-xs">
                        {cart.cartItems.reduce(
                          (a: number, c: CartItems) => a + c.quantity,
                          0
                        )}
                      </div>
                    )}
                <Icon.Cart />
              </Link>
              <Link to="/search" className="mr-5">
                Product
              </Link>
              <span className="mr-5">||</span>
              {userInfo ? (
                <div className="mr-5 relative cursor-pointer">
                  <div onClick={dropdownHandler}>{userInfo.name}</div>
                  <div
                    onClick={() => setDropdown(!dropdrown)}
                    className={`${
                      dropdrown
                        ? `fixed top-0 left-0 w-full h-[100vh] bg-gray-900 bg-opacity-40`
                        : "hidden"
                    }`}
                  />
                  <div
                    onClick={() => setDropdown(!dropdrown)}
                    className={`${
                      dropdrown
                        ? `absolute p-5 bg-sky-700 rounded mt-5 right-0 w-64 flex flex-col`
                        : "hidden"
                    }`}
                  >
                    <Link
                      className="hover:bg-sky-900 text-white p-2 rounded-lg"
                      to="/user/profile"
                    >
                      Manage Profile
                    </Link>
                    <Link
                      className="hover:bg-sky-900 text-white p-2 rounded-lg"
                      to="/order/history"
                    >
                      Order Histori
                    </Link>
                    {userInfo?.isAdmin && (
                      <Link
                        className="hover:bg-sky-900 text-white p-2 rounded-lg"
                        to="/admin/order"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="h-1 w-full bg-gray-900 my-5" />
                    <div
                      className="hover:bg-sky-900 text-white p-2 rounded-lg cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/user/signin" className="mr-5">
                    LogIn
                  </Link>
                  <Link to="/user/register" className="mr-5">
                    SignUp
                  </Link>
                </div>
              )}
              <button onClick={darkmodeHandler}>
                <span>{mode === "dark" ? <Icon.Sun /> : <Icon.Moon />}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
