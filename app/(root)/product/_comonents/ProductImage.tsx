"use client";

import { IImage } from "@/types";
import Image from "next/image";
import Slider from "react-slick";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const ProductImage = ({
  selectedImage,
  setSelectedImage,
  images,
}: {
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
  images: IImage[];
}) => {
  const PrevArrow = ({
    onClick,
  }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`w-6 h-6 rounded-full border border-gray-400/50 bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-0 transition text-gray-700 absolute -left-2 top-1/2 -translate-y-1/2 z-10`}
      >
        <MdChevronLeft size={18} />
      </button>
    );
  };

  const NextArrow = ({
    onClick,
  }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <button
        onClick={onClick}
        className="w-6 h-6 rounded-full border border-gray-400/50 bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-0 transition text-gray-700 absolute -right-2 top-1/2 -translate-y-1/2 z-10"
      >
        <MdChevronRight size={18} />
      </button>
    );
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    adaptiveHeight: true,
    rtl: false,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  
  };

  const src = images[selectedImage].url;
  const alt = `product-${selectedImage}`;
  return (
    <div className="md:w-1/2 w-full flex flex-col gap-4">
      <div className="w-full border h-[500px] rounded p-2">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="px-2"
            >
              <Image
                src={image.url}
                alt={`product-image-${index}`}
                width={150}
                height={150}
                className="rounded border object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImage;
