"use client";

import Image from "next/image";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

interface UploadImageProps {}

export interface UploadImageRef {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  handleValidate: () => void;
}
const UploadImage: React.ForwardRefRenderFunction<
  UploadImageRef,
  UploadImageProps
> = (props, ref) => {
  const [images, setImages] = useState<File[]>([]);
  const [validate, setValidate] = useState(false);
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      // Do something with the acceptedFiles
      setImages((prevImage) => [...prevImage, ...acceptedFiles]);
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          console.error(`File ${file.name} was rejected: ${error.message}`);
          // Here you can show an error message to the user
          alert(`File ${file.name} was rejected: ${error.message}`);
        });
      });
    },
    [setImages]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleValidate = useCallback(() => {
    if (images.length === 0) {
      setValidate(true);
    }
  }, [images.length]);

  useImperativeHandle(ref, () => ({
    images,
    setImages,
    handleValidate,
  }));


  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center justify-center w-full">
        <label
          {...getRootProps()}
          htmlFor="image"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`flex flex-col items-center justify-center w-full h-64 border ${
            validate && images.length === 0  ? "border-red-400" : "border-gray-300"
          } border-dashed rounded-lg cursor-pointer bg-gray-50`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            multiple
            name="image"
            {...getInputProps()}
            id="image"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {images.length > 0 &&
          images.map((image, index) => (
            <Image
              width={150}
              height={150}
              key={index}
              src={URL.createObjectURL(image)}
              alt="product-image"
              className="w-[120px] h-[130px] rounded-md object-cover shadow border"
            />
          ))}
      </div>
    </div>
  );
};

export default forwardRef(UploadImage);
