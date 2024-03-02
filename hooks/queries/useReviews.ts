import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const useReviews = (productId: string) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: reviews,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/products/${productId}/reviews`);
      return response.data;
    },
  });

  return {
    reviews,
    isError,
    isLoading,
    error,
  };
};

export default useReviews;
