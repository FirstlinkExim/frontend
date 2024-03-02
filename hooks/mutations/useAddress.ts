import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useAddress = () => {
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const { mutateAsync: createAddressMutation, isPending } = useMutation({
        mutationFn: async (data: any) => {
          const response = await axiosPrivate.post(
            "/customers/profile/address",
            data
          );
          return response.data;
        },
    
        onSuccess: () => {
          toast.success("Address saved successfully");
    
          queryClient.invalidateQueries({
            queryKey: ["customers"],
          });
        },
        onError: (err: any) => toast.error(err?.response?.data.message),
      });
    
      const { mutateAsync: updateAddressMutation } = useMutation({
        mutationFn: async (data: any) => {
          const response = await axiosPrivate.patch(
            `/customers/profile/address/${data.addressId}`,
            { ...data }
          );
          return response.data;
        },
    
        onSuccess: () => {
          toast.success("Address updated successfully");
    
          queryClient.invalidateQueries({
            queryKey: ["customers"],
          });
        },
        onError: (err: any) => toast.error(err?.response?.data.message),
      });
    
      const { mutateAsync: deleteAddressMutation } = useMutation({
        mutationFn: async (addressId: string) => {
          const response = await axiosPrivate.delete(
            `/customers/profile/address/${addressId}`
          );
          return response.data;
        },
    
        onSuccess: (data) => {
          toast.success("Address deleted successfully");
    
          queryClient.invalidateQueries({
            queryKey: ["customers"],
          });
        },
        onError: (err: any) => toast.error(err?.response?.data.message),
      });

      const { mutateAsync: toggleActiveMutation } = useMutation({
        mutationFn: async (addressId: string) => {
          const response = await axiosPrivate.patch(
            `/customers/profile/address/${addressId}/active`
          );
          return response.data;
        },
    
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["customers"],
          });
        },
        onError: (err: any) => toast.error(err?.response?.data.message),
      });

      return {
        createAddressMutation,
        updateAddressMutation,
        deleteAddressMutation,
        toggleActiveMutation
      }
}

export default useAddress