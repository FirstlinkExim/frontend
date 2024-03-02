import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const useSingleOrder = (orderId: string) => {
    const axiosPrivate = useAxiosPrivate()
    const {
      data: order,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["orders", orderId],
      queryFn: async () => {
          const response = await axiosPrivate.get(`/orders/${orderId}`)
          return response.data
      },
    });
  
    return {
      order,
      isError,
      isLoading,
      error,
    };
}

export default useSingleOrder