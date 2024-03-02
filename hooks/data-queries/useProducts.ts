import { axiosInstance } from "@/config/api";
import { IProduct } from "@/types";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);
      setError("");
      try {
        const { data } = await axiosInstance.get("/products", { signal });
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        let message;

        if (error instanceof AxiosError) {
          message = handleApiError(error);
        } else {
          message = "An unexpected error occurred.";
        }
        setIsLoading(false);
        setIsError(true);
        setError(message);
      }
    };

    fetchProducts();

    return () => {
      // Cancel the request when the component unmounts
      abortController.abort();
    };
  }, []);

  return {
    products,
    isLoading,
    isError,
    error,
  }
};

export default useProducts;
