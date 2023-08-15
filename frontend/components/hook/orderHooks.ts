import { CartItems, ShippingAddress } from "../../types/Cart";
import { Order } from "../../types/Order";
import APIClient from "../../utils/getAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

export const PostOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItems[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await APIClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  });

export const GetOrderMutation = (id: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await APIClient.get<Order>(`/api/orders/${id}`)).data,
  });

export const GetPaypalClientID = () =>
  useQuery({
    queryKey: ["paypal_clientID"],
    queryFn: async () =>
      (await APIClient.get<{ clientID: string }>("/api/keys/paypal")).data,
  });

export const PutPayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderID: string }) =>
      (
        await APIClient.put<{ message: string; order: Order }>(
          `/api/orders/${details.orderID}/pay`,
          details
        )
      ).data,
  });

export const GetOrderQueryHistory = () =>
  useQuery({
    queryKey: ["Order-History"],
    queryFn: async () =>
      (await APIClient.get<Order[]>("/api/orders/history")).data,
  });

export const GetOrderQueryAdmin = ({ query } : { query: string }) =>
  useQuery({
    queryKey: ["Orders", query],
    queryFn: async () =>
      (
        await APIClient.get<{ orders: Order[]; countOrders: number }>(
          `/api/orders/admin/order?query=${query}`
        )
      ).data,
  });
