/* eslint-disable react/no-children-prop */
'use client'

import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import ReuseableBackground from '~/components/ui/ReuseableBackground';
import Image from "next/image";
import imagee from '../../../components/assets/Frame 442 (1).png';
import ProductForm from '~/components/ui/ProductForm';
import { MdCancel } from "react-icons/md";
import Link from 'next/link';
import DashboardLayout from '~/components/dashboardlayout/page';

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
    <DashboardLayout>
      <div className='mt-10' >
        <div>
          <Link href='/dashboard'>
            <button className='px-3 py-2 md:hidden my-8 rounded-md font-normal text-[16px] leading-[27px]  border-brand10 border flex gap-4 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#E9E9E9"/>
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
    </DashboardLayout>
  );
};

export default AddProduct;
