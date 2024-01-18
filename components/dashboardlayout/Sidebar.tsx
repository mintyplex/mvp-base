"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import { HiLogout, HiUserCircle } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { Button } from "../ui/button";
import curator from "~/public/curator.png";
import { FaFacebookF } from "react-icons/fa6";
import TwitterIcon from "../ui/TwitterIcon";
import TelegramIcon from "../ui/TelegramIcon";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GoHomeFill size={25} />,
    link: "/dashboard",
    id: "dashboard",
  },
  {
    title: "Profile",
    icon: <HiUserCircle size={25} />,
    link: "/profile",
    id: "profile",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <main className="sticky w-[240px] top-0 flex-col hidden h-screen p-6 lg:flex gap-6 bg-[#2C2D2E]">
      {pathname}
      {SidebarData[0].link}
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
          <p className="text-[16px] !underline text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Alpha Version
          </p>
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
                  className={`text-center cursor-pointer w-full flex items-center gap-4 py-2 px-4 transition-colors rounded-[8px] hover:bg-mintyplex-primary ${
                    pathname === data.link ? "bg-mintyplex-primary" : ""
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
          <div className="flex flex-col items-center justify-center w-full pb-4 border-b gap-3 border-mintyplex-border">
            <h2>Request a Feature</h2>
            <div className="flex items-center gap-3">
              <div className="p-2 border rounded-full transition-all duration-300 hover:bg-mintyplex-primary border-mintyplex-border/50">
                <TwitterIcon />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <FaFacebookF />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <TelegramIcon />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center w-full py-3 text-center cursor-pointer gap-4 transition-colors rounded-[8px] hover:bg-brand1`}
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
