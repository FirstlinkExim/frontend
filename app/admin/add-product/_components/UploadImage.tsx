"use client";

import { axiosInstance } from "@/config/api";
import { IImage } from "@/types";
import Image from "next/image";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import CircularProgressbar from "../../../../components/CircularProgressbar";
import { toast } from "react-toastify";

interface UploadImageProps {}

export interface UploadImageRef {
  image: IImage | undefined;
  setImage: React.Dispatch<React.SetStateAction<IImage | undefined>>;
  handleValidate: () => void;
}
const UploadImage: React.ForwardRefRenderFunction<
  UploadImageRef,
  UploadImageProps
> = (props, ref) => {
  const [image, setImage] = useState<IImage>();
  const [validate, setValidate] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState<number | null>(null);

  const uploadImages = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // files.forEach((file) => {
      //   formData.append("files", file);
      // });

      const response = await axiosInstance.post(
        "/products/upload-media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progress) => {
            const percentCompleted = progress.total
              ? Math.round((progress.loaded / progress.total) * 100)
              : 0;
            setUploadPercentage(percentCompleted);
          },
        }
      );
      setImage(response.data);
      setUploadPercentage(null);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      if (fileRejections.length) {
        toast.error("Too many file upload.", {
          position: "top-center",
        });
        return;
      }
      await uploadImages(acceptedFiles[0]);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  const handleValidate = useCallback(() => {
    if (!image) {
      setValidate(true);
    }
  }, [image]);

  useImperativeHandle(ref, () => ({
    image,
    setImage,
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
            validate && !image ? "border-red-400" : "border-gray-300"
          } border-dashed rounded-lg cursor-pointer bg-gray-50`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadPercentage !== null ? (
              <>
                <p className="opacity-70">Uploading...</p>
                <CircularProgressbar value={uploadPercentage} />
              </>
            ) : (
              <>
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
                <p className="mb-2 text-sm text-gray-500  text-center px-2">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </>
            )}
          </div>
          <input
            // multiple
            name="image"
            {...getInputProps()}
            id="image"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

     
    </div>
  );
};

export default forwardRef(UploadImage);
