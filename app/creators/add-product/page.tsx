/* eslint-disable react/no-children-prop */
'use client'

import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import ReuseableBackground from '~/components/ui/ReuseableBackground';
import Image from "next/image";
import imagee from '../../../components/assets/Frame 442 (1).png';
import ProductForm from '~/components/ui/ProductForm';
import { MdCancel } from "react-icons/md";
import Link from 'next/link';

const AddProduct: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const Active = [
    { name: 'Less Active' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
  ];

  return (
    <div className='px-6' >
        <div>
    <Link href='/'>
    <button className='px-6 py-2 m:hidden my-8 rounded-md font-normal text-[16px] leading-[27px]  border-brand10 border flex gap-4 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

            </button>
    </Link>
        </div>

      <div className='flex justify-between items-center'>
        <h2 className='md:text-[36px] text-[18px] leading-[46px] font-semibold'>
          Add Product
        </h2>
        <div className="gap-4  hidden md:flex items-center">
          <button className='px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-blue-700 border-brand10 border flex gap-4 items-center'>
            Cancel
            <MdCancel />
          </button>
          {/* <AddProductListbox options={Active} initialValue={Active[0]} /> */}
          <button className='bg-blue-500 px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-brand2'>
            Save
          </button>
        </div>
      </div>
      <div className="my-8">
        <ReuseableBackground>
          <form className="w-full h-full">
            {preview ? (
              <Image
                src={preview}
                width={1000}
                height={390}
                objectFit="contain"
                className="h-80 object-contain w-full"
                alt="er"
                onClick={() => {
                  setImage(null);
                }}
              />
            ) : (
              <Image
                src='/assets/imageFrame.png'
                width={1300}
                height={390}
                className='h-80 '
                alt="er"
                onClick={(event: { preventDefault: () => void }) => {
                  event.preventDefault();
                  fileRef.current?.click();
                }}
              />
            )}
            <input
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </form>
        </ReuseableBackground>
      </div>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
