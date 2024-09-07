"use client";

import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import Accordium from "~/components/ui/Accordium";
import ReusableTable from "~/components/ui/Reuseable-table";
import {
  data,
  dataPurchase,
  headerPurchase,
  headers,
} from "~/utils/constants/table-data";

import CreatorChart from "../ui/graph/Creator-line-chart";
import CreatorEmptyState from "../ui/CreatorEmptyState";
import { useAccount } from "../context/AccountContext";

// import CreatorLineChart from '~/components/ui/graph/creator-line-chart';

const CreatorDashboard = () => {
  const { userData, userBalance } = useAccount();
  const balance = (userBalance as { displayValue?: string })?.displayValue || "0";
  const userProducts = userData?.products;

  return (
    <div className="w-full pb-4">
      <div className="flex flex-col w-full gap-8">
        <div className="w-full mt-10">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col gap-1">
              <h2 className="md:text-[39px] text-[28px] leading-[46px] font-semibold">
                My Dashboard
              </h2>
              <p className="text-[18px] md:text-[24px] font-light ">
                Since you started selling on Mintyplex, {"here's "} a summary of
                your activities
              </p>
            </div>
            <div className="w-fit !min-w-[140px] md:mt-0">
              <Link href="/dashboard/add-product">
                <button className="bg-[rgba(30,91,221,1)] block px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-brand2">
                  Add Product
                </button>
              </Link>
            </div>
          </div>
          <div className="flex overflow-x-auto justify-between my-10 gap-[16px] w-full md:w-fit">
            <div className="border-white border-[1px] rounded-md shadow-lg px-[20px] py-[20px] bg-[#313233]">
              <div className="flex items-top gap-6">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_5421_7892)">
                        <path
                          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                          fill="#3E73C4"
                        />
                        <path
                          d="M15.0152 13.5932C15.0152 12.0002 14.0552 11.4542 12.1352 11.2262C10.7642 11.0439 10.4905 10.6802 10.4905 10.0427C10.4905 9.40519 10.948 8.99569 11.8615 8.99569C12.6842 8.99569 13.1417 9.26869 13.3697 9.95194C13.3935 10.018 13.4369 10.0752 13.4941 10.1158C13.5514 10.1565 13.6197 10.1786 13.6899 10.1792H14.4212C14.4634 10.1803 14.5055 10.1729 14.5447 10.1573C14.584 10.1417 14.6197 10.1182 14.6496 10.0884C14.6796 10.0586 14.7032 10.0231 14.7189 9.98386C14.7347 9.94467 14.7424 9.90268 14.7414 9.86044V9.81544C14.6521 9.32111 14.402 8.87014 14.03 8.53257C13.6579 8.19501 13.1849 7.98975 12.6842 7.94869V6.85669C12.6842 6.67444 12.547 6.53794 12.319 6.49219H11.6327C11.4505 6.49219 11.3132 6.62869 11.2674 6.85669V7.90369C9.8957 8.08519 9.02795 8.99569 9.02795 10.1342C9.02795 11.6357 9.94145 12.2274 11.8615 12.4554C13.1417 12.6827 13.5527 12.9564 13.5527 13.6847C13.5527 14.4122 12.913 14.9132 12.0445 14.9132C10.8557 14.9132 10.4447 14.4129 10.3074 13.7297C10.2624 13.5482 10.1244 13.4567 9.9872 13.4567H9.2102C9.16803 13.4557 9.12608 13.4632 9.08691 13.4788C9.04773 13.4945 9.01213 13.5179 8.98227 13.5477C8.9524 13.5775 8.92889 13.6131 8.91315 13.6522C8.89741 13.6913 8.88977 13.7333 8.8907 13.7754V13.8204C9.07295 14.9589 9.80495 15.7779 11.3132 16.0059V17.0987C11.3132 17.2802 11.4505 17.4174 11.6785 17.4624H12.3647C12.547 17.4624 12.6842 17.3259 12.73 17.0987V16.0052C14.1017 15.7779 15.0152 14.8217 15.0152 13.5924V13.5932Z"
                          fill="white"
                        />
                        <path
                          d="M9.66848 18.3727C6.10298 17.0977 4.27448 13.1377 5.60048 9.633C6.28598 7.7205 7.79423 6.26475 9.66848 5.5815C9.85148 5.49075 9.94223 5.35425 9.94223 5.12625V4.48875C9.94223 4.30725 9.85148 4.17075 9.66848 4.125C9.62273 4.125 9.53123 4.125 9.48548 4.17C8.4568 4.49124 7.50183 5.0128 6.67555 5.70463C5.84927 6.39646 5.168 7.24491 4.67097 8.20112C4.17394 9.15733 3.87096 10.2024 3.77949 11.2762C3.68802 12.35 3.80985 13.4312 4.13798 14.4578C4.95998 17.0078 6.92573 18.9653 9.48548 19.7843C9.66848 19.875 9.85148 19.7842 9.89648 19.602C9.94223 19.557 9.94223 19.5105 9.94223 19.4198V18.7822C9.94223 18.6457 9.80573 18.4642 9.66848 18.3727ZM14.5135 4.17075C14.3305 4.07925 14.1475 4.17075 14.1025 4.35225C14.0567 4.398 14.0567 4.44375 14.0567 4.5345V5.172C14.0567 5.35425 14.1932 5.53575 14.3305 5.62725C17.896 6.90225 19.7245 10.8623 18.3985 14.367C17.713 16.2795 16.2047 17.7353 14.3305 18.4185C14.1475 18.5093 14.0567 18.6458 14.0567 18.8738V19.5112C14.0567 19.6927 14.1475 19.8293 14.3305 19.875C14.3762 19.875 14.4677 19.875 14.5135 19.83C15.5422 19.5088 16.4971 18.9872 17.3234 18.2954C18.1497 17.6035 18.831 16.7551 19.328 15.7989C19.825 14.8427 20.128 13.7976 20.2195 12.7238C20.3109 11.65 20.1891 10.5688 19.861 9.54225C19.039 6.94725 17.0275 4.98975 14.5135 4.17075Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5421_7892">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <h1 className="text-[16px] leading-[20px] font-semibold">
                      USDC
                    </h1>
                  </div>

                  <div className="flex gap-[18px] mr-[20px]">
                    <h1 className="text-[32px] font-semibold">
                      ${parseFloat(balance).toFixed(2)}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <h1 className="text-[16px] leading-[20px] font-semibold">
                    Earnings
                  </h1>

                  <div
                    className={`flex items-center gap-3 border-[rgba(0,128,0,1)] border-[1px] rounded-lg  py-2 px-3  text-[rgba(0,128,0,1)]`}
                  >
                    <BsArrowUpRight size={20} />
                    <p className="font-[500]">0%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-white border-[0px] rounded-md shadow-lg px-[20px] py-[20px] min-w-[240px] bg-[rgba(0,204,153,1)]">
              <div className="flex flex-col text-black gap-4">
                <h1 className="text-[16px] leading-[20px] font-semibold">
                  All Products
                </h1>
                <h1 className="text-[32px] font-semibold">
                  {userProducts?.length}
                </h1>
              </div>
            </div>

            <div className="border-white border-[0px] rounded-md shadow-lg px-[20px] py-[20px] min-w-[240px] bg-[rgba(164,49,255)]">
              <div className="flex flex-col text-black gap-4">
                <h1 className="text-[16px] leading-[20px] font-semibold">
                  All Sales
                </h1>
                <h1 className="text-[32px] font-semibold">0</h1>
              </div>
            </div>

            <div className="border-white border-[0px] rounded-md shadow-lg px-[20px] py-[20px] min-w-[240px] bg-[rgba(255,115,174,1)]">
              <div className="flex flex-col text-black gap-4">
                <h1 className="text-[16px] leading-[20px] font-semibold">
                  Total Shoppers
                </h1>
                <h1 className="text-[32px] font-semibold">0</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid gap-y-4 gap-2">
          <div className=" h-full sm:col-span-1 bg-[rgb(49,50,51)] rounded-lg py-2">
            {/* This item will span two columns (larger) on small screens */}
            <h1 className="text-2xl fomt-medium border-b-2 py-4 px-6 border-[rgb(168,170,175)] ">
              Sales Overview
            </h1>

            <CreatorChart />

            <div className="flex items-center justify-center py-8 gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <div className="md:h-6 h-4 w-4 md:w-6 rounded-full bg-[rgba(35,89,204,1)]"></div>
                <button className="bg-[rgba(32,99,242,1)] p-2 md:px-4 rounded-md text-[13px] md:texxt-base font-medium">
                  Arts
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="md:h-6 h-4 w-4 md:w-6 rounded-full bg-[rgba(164,49,255,1)]"></div>
                <button className="border-[rgba(159,159,159,1)] border p-2 md:px-4 rounded-md text-[13px] md:texxt-base font-medium">
                  E-books
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="md:h-6 h-4 w-4 md:w-6 rounded-full bg-[rgba(4,4,42,1)]"></div>
                <button className="border-[rgba(159,159,159,1)] border p-2 md:px-4 rounded-md text-[13px] md:texxt-base font-medium">
                  Photography
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Accordium title="All Products">
            <ReusableTable headers={headers} data={data} />
          </Accordium>
          <Accordium title="All Sales">
            {/* <ReusableTable headers={headersSales} data={dataSales} /> */}
            <CreatorEmptyState />
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
