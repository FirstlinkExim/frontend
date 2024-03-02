import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

const useSingleAddress = (addressId: string) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: address,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers", addressId],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/customers/profile/address/${addressId}`
      );
      return response.data;
    },
  });

  return {
    address,
    isError,
    isLoading,
    error,
  };
};

export default useSingleAddress;
