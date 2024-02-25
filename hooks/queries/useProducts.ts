import { axiosInstance } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Params {
  category?: string;
  page?: number;
  limit?: number;
  query?: string;
}

const useProducts = ({
  category,
  page = 1,
  limit = 10,
  query,
}: Params = {}) => {
  // Providing default value for Params object
  let url = `/products?page=${page}&limit=${limit}`;
  if (query) {
    url += `&q=${query}`;
  }
  if (category) {
    url += `&category=${category}`;
  }

  
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page, limit, query, category],
    queryFn: async () => {
      const response = await axiosInstance(url);
      return response.data;
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
