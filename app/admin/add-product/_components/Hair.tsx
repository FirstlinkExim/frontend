"use client";

import React, { useCallback, useRef, useState } from "react";
import Select from "../../../../components/inputs/Select";
import Input from "../../../../components/inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { AddProductSchema } from "@/schemas";
import UploadImage, { UploadImageRef } from "./UploadImage";
import TextArea from "../../../../components/inputs/TextArea";
import useGeoLocation from "@/hooks/useGeoLocation";
import symbols from "@/data/country-symbol.json";
import Button from "../../../../components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
type Schema = z.infer<typeof AddProductSchema>;

const HairProduct = () => {
  const uploadImageRef = useRef<UploadImageRef>(null);
  const [size, setSize] = useState("");
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient();
  const { mutateAsync: addProductMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/products", data)
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
  } = useForm<Schema>({
    resolver: zodResolver(AddProductSchema),
  });

  const onSubmit = async (values: Schema) => {
    if (uploadImageRef.current?.handleValidate()) {
      return true;
    }

    const responseData = {
      ...values,
      size: size,
      images: uploadImageRef.current?.images,
     color: values.color.toLowerCase().trim().split(",").map((color: string) => color.trim())
    };
    
    await addProductMutation(responseData)
    
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
          <div className="shadow bg-white rounded-md p-4 w-full sm:max-h-[380px] h-full">
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

          {/* Images */}
          <div className="shadow bg-white rounded-md p-4 w-full">
            <p className="text-lg font-semibold mb-3">Product Media</p>

            <UploadImage ref={uploadImageRef} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1  gap-6">
          {/* Price */}
          <div className="shadow bg-white rounded-md p-4 w-full">
            <p className="text-lg font-semibold">Pricing</p>

            <div className="flex flex-col gap-4 mt-3">
              <Input
                register={register}
                id="price"
                label="Basic Price"
                error={errors.price?.message}
                hasBg
              />
              <div
                className="grid grid-cols-2 
              sm:grid-cols-1 gap-4 items-center"
              >
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
                  {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((val, i) => (
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

              <Input
                register={register}
                id="color"
                label="Product Color"
                hasBg
              />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="shadow bg-white rounded-md p-4  w-full">
            <p className="text-lg font-semibold">Inventory</p>

            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <Input register={register} id="sku" label="SKU" hasBg />
              <Input register={register} id="barCode" label="Barcode" hasBg />
              <Input register={register} id="stock" label="Quantity" hasBg />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HairProduct;
