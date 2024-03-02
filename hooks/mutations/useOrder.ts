import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutateAsync: createOrderMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/orders/create-order", data);
      return response.data;
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: () => {
      toast.success("Order successfully")
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  return {
    createOrderMutation,
  };
};

export default useOrder;
