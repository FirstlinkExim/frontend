
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/api";

const useProduct = (id: string) => {
  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers", id],
    queryFn: async () => {
        const response = await axiosInstance.get(`/products/${id}`)
        return response.data
    },
  });

  return {
    product,
    isError,
    isLoading,
    error,
  };
};

export default useProduct;
