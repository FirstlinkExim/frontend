import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Params {
  category: string;
  page: number;
  limit: number;
  query: string;
}

const useProducts = (params?: Params) => {
  const { data: products, isError, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    },
  });
  return {
    products,
    isError,
    isLoading,
    error,
  };
};

export default useProducts;
