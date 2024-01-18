import React from 'react';
import ReuseableBackground from './ReuseableBackground';
import Toggle from '../customs/Toggle';
import { MdCancel } from 'react-icons/md';

const ProductForm = () => {
  return (
<div>
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
          <p className="text-xs font-light italic  px-4 py-2">Use a unique Product Name.</p>
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
      </form>

     

      <form className="flex py-5 flex-col gap-6">
       
        <div className="form">
          <input
            type="text"
            className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
            placeholder="Select your categories"
            required
          />
          <label htmlFor="" className="px-4 text-sm">
            Categories <span className="text-red-600">*</span>
          </label>
          <p className="text-xs font-light italic py-2">
            This categories is where your products will be showcased. This will also help with SEO (Search Engine Optimization), and will also help Affiliate Marketer find your product easily.
          </p>
        </div>
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
      </form>


    </ReuseableBackground>
      <div className='py-10 bg-[rgb(28,30,30)]'>
      <p className='text-2xl font-semibold '>More Details</p>
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
          <p className="text-xs font-light italic  px-4 py-2">Use a unique Product Name.</p>
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
          Quantity Available <span className="text-red-600">*</span>
          </label>
          <button className='px-2 py-2 rounded-md font-normal text-[16px] leading-[27px] text-black bg-[rgb(231,241,244)] border-brand10 border flex gap-4 items-center'>
          <MdCancel />
           Web3
              
            </button>
          <button className='px-2 py-2 rounded-md font-normal text-[16px] leading-[27px] text-black bg-[rgba(13,110,253,1)] border-brand10 border flex gap-4 items-center'>
          Add tags
            </button>
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
      </form>


    </ReuseableBackground>
</div>

  );
};

export default ProductForm;
