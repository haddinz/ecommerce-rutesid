/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useReducer } from "react";
import { Cart, CartItems, ShippingAddress } from "../types/Cart";
import { Users } from "../types/User";

type AppState = {
  mode: string;
  cart: Cart;
  userInfo?: Users;
};

const inisialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-colors-scheme: dark)").matches
    ? "dark"
    : "light",
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "",
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "ADD_CART_ITEMS"; payload: CartItems }
  | { type: "REMOVE_CART_ITEMS"; payload: CartItems }
  | { type: "AUTH"; payload: Users }
  | { type: "LOGOUT_AUTH" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT"; payload: string }
  | { type: "CLEAR_CART" };

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "ADD_CART_ITEMS":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItems) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItems) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_CART_ITEMS": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItems) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "AUTH":
      const userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return { ...state, userInfo: userInfo };
    case "LOGOUT_AUTH":
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-colors-scheme: dark)").matches
            ? "dark"
            : "light",
        cart: {
          cartItems: [],
          paymentMethod: "PayPal",
          shippingAddress: {
            fullName: "",
            address: "",
            city: "",
            country: "",
            postalCode: "",
          },
          itemPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      const shippingAddress = action.payload;
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: shippingAddress },
      };
    case "SAVE_PAYMENT":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case "CLEAR_CART":
      return { ...state, cart: { ...state.cart, cartItems:[] }}
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => inisialState;

const Store = React.createContext({
  state: inisialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    inisialState
  );
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
