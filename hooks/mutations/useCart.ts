import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCart = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutateAsync: addToCartMutation } = useMutation({
    mutationFn: async (data: { product: any; quantity: number }) => {
      
      const response = await axiosPrivate.post("/customers/cart/add", data);
      return response.data
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  const { mutateAsync: removeFromCartMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/customers/cart/remove", data);
      return response.data;
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  const { mutateAsync: increaseCartQuantityMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post(
        "/customers/cart/increase",
        data
      );
      return response.data;
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  const { mutateAsync: decreaseCartQuantityMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post(
        "/customers/cart/decrease",
        data
      );
      return response.data;
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  const { mutateAsync: removeAllItemsFromCartMutation } = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.delete(
        "/customers/cart/remove-all",
      );
      return response.data;
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  return {
    addToCartMutation,
    removeFromCartMutation,
    increaseCartQuantityMutation,
    decreaseCartQuantityMutation,
    removeAllItemsFromCartMutation,
  };
};

export default useCart;
