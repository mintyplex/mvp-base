import React from "react";
import ReuseableBackground from "./ReuseableBackground";
import { MdCancel } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const ProductForm = () => {
  return (
    <div>
      <div className="py-4 md:py-7 bg-[rgb(28,30,30)]">
        <p className="text-2xl font-semibold ">Product Details</p>
      </div>
      <ReuseableBackground>
        <form className="flex py-5 flex-col gap-6">
          <div className="form">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="Enter your Product Name"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Product Name <span className="text-red-600">*</span>
            </label>
            <p className="text-xs font-light italic  px-4 py-2">
              Use a unique Product Name.
            </p>
          </div>

          <div className="form">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Product Price ($) <span className="text-red-600">*</span>
            </label>
          </div>

          <div className="form">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Discount ($) <span className="text-red-600">*</span>
            </label>
          </div>
        </form>

        <form className="flex py-5 flex-col gap-6">
          <div className="form">
            <textarea
              name=""
              placeholder="Provide a well detailed description of the item."
              className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] placeholder:text-[14px] outline-none bg-[rgb(44,45,46)] w-full "
              id=""
              rows={6}
            ></textarea>
            <label htmlFor="" className="px-4 text-sm">
              Description<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="form">
            <div className="relative">
            <Select>
      <SelectTrigger className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] ">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-[rgb(99,99,99)]">
        <SelectGroup >
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <label htmlFor="" className="px-4 text-sm">
              Categories <span className="text-red-600">*</span>
            </label>
            <p className="text-xs font-light italic py-2">
              This categories is where your products will be showcased. This
              will also help with SEO (Search Engine Optimization), and will
              also help Affiliate Marketer find your product easily.
            </p>
          </div>
        </form>
      </ReuseableBackground>
      <div className="md:py-7 py-5 bg-[rgb(28,30,30)]">
        <p className="text-2xl font-semibold ">More Details</p>
      </div>
      <ReuseableBackground>
        <div className="flex items-center justify-center gap-4 rounded-lg  mt-6 bg-[#1D1E1F] py-4 ">
          <h1 className="flex text-base justify-center items-center">
            Downloadable file
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 rounded-lg  mt-6 bg-[#1D1E1F] py-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M13.4375 17.1875L20 23.75L26.5625 17.1875"
              stroke="#E9E9E9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 6.25V23.75"
              stroke="#E9E9E9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M33.75 23.75V32.5C33.75 32.8315 33.6183 33.1495 33.3839 33.3839C33.1495 33.6183 32.8315 33.75 32.5 33.75H7.5C7.16848 33.75 6.85054 33.6183 6.61612 33.3839C6.3817 33.1495 6.25 32.8315 6.25 32.5V23.75"
              stroke="#E9E9E9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="flex flex-col justify-center items-center">
            <h1 className="flex text-base justify-center items-center">
              Upload a file or drag and drop
            </h1>
            <h1 className="flex justify-center items-center text-[13px]">
              PNG or JPEG upto 5MB
            </h1>
          </div>
        </div>

        <form className="flex py-5 flex-col gap-6">
          <div className="form my-3">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Quantity Available <span className="text-red-600">*</span>
            </label>
            <p className="text-xs font-light italic  px-4 py-2">
              Set Quantity to <span className="text-[#2063F2]">0</span> for
              unlimited
            </p>
          </div>
          <div className="form">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Add tags <span className="text-red-600">*</span>
            </label>
          </div>

          <div className="flex justify-end  gap-4  items-center ">
            <button className="px-2 py-2 rounded-md font-normal text-[16px] leading-[27px] text-black bg-[rgb(231,241,244)] border-brand10 border flex gap-4 items-center">
              <MdCancel />
              Web3
            </button>
            <button className="px-2 py-2 rounded-md font-normal text-[16px] leading-[27px]  bg-[rgba(13,110,253,1)] border-brand10 border flex gap-4 items-center">
              Add tags
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="form">
              <div className="relative">
              <Select>
      <SelectTrigger className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] ">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-[rgb(99,99,99)]">
        <SelectGroup >
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
              </div>
              <label htmlFor="" className="px-4 text-sm">
                Attribute
              </label>
            </div>
            <div className="form">
              <div className="relative">
              <Select>
      <SelectTrigger className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] ">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-[rgb(99,99,99)]">
        <SelectGroup >
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
              </div>
              <label htmlFor="" className="px-4 text-sm">
                Attribute
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 md:gap-4 pt-4 items-center ">
            <button className="px-2 py-2 rounded-md font-normal text-[14px] md:text-[16px] leading-[27px] text-black bg-[rgb(231,241,244)] border-brand10 border flex gap-2 md:gap-4 items-center">
              <MdCancel />
              Face: Beauitful
            </button>
            <button className="px-2 py-2 rounded-md font-normal text-[16px] leading-[27px]  bg-[rgba(13,110,253,1)] border-brand10 border flex gap-4 items-center">
              Add new Attribute
            </button>
          </div>
        </form>
      </ReuseableBackground>
    </div>
  );
};

export default ProductForm;
