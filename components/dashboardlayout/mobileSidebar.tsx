"use client";

import Image from "next/image";
import React, { useContext } from "react";
import curator from "~/public/curator.png";
import { HomeIcon, UserIcon, CreditCardIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxDashboard } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa6";
import { PiWallet } from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { HiLogout, HiUserCircle } from "react-icons/hi";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";
import TwitterIcon from "../ui/TwitterIcon";
import TelegramIcon from "../ui/TelegramIcon";
import { Button } from "../ui/button";
import WalletIcon from "../ui/Wallet";
import AccountContext from "../context/AccountContext";
import { truncate } from "~/utils/truncate";

export const SidebarData = [
  {
    title: "Discover",
    link: "/",
    id: "discover",
  },
  {
    title: "Create",
    link: "/dashboard/add-product",
    id: "add-product",
  },
  {
    title: "Dashboard",
    link: "/dashboard",
    id: "dashboard",
  },
  {
    title: "Profile",
    link: "/creator/321",
    id: "profile",
  },
  {
    title: "Request Feature",
    link: "",
    id: "",
  },
];

const MobileSidebar = ({ closeSidebar, isLoggedIn, setShowAbstraxion }: { closeSidebar: () => void; isLoggedIn: boolean; setShowAbstraxion: any; }) => {
  const pathname = usePathname();

  const accountData = useContext(AccountContext)

  const filteredSidebarData = SidebarData.filter((data) => {
    if (!isLoggedIn) {
      return (
        data.id !== "dashboard" &&
        data.id !== "profile" &&
        data.id !== "add-product"
      );
    }
    return true;
  });

  return (
    <main className="px-6 block lg:hidden bg-brand10 fixed w-full top-14 h-fit">
      <div className="border-[1px] border-mintyplex-border rounded-[12px] p-4 flex lg:hidden flex-col items-start gap-6">
        {isLoggedIn && (
          <>
            <div className="flex flex-col items-left justify-left gap-4 w-full">
              <Image
                src={curator}
                width={100}
                height={100}
                alt="curator image"
                className="rounded-full border-[8px] border-mintyplex-dark"
              />
              <div className="w-fit">
                <p className="text-[28px] font-bold capitalize">{truncate(accountData)}</p>
                <p className="text-[16px] !underline text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Alpha Version
                </p>
              </div>
            </div>
            <Button className="bg-mintyplex-primary text-white flex justify-between items-center px-4 w-full py-6 rounded-[8px] font-semibold text-[16px]">
              <p>Reserve Username</p>
              <BsArrowUpRight />
            </Button>
          </>
        )}
        <div className="flex flex-col w-full gap-12 ">
          <div className="flex gap-2 flex-col">
            {filteredSidebarData.map((data, i) => (
              <div key={i}>
                <Link href={data.link} onClick={closeSidebar}>
                  <div
                    className={`border-b text-center cursor-pointer w-full flex items-center gap-4 py-2 transition-color hover:bg-mintyplex-primary ${pathname === data.link ? "text-mintyplex-primary" : " "}`}
                  >
                    <p>{data.title}</p>
                  </div>
                </Link>
              </div>
            ))}
            {!isLoggedIn ? (
              <div onClick={() => { setShowAbstraxion(true); closeSidebar(); }} className={`mt-4 bg-mintyples-primary rounded-[8px] text-center cursor-pointer w-full flex items-center gap-1 py-4 px-4 items-center justify-center transition-color hover:bg-mintyplex-primary`}>
                <p>Login</p>
                <WalletIcon />
              </div>
            ) : (
              <div onClick={closeSidebar} className={`mt-4 bg-[#FF0000] rounded-[8px] text-center cursor-pointer w-full flex items-center gap-1 py-4 px-4 items-center justify-center transition-color hover:bg-dark`}>
                <p>Log Out</p>
                <WalletIcon />
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-full pb-4 gap-3 border-mintyplex-border">
              <h2>Let&apos;s Connect</h2>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default MobileSidebar;
