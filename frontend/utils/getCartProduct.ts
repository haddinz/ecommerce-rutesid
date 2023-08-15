import { CartItems } from "../types/Cart";
import { Product } from "../types/Product";

export const convertCartProduct = (product: Product): CartItems => {
  const cartItems: CartItems = {
    _id: product._id,
    name: product.name,
    image: product.image,
    slug: product.slug,
    countInStock: product.countInStock,
    price: product.price,
    quantity: 1,
  };

  return cartItems;
};
