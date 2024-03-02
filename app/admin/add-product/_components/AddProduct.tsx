"use client";

import React, { useRef } from "react";
import Select from "../../../../components/inputs/Select";
import Input from "../../../../components/inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { AddProductSchema } from "@/schemas";
import UploadImage, { UploadImageRef } from "./UploadImage";
import TextArea from "../../../../components/inputs/TextArea";
import Button from "../../../../components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import MultiSelect from "@/components/inputs/MultiSelect";
type Schema = z.infer<typeof AddProductSchema>;

const clothSizes = [
  {
    label: "Small",
    value: "Small",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Large",
    value: "Large",
  },
  {
    label: "XL",
    value: "XL",
  },
  {
    label: "2XL",
    value: "2XL",
  },
  {
    label: "3XL",
    value: "3XL",
  },
  {
    label: "4XL",
    value: "4XL",
  },
  {
    label: "5XL",
    value: "5XL",
  },
  {
    label: "6XL",
    value: "6XL",
  },
];

const clothesCategory = ["Mens", "Womens", "Girls", "Boys", "Shoes"];
const hairCategory = ["Human Hair", "Straight hair", "Curly hair"];
const hairQuality = ["Premium Quality", "Matural Quality"];
const hairSizes = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "12",
    value: "12",
  },
  {
    label: "14",
    value: "14",
  },
  {
    label: "16",
    value: "16",
  },
  {
    label: "18",
    value: "18",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "22",
    value: "22",
  },
  {
    label: "24",
    value: "24",
  },
  {
    label: "26",
    value: "26",
  },
  {
    label: "28",
    value: "28",
  },
  {
    label: "30",
    value: "30",
  },
];

const AddProduct = () => {
  const uploadImageRef = useRef<UploadImageRef>(null);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: addProductMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.post("/products", data);
      return response.data;
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
    setValue,
    reset,
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(AddProductSchema),
  });

  const type = watch("type");

  const onSubmit = async (values: Schema) => {
    if (uploadImageRef.current?.handleValidate()) {
      return true;
    }
    const images = uploadImageRef.current?.images;

    const productSize = values.size.map((val) => val.value);
    console.log(productSize);
    
    // const colors = values.colors
    //   .split(",")
    //   .map((val) => val.toLowerCase().trim());
    // const responseData = {
    //   ...values,
    //   sizes: productSize,
    //   price: +values.price,
    //   colors: colors,
    //   discountPrice: +values.discountPrice,
    //   shippingPrice: +values.shippingPrice,
    //   images,
    //   stock: +values.stock
    // };

    // await addProductMutation(responseData);
    // reset();
    // setValue("size", []);
    // uploadImageRef.current?.resetImages();
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
          <div className="flex flex-col gap-6">
            <div>
              <div className="shadow bg-white rounded-md p-4 w-full">
                <p className="text-lg font-semibold mb-3">Product Media</p>

                <UploadImage ref={uploadImageRef} />
              </div>
            </div>

            <div className="shadow bg-white rounded-md p-4 w-full sm:max-h-[380px]">
              <p className="text-lg font-semibold">Specifications</p>

              <div className="flex flex-col gap-4 mt-3">
                <Input
                  register={register}
                  id="colors"
                  label="Product Color"
                  hasBg
                />
                {type === "Hair" ? (
                  <Controller
                    control={control}
                    name="quality"
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => (
                      <Select
                        options={hairQuality}
                        selected={value}
                        onChange={onChange}
                        label="Quality"
                        hasBg
                        error={errors.type?.message}
                      />
                    )}
                  />
                ) : (
                  <Input
                    register={register}
                    id="quality"
                    label="Quality"
                    hasBg
                  />
                )}

                <Controller
                  control={control}
                  name="type"
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => (
                    <Select
                      options={["Clothes", "Hair"]}
                      selected={value}
                      onChange={onChange}
                      label="Type"
                      hasBg
                      error={errors.type?.message}
                    />
                  )}
                />
              </div>
            </div>
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
                      options={type === "Hair" ? hairCategory : clothesCategory}
                      selected={value}
                      onChange={onChange}
                      label="Product Category"
                      hasBg
                      error={errors.category?.message}
                    />
                  )}
                />

                <Controller
                  name="size"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <MultiSelect
                      options={type === "Hair" ? hairSizes : clothSizes}
                      label={type === "Hair" ? "Size (in inch)" : "Size"}
                      value={value}
                      onChange={onChange}
                      error={errors.size?.message}
                      hasBg
                    />
                  )}
                />
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
