import { fetchedCustomerProfile } from "@/services";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

const useProfile = () => {
    const axiosPrivate = useAxiosPrivate()
  const {
    data: customer,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
        const response = await axiosPrivate.get("/customers/profile")
        return response.data
    },
  });

  return {
    customer,
    isError,
    isLoading,
    error,
  };
};

export default useProfile;
