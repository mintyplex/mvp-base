"use client";

import React from 'react'
import Link from 'next/link'
import CreatorsCard from '~/components/ui/Creator-sales-card'
import CreatorsListbox from '~/components/ui/select';
import Accordium from '~/components/ui/Accordium';
import ReusableTable from '~/components/ui/Reuseable-table';
import Image from 'next/image';
import { headers, data, dataSales, headersSales, dataPurchase, headerPurchase } from '~/utils/constants/table-data';
import  { Doughnutt } from '../ui/graph/Creator-Doughnut';
import { CreatorChart } from '../ui/graph/Creator-line-chart';
// import CreatorLineChart from '~/components/ui/graph/creator-line-chart';

const CreatorDashboard = () => {
  const people = [
    { name: "product Type" },
    { name: "Last 1 week" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];
  const ProductType = [
    { name: " Active" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];
  const Active = [
    { name: " Active customer" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];

  const Creators = [
    {
      product: "Active Customer",
      value: "$5,000",
      border: "border-[rgba(0,128,0,1)] border-[1px]",
      width: "md:w-[276px] ",
      graph: "2.3%",
    },
    {
      product: "All Product",
      value: 5,
      color: 'bg-[rgba(0,204,153,1)]',
      width: ' w-[206px] ',

    },
    {
      product: "All Sales",
      value: 4,
      color: 'bg-[rgba(164,49,255)]',
      width: ' w-[206px] '
    },
    {
      product: "Active Customer",
      value: 4,
      color: 'bg-[rgba(255,115,174,1)]',
      width: ' w-[206px] ',

    }

  ]



  return (
    <div className='w-full pb-4 '>
      <div className='w-full flex flex-col gap-8 '>
        <div className='w-full mt-10'>
          <div className='flex md:flex-row flex-col md:justify-between md:items-center'>
            <div className='flex flex-col gap-1'>
              <h2 className='md:text-[36px] text-[31px] leading-[46px] font-semibold'>
                Creators Dashboard
              </h2>
              <p className=" text-16 font-normal leading-[30px]">
                Since the launch of your store, heres what has happened.
              </p>
            </div>
            <Link href="/dashboard/add-product">
              <button className="bg-[rgba(30,91,221,1)] hidden md:block px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-brand2">
                Add Product
              </button>
            </Link>
          </div> 
          <div className='flex overflow-x-auto justify-between mt-10 gap-4 w-full md:w-fit'>
            {
              Creators.map((card, index) => (
                <div key={index}>
                  <CreatorsCard product={card.product} value={card.value} graph={card.graph} width={card.width} border={card.border} bgColor={card.color} />

                </div>
              ))
            }
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-4 items-center px-4 rounded-lg bg-[rgb(49,50,51)] py-3">
          <CreatorsListbox options={people} initialValue={people[0]} />
          <CreatorsListbox
            options={ProductType}
            initialValue={ProductType[0]}
          />
          <CreatorsListbox options={Active} initialValue={Active[0]} />
        </div>

        <div className='w-full  gap-y-4 grid grid-cols-2 md:gap-5'>
          <div className='col-span-2 h-full sm:col-span-1 bg-[rgb(49,50,51)] rounded-lg'> {/* This item will span two columns (larger) on small screens */}
            <CreatorChart />
            
          </div>
          <div className='col-span-2 md:p-2  h-full sm:col-span-1 bg-[rgb(49,50,51)] rounded-lg'> {/* This item will span two columns (smaller) on small screens */}
            {/* <PieGraph /> */}
       <Doughnutt />
          </div>
        </div>
        <div className='w-full '>
          <Accordium title="All Products" >
            <ReusableTable headers={headers} data={data} />
          </Accordium>
          <Accordium title="All Sales">
            <ReusableTable headers={headersSales} data={dataSales} />
          </Accordium>
          <Accordium title="All Purchases">
            <ReusableTable headers={headerPurchase} data={dataPurchase} />
          </Accordium>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;

