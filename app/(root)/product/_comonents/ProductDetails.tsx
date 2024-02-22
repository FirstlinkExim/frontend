"use client";

import React, { useState } from "react";
import ProductImage from "./ProductImage";
import ProductView from "./ProductView";
import ProductDetailTab from "./ProductDetailTab";
import RelatedProduct from "./RelatedProduct";
import { IImage } from "@/types";

export const images: IImage[] = [
  {
    id: "1",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mug-today-is-a-good-day.jpg",
  },
  {
    id: "2",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg",
  },
  {
    id: "3",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/69-home_default/mug-today-is-a-good-day.jpg",
  },
  {
    id: "4",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/67-home_default/mug-today-is-a-good-day.jpg",
  },
  {
    id: "5",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/68-home_default/mug-today-is-a-good-day.jpg",
  },
  {
    id: "6",
    url: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/72-home_default/mug-today-is-a-good-day.jpg",
  },
];

const ProductDetails = ({ id }: { id: String }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      <div className="flex md:flex-row flex-col gap-4">
        <ProductImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
        <ProductView />
      </div>

      <ProductDetailTab />

      <div className="my-10">
        <h4 className="text-2xl font-semibold">Related Products</h4>
        <RelatedProduct />
      </div>
    </>
  );
};

export default ProductDetails;
