import React from 'react';
import ReuseableBackground from './ReuseableBackground';
import Toggle from '../customs/Toggle';

const ProductForm = () => {
  return (
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
            Product Name <span className="text-brand12">*</span>
          </label>
          <p className="text-xs font-light italic  px-4 py-2">Use a unique Product Name.</p>
        </div>
        <div className="form">
          <input
            type="text"
            className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
            placeholder="1%"
            required
          />
          <label htmlFor="" className="px-4 text-sm">
            Referral <span className="text-brand12">*</span>
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
            Product Price ($) <span className="text-brand12">*</span>
          </label>
        </div>
      </form>

      <div className="bg-bg-dark flex justify-between  py-4 px-4 rounded-lg  ">
        <div className="flex gap-3 items-center justify-between">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
          <h3 className="text-base ">Referral</h3>
        </div>
        <Toggle />
      </div>

      <form className="flex py-5 flex-col gap-6">
        <div className="form">
          <input
            type="text"
            className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
            placeholder="1%"
            required
          />
          <label htmlFor="" className="px-4 text-sm">
            Referral <span className="text-brand12">*</span>
          </label>
          <p className="text-xs font-light italic  px-4 py-2">
            This categories is where your products will be showcased. This will also help with SEO (Search Engine Optimization), and will also help Affiliate Marketer find your product easily.
          </p>
          <p className="text-xs font-light italic  px-4 py-2">Set your Referral Rate.</p>
        </div>
        <div className="form">
          <input
            type="text"
            className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
            placeholder="Select your categories"
            required
          />
          <label htmlFor="" className="px-4 text-sm">
            Categories <span className="text-brand12">*</span>
          </label>
          <p className="text-xs font-light italic px-4 py-2">
            This categories is where your products will be showcased. This will also help with SEO (Search Engine Optimization), and will also help Affiliate Marketer find your product easily.
          </p>
        </div>
        <div className="form">
          <textarea
            name=""
            placeholder="Provide a well detailed description of the item."
            className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] placeholder:text-[14px]  w-full bg-brand10"
            id=""
            rows={6}
          ></textarea>
          <label htmlFor="" className="px-4 text-sm">
            Description<span className="text-brand12">*</span>
          </label>
        </div>
      </form>
    </ReuseableBackground>
  );
};

export default ProductForm;
