"use client";

import React, { useRef, useState } from "react";
import Select from "../../../../components/inputs/Select";
import Input from "../../../../components/inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { AddProductColorSchema, AddProductSchema } from "@/schemas";
import UploadImage, { UploadImageRef } from "./UploadImage";
import TextArea from "../../../../components/inputs/TextArea";
import useGeoLocation from "@/hooks/useGeoLocation";
import symbols from "@/data/country-symbol.json";
import Button from "../../../../components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Image from "next/image";
import { IImage } from "@/types";
type Schema = z.infer<typeof AddProductSchema>;
type ColorSchema = z.infer<typeof AddProductColorSchema>;

type Image = {
  color: string;
  url: string;
};
const AddProduct = () => {
  const uploadImageRef = useRef<UploadImageRef>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [size, setSize] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: addProductMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/products", data);
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(`Product added successfully`);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<Schema>({
    resolver: zodResolver(AddProductSchema),
  });

  const {
    register: registerColor,
    handleSubmit: handleSubmitColor,
    formState: { errors: errorsColor },
    setValue: setColorValue,
  } = useForm<ColorSchema>({
    resolver: zodResolver(AddProductColorSchema),
  });

  const onSubmit = async (values: Schema) => {
    if (!images.length) {
      toast.error("Please select a product image with color", {
        position: "top-center",
      });
      return ;
    }

    const responseData = {
      ...values,
      size: size,
      price: +values.price,
      discountPrice: +values.discountPrice,
      shippingPrice: +values.shippingPrice,
      images,
    };
    await addProductMutation(responseData);
    reset()
    setImages([])
  };

  const onSubmitColorImage = (values: ColorSchema) => {
    if (uploadImageRef.current?.handleValidate()) {
      return true;
    }
    setImages((prevImage) => {
      const imageUrl = uploadImageRef.current?.image?.url;
      if (!imageUrl) {
        return prevImage;
      }
      return [
        ...prevImage,
        {
          color: values.color,
          url: imageUrl,
        },
      ];
    });
    setColorValue("color", "");

  };

  return (
    <div className="flex items-center justify-center flex-col gap-6 mb-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-center text-2xl font-semibold">Create Product</h1>

        <div>
          <Button label="Add Product" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>

      {/* <Controller
          name="description"
          defaultValue=""
          control={control}
          rules={{ required: "Please enter the product description!" }}
          render={({ field }) => (
            <Editor
              label="Description"
              value={field.value}
              onChange={field.onChange}
              error={errors.description?.message}
            />
          )}
        /> */}

      <form className="w-full flex flex-col gap-8">
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-6">
          <div>
            <div className="shadow bg-white rounded-md p-4 w-full h-[500px]">
              <p className="text-lg font-semibold mb-3">Product Media</p>

              <UploadImage ref={uploadImageRef} />

              <Input
                register={registerColor}
                id="color"
                label="Product Color"
                hasBg
              />
              <div className="mt-4 w-[120px]">
                <Button
                  label="Save"
                  onClick={handleSubmitColor(onSubmitColorImage)}
                />
              </div>
            </div>

            {images.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 shadow rounded-md bg-white p-4 mt-4">
                {images.length > 0 &&
                  images.map((image: any, index) => (
                    <div key={index}>
                      <Image
                        width={150}
                        height={150}
                        src={image?.url}
                        alt="product-image"
                        className="w-[120px] h-[130px] rounded-md object-cover shadow border"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="shadow bg-white rounded-md p-4 w-full sm:max-h-[380px]">
              <p className="text-lg font-semibold">General Information</p>

              <div className="flex flex-col gap-4 mt-3">
                <Input
                  register={register}
                  id="title"
                  label="Product Title"
                  error={errors.title?.message}
                  hasBg
                />
                <TextArea
                  register={register}
                  id="description"
                  label="Description"
                  error={errors.description?.message}
                  hasBg
                  cols={10}
                />
              </div>
            </div>

            {/* Price */}
            <div className="shadow bg-white rounded-md p-4 w-full">
              <p className="text-lg font-semibold">Pricing</p>

              <div className="flex flex-col gap-4 mt-3">
                <div className="flex items-center gap-4">
                  <div className="sm:w-[100px] w-[80px]">
                    <Controller
                      control={control}
                      name="currency"
                      defaultValue="₹"
                      render={({
                        field: { value, onChange },
                        formState: { errors },
                      }) => (
                        <Select
                          options={["₹", "$", "€"]}
                          selected={value}
                          onChange={onChange}
                          label="Currency"
                          hasBg
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      register={register}
                      id="price"
                      label="Basic Price"
                      error={errors.price?.message}
                      hasBg
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <Input
                    register={register}
                    id="shippingPrice"
                    label="Shipping Price"
                    hasBg
                  />
                  <Input
                    register={register}
                    id="discountPrice"
                    label="Discount Percentage(%)"
                    hasBg
                  />
                  <Controller
                    control={control}
                    name="descountType"
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => (
                      <Select
                        options={[
                          "Free Shipping",
                          "Buy One, Get One",
                          "Cashback",
                        ]}
                        selected={value}
                        onChange={onChange}
                        label="Discount Type"
                        hasBg
                        error={errors.category?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="shadow bg-white rounded-md p-4 w-full">
              <p className="text-lg font-semibold">Category</p>

              <div className="flex flex-col gap-4 mt-3">
                <Controller
                  control={control}
                  name="category"
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => (
                    <Select
                      options={["Mens", "Womens", "Girls", "Boys"]}
                      selected={value}
                      onChange={onChange}
                      label="Product Category"
                      hasBg
                      error={errors.category?.message}
                    />
                  )}
                />

                <div>
                  <p className="text-xs font-medium text-gray-900">
                    Product Size
                  </p>

                  <div className="flex flex-wrap gap-3 mt-1">
                    {[
                      "XS",
                      "S",
                      "M",
                      "L",
                      "XL",
                      "XXL",
                      "3XL",
                      "4XL",
                      "5XL",
                      "6XL",
                    ].map((val, i) => (
                      <div
                        key={i}
                        onClick={() => setSize(val)}
                        className={`border rounded-md h-10 w-11 flex items-center justify-center text-xs cursor-pointer
                      ${val === size && "bg-gray-200"}
                      `}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}

            <div className="shadow bg-white rounded-md p-4  w-full">
              <p className="text-lg font-semibold">Inventory</p>

              <div className="grid grid-cols-3 gap-4 items-center mt-3">
                <Input register={register} id="sku" label="SKU" hasBg />
                <Input register={register} id="barcode" label="Barcode" hasBg />
                <Input register={register} id="stock" label="Quantity" hasBg />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
