"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import curator from "~/public/curator.png";
import React from "react";
import { Button } from "../ui/button";

type ModalProps = {
  setEditModal?: any;
};

export default function EditModal({ setEditModal }: ModalProps) {
  return (
    <div className="bg-bg-dark/[0.65] fixed bottom-0 left-0 overflow-auto right-0 top-0 z-[9999] inset-0 backdrop-blur-[10px] px-4">
      <div className='relative flex items-center justify-center w-full h-screen'>
        <div className='bg-[#313233] rounded-[8px] !max-w-[800px] px-4 md:px-8 py-6 md:py-10'>
          <div className='w-full flex flex-col items-center justify-center gap-2'>
            <div className='cursor-pointer w-full flex justify-end' onClick={() => setEditModal(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            <h2 className='font-[500] text-[32px]'>Edit Bio</h2>
            <p className='text-center text-[13px] font-[400]'>Your logo will be visible next to your name in your Mintyplex profile and product pages. </p>
            <div className='my-4'>
              <Image
                src={curator}
                width={120}
                height={120}
                alt="curator image"
                className="rounded-full border-[8px] border-mintyplex-dark"
              />
            </div>
            <form className='flex flex-col gap-3 w-full'>
              <div className="form">
                <textarea
                  name=""
                  placeholder="Provide a well detailed description of the item."
                  className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] text-[13px] placeholder:text-[14px] outline-none bg-[rgb(44,45,46)] w-full "
                  id=""
                  rows={4}
                ></textarea>
                <label htmlFor="" className="px-4 text-sm">
                  Bio
                </label>
              </div>
              <div className="form">
                <input
                  type="text"
                  className="px-4 py-6 border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                  placeholder="https://www.x.com/username"
                  required
                />
                <label htmlFor="" className="px-4 text-sm">
                  X(Twitter) link <span className="text-red-600">*</span>
                </label>
              </div>
            </form>
            <div className='w-full flex justify-end mt-4'>
              <Button className='text-white bg-mintyplex-primary'>
                Update
              </Button>
            </div>
          </div>

        </div>
      </div>
      <h2 className="font-[500] text-[32px]">Edit Bio</h2>
      <p className="text-center text-[13px] font-[400]">
        Your logo will be visible next to your name in your Mintyplex
        profile and product pages.{" "}
      </p>
      <div className="my-4">
        <Image
          src={curator}
          width={120}
          height={120}
          alt="curator image"
          className="rounded-full border-[8px] border-mintyplex-dark"
        />
      </div>
      <form className="flex flex-col gap-3 w-full">
        <div className="form">
          <textarea
            name=""
            placeholder="Provide a well detailed description of the item."
            className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] placeholder:text-[14px] outline-none bg-[rgb(44,45,46)] w-full "
            id=""
            rows={6}
          ></textarea>
          <label htmlFor="" className="px-4 text-sm">
            Bio
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
            placeholder="https://www.x.com/username"
            required
          />
          <label htmlFor="" className="px-4 text-sm">
            X(Twitter) link <span className="text-red-600">*</span>
          </label>
        </div>
      </form>
      <div className="w-full flex justify-end mt-4">
        <Button className="text-white bg-mintyplex-primary">
          Update
        </Button>
      </div>
    </div>
  );
}
