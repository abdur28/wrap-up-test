"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import { useAdmin } from "@/hooks/useAdmin";

interface ProductImagesProps {
  id: string;
  type: string;
  images: string[];
  editable: boolean;
}

const ProductImages : React.FC<ProductImagesProps> = ({ images, editable=false, id, type }: {images: string[], editable: boolean, id: string, type: string}) => {
  const [index, setIndex] = useState(0);
  const [uploadImage, setUploadImage] = useState<any>();
  const [uploadImages, setUploadImages] = useState<any>(images);
  const [done, setDone] = useState<any>();
  const [data, setData] = useState<any>({images: images});
  const [deleteImages, setDeleteImages] = useState<any>([]);
  const [maxImages, setMaxImages] = useState<number>(10-uploadImages.length);

  const {deleteImage, isLoading, updateItem} = useAdmin();


  useEffect(() => {
    if (uploadImage) {
      setUploadImages((prev: any) => [...prev, uploadImage?.secure_url]);
    }
  }, [uploadImage]);

  useEffect(() => {
    setData({
      images: uploadImages
    })
  }, [uploadImages]);

  useEffect(() => {
    const filteredImages = uploadImages.filter((image: any) => image !== undefined && image !== null);
    if (filteredImages.length !== images.length) {
      const data = {
        images: filteredImages
      }
      setData(data);
    } 
  }, [done]);

  return (
    <div className="">
    {editable ? (
      <>
      <div className='flex flex-col gap-5'>
        <div className={`w-full h-full bg-transparent backdrop-blur-2xl relative flex flex-wrap justify-start items-start}`}>
          
          {uploadImages.length > 0 && uploadImages.map((image: any, i: any) => (
            <div className="w-1/5 h-1/5 flex flex-row p-2 justify-start items-start "
            key={i}
            >
              <Image
                src={image}
                alt=""
                width={100}
                height={100}
                className="object-contain aspect-square"
              />
              <div className="w-5 h-5 absolute ">
                
                  <Image
                  src={'/cross.png'}
                  alt=""
                  width={50}
                  height={50}
                  className="cursor-pointer hover:scale-125 transition-none"
                  onClick={() => {
                    setDeleteImages((prev: any) => [...prev, image]);
                    setUploadImages((prev: any) => prev.filter((_: any, index: any) => index !== i));
                    setData({
                      images: uploadImages
                    })
                  }}
                />
              
              </div>
            </div>
          ))}
            <CldUploadWidget uploadPreset="mazamaza_shop" 
            options={
              {maxFiles: maxImages}
            }
            onClose={(e) => setDone(e)}
            // onShowCompleted={(e) => console.log(uploadImage, e, "show")}
            onSuccess={(result) => {setUploadImage(result.info)}}>
              {({ open }) => {
                return (
                  <div className="w-1/5 h-1/5 flex p-7 justify-start items-start">
                    {uploadImages.length >= 10 ? null : (
                    <Image
                      src={'/plus.png'}
                      onClick={() => open()}
                      alt=""
                      width={100}
                      height={100}
                      className="cursor-pointer hover:scale-125 transition-none"
                    />
                  )}
                  </div>
                );
              }}
            </CldUploadWidget>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`px-6 py-2 rounded-2xl border border-black hover:bg-primary ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => {
              if (uploadImages.length > 10) {
                alert("Max 10 images");
              } else {
                deleteImage(deleteImages);
                updateItem({type: type, id: id, data: data})
              }
            }}
          >
            {isLoading ? "Saving..." : "Save Images"}
          </button>
        </div>
      </div>
      </>
    ) : (
      <>
      <div className="h-[500px] relative">
        <Image
          src={images[index] || '/image-placeholder.png'} 
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images?.map((image, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer hover:scale-[1.1] transition-all"
            key={i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={images[i]}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md "
            />
          </div>
        ))}
      </div>
      </>
    )}
      
    </div>
  );
};

export default ProductImages;

