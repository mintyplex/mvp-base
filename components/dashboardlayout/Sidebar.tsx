"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import { FaChartLine, FaGifts } from "react-icons/fa";
import { HiLogout, HiUserCircle } from "react-icons/hi";
import { PiWallet } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Button } from "../ui/button";
import curator from "~/public/curator.png";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <RxDashboard size={20} />,
    link: "/dashboard",
    id: "dashboard",
  },
  {
    title: "Profile",
    icon: <HiUserCircle size={20} />,
    link: "/profile",
    id: "profile",
  },
];

const Sidebar = () => {

  const { id } = useParams();

  return (
    <main className="sticky w-[240px] top-0 flex-col hidden h-screen p-6 lg:flex gap-6 bg-[#2C2D2E]">
      <div className="flex flex-col items-center justify-center mx-auto gap-4">
        <Image
          src={curator}
          width={120}
          height={120}
          alt="curator image"
          className="rounded-full border-[8px] border-mintyplex-dark"
        />
        <div className="text-center">
          <p className="text-[25px] font-bold capitalize">0x569...32</p>
          <p className="text-[16px] underline">Alpha Version</p>
        </div>
      </div>
      <Button className="bg-mintyplex-primary text-white flex justify-between items-center px-4 w-full py-6 rounded-[8px] font-semibold text-[16px]">
        <p>Reserve Username</p>
        <BsArrowUpRight />
      </Button>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-2">
          {SidebarData.map((data, i) => (
            <div key={i}>
              <Link href={data.link}>
                <div
                  className={`text-center cursor-pointer w-full flex items-center gap-4 py-2 px-4 transition-colors rounded-[8px] hover:bg-brand1 ${id === data.id ? "bg-brand1" : ""
                    }`}
                >
                  {data.icon}
                  <div>
                    <p>{data.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <div
            className={`text-center cursor-pointer w-full flex items-center gap-4 py-3 px-5 transition-colors rounded-[8px] hover:bg-brand1`}
          >
            <HiLogout />
            <div>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;

