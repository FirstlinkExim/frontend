import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { setCart } from "@/redux/slices/productSlice";

const useGetCart = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const {
    data: carts,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/customers/cart");
      
      dispatch(setCart(response.data))
      return response.data;
    },
  });

  return {
    carts,
    isError,
    isLoading,
    error
  };
};

export default useGetCart;
