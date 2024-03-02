"use client";

import React, { useState } from "react";
import ProductImage from "./ProductImage";
import ProductView from "./ProductView";
import ProductDetailTab from "./ProductDetailTab";
import RelatedProduct from "./RelatedProduct";
import { IImage } from "@/types";
import useProduct from "@/hooks/queries/useSingleProduct";



const ProductDetails = ({ id }: { id: String }) => {
  const { product} = useProduct(id as string)
  
  const [selectedImage, setSelectedImage] = useState(0);
  if(!product) return null
  return (
    <>
      <div className="flex md:flex-row flex-col gap-4">
        <ProductImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={product.images}
        />
        <ProductView selectedImage={product.images[selectedImage]} product={product} />
      </div>

      <ProductDetailTab product={product} />

      <div className="my-10">
        <h4 className="text-2xl font-semibold">Related Products</h4>
        <RelatedProduct />
      </div>
    </>
  );
};

export default ProductDetails;
