import { axiosInstance } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Params {
  category?: string;
  page?: number;
  limit?: number;
  query?: string;
  color?: string,
  price? : number,
  size?: string,
  sort?: string,
  type?: string,
}

const useProducts = ({
  category,
  page = 1,
  limit = 9,
  query,
  color,
  price,
  size,
  sort,
  type,
}: Params = {}) => {
  // Providing default value for Params object
  let url = `/products?page=${page}&limit=${limit}`;
  if (query) {
    url += `&q=${query}`;
  }
  if (category) {
    url += `&category=${category}`;
  }
  if (color) {
    url += `&color=${color}`;
  }
  if (price) {
    url += `&price=${price}`;
  }
  if (size) {
    url += `&size=${size}`;
  }
  if (sort) {
    url += `&sortBy=${sort}`;
  }
  if (type) {
    url += `&type=${type}`;
  }


  
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page, limit, query, category, price, size, sort, type, color],
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
