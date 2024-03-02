import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

const useAddresses = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: addresses,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/customers/profile/address");
      return response.data;
    },
  });

  return {
    addresses,
    isError,
    isLoading,
    error,
  };
};

export default useAddresses;
