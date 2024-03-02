import { useAppDispatch } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/productSlice";
import { IProduct } from "@/types";
import React, { useCallback, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLike = ({
  product,
  like = false,
}: {
  product: IProduct;
  like?: boolean;
}) => {
  const [isLike, setIsLike] = useState(like);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: addWishlistMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/customers/wishlist", data);
      return response.data
    },
    onError: (err: any) =>
      toast.error(err?.response?.data.message, { position: "top-center" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers", "products"],
      });
    },
  });

  
  const handleProductWishlist = async () => {
    const updatedLike = !isLike;
    setIsLike(updatedLike);

    if (updatedLike) {
      dispatch(addToWishlist({ ...product, like: true }));
      await addWishlistMutation({ productId: product._id, like: true });
    } else {
      dispatch(removeFromWishlist({ ...product, like: false }));
      await addWishlistMutation({ productId: product._id, like: false });
    }
  };

  return { isLike, handleProductWishlist };
};

export default useLike;
