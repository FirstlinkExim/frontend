import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types";
import { setWishlists } from "@/redux/slices/productSlice";

const useWishlist = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch()
  const {
    data: wishlists,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/customers/wishlist");
      dispatch(setWishlists(response.data));
      return response.data;
    }, 
  });

  return {
    wishlists,
    isError,
    isLoading,
    error,
  };
};

export default useWishlist;
