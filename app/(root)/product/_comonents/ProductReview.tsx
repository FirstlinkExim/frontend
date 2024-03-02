"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdStarOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { customerState } from "@/redux/slices/customerSlice";
import useProfile from "@/hooks/queries/useProfile";
import useNotLoggedInModal from "@/hooks/modals/useNotLoggedInModal";
import { ReviewSchema } from "@/schemas";
import NotLoggedInModal from "@/components/modals/NotLoggedInModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { IProduct, IReview } from "@/types";
import useReviews from "@/hooks/queries/useReviews";
import ReactTimeAgo from "react-time-ago";
import { differenceInMinutes, formatDistanceToNow } from "date-fns";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

type Schema = z.infer<typeof ReviewSchema>;

const ProductReview = ({ product }: { product: IProduct }) => {
  const [hover, setHover] = useState(-1);
  const { token } = useAppSelector(customerState);
  const { customer } = useProfile();
  const notLoggedInModal = useNotLoggedInModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { reviews, isLoading } = useReviews(product._id);
  const [reviewId, setReviewId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(ReviewSchema),
  });

  const { mutateAsync: addProductReviewMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/products/reviews", data);
      return response.data;
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(`Review added successfully`);
    },
  });

  const { mutateAsync: editProductReviewMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.patch(
        `/products/${product._id}/reviews/${reviewId}`,
        data
      );
      return response.data;
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(`Review updated successfully`);
    },
  });

  const onSubmit = async (values: Schema) => {
    if (!token) {
      notLoggedInModal.onOpen();
      return;
    }
    if (reviewId) {
      await editProductReviewMutation(values);
    } else {
      const responseBody = {
        ...values,
        productId: product._id,
      };
      await addProductReviewMutation(responseBody);
    }
    setValue("message", "");
    setValue("rating", 0);
  };

  const rating = watch("rating");

  const handleEditAddress = (review: IReview) => {
    setReviewId(review._id);
    setValue("message", review.message);
    setValue("rating", review.rating);
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-8">
        <div className="flex gap-4 md:w-[500px] w-full">
          <div className="w-14 h-14 rounded-full ">
            <Image
              src={
                customer?.profileImg
                  ? customer?.profileImg.url
                  : "/images/user.png"
              }
              alt="user"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <textarea
              id="message"
              rows={3}
              {...register("message")}
              className={`flex-1 w-full border p-2 ${
                errors.message?.message ? "border-red-600" : "border-gray-300"
              } rounded outline-0 text-sm`}
            ></textarea>

            <div className="flex gap-4 mt-1">
              <p
                className={`text-sm ${
                  errors.rating?.message && "text-red-600"
                }`}
              >
                Review:{" "}
              </p>

              <Controller
                name="rating"
                defaultValue={0}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Rating
                    size="small"
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <MdStarOutline
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                  />
                )}
              />
              {rating !== null && (
                <p className="text-sm">
                  {labels[hover !== -1 ? hover : rating]}
                </p>
              )}
            </div>

            <div className="w-1/2 mt-2">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-primary text-white text-sm font-medium h-9 cursor-pointer px-8 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-h-[400px] flex-1 overflow-y-auto">
          {isLoading
            ? "Loading..."
            : reviews && reviews.length > 0
            ? reviews.map((review: IReview) => (
                <Reviews
                  key={review._id}
                  review={review}
                  productId={product._id}
                  handleEditAddress={handleEditAddress}
                  customerId={customer._id}
                />
              ))
            : <div className="flex items-center justify-center mt-10 font-semibold text-xl opacity-65">
              No Review Yet
              </div>}
        </div>
      </div>

      {notLoggedInModal.isOpen && (
        <NotLoggedInModal title="Please login yourself to review the product" />
      )}
    </>
  );
};

export default ProductReview;

const Reviews = ({
  review,
  productId,
  handleEditAddress,
  customerId,
}: {
  review: IReview;
  productId: string;
  handleEditAddress: (review: IReview) => void;
  customerId: string;
}) => {
  const { customer, message, createdAt, rating } = review;

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProductReviewMutation } = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.delete(
        `/products/${productId}/reviews/${review._id}`
      );
      return response.data;
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Review deleted successfully");
    },
  });

  const handleDeleteReview = async () => {
    await deleteProductReviewMutation();
  };

  const minutesAgo = differenceInMinutes(new Date(), new Date(createdAt));
  const timePassed = minutesAgo >= 5;
  const canEditDelete = customerId === customer?._id && !timePassed
  
  
  
  

  return (
    <div className="flex gap-2 border p-4 rounded">
      <div className="w-12 h-12 rounded-full">
        <Image
          src={
            customer?.profileImg ? customer?.profileImg.url : "/images/user.png"
          }
          alt="user"
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex  justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-sm">{customer?.name}</p>
            <Rating
              size="small"
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
          </div>

          <p className="text-sm text-gray-500">
            <ReactTimeAgo date={createdAt} locale="en-US" />
          </p>
        </div>

        <div>
          <p className="text-xs mt-2 opacity-80">{message}</p>

          {
            canEditDelete && <div className="flex items-center gap-2 mt-2">

            <button onClick={() => handleEditAddress(review)}>
              <FiEdit className="text-blue-600" />
            </button>
       

          <button onClick={handleDeleteReview}>
            <MdOutlineDeleteOutline size={20} className="text-primary" />
          </button>
        </div>
          }
        </div>
      </div>
    </div>
  );
};
