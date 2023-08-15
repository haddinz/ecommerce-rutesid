import { Product } from "../../types/Product";
import APIClient from "../../utils/getAPI";
import { useQuery } from "@tanstack/react-query";

export const GetQueryProduct = () =>
  useQuery({
    queryKey: ["Products"],
    queryFn: async () => (await APIClient.get<Product[]>("/api/products")).data,
  });

export const GetQuerySlug = (slug: string) =>
  useQuery({
    queryKey: ["Product", slug],
    queryFn: async () =>
      (await APIClient.get<Product>(`/api/products/${slug}`)).data,
  });

export const GetSearchProductCategory = () =>
  useQuery({
    queryKey: ["Product Categories"],
    queryFn: async () =>
      (await APIClient.get<[]>(`/api/products/categories`)).data,
  });

export const GetSearchProduct = ({
  category,
  price,
  query,
  rating,
  page,
  order,
}: {
  category: string;
  price: string;
  query: string;
  rating: string;
  page: number;
  order: string;
}) =>
  useQuery({
    queryKey: ["product", category, price, query, rating, page, order],
    queryFn: async () =>
      (
        await APIClient.get<{
          products: Product[];
          countProduct: number;
          pages: number;
        }>(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        )
      ).data,
  });
