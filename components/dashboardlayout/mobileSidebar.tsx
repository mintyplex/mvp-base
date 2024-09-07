"use client";

import Image from "next/image";
import React, { useContext } from "react";
import curator from "~/public/curator.png";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FaFacebookF } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { BsArrowUpRight } from "react-icons/bs";
import { usePathname } from "next/navigation";
import TwitterIcon from "../ui/TwitterIcon";
import TelegramIcon from "../ui/TelegramIcon";
import { Button } from "../ui/button";
import WalletIcon from "../ui/Wallet";
import { truncate } from "~/utils/truncate";
import { useAccount } from "../context/AccountContext";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { useToast } from "../ui/use-toast";
import ReserveUsername from "../customs/ReserveUsername";
import {
  ConnectWallet,
  darkTheme,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import { client } from "~/app/client";
import { base } from "thirdweb/chains";

export const SidebarData = [
  {
    title: "Discover",
    link: "/",
    id: "discover",
  },
  {
    title: "Sell on Mintyplex",
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
    link: "/profile",
    id: "profile",
  },
  {
    title: "Request Feature",
    link: "https://discord.gg/2qeDehj4De",
    id: "https://discord.gg/2qeDehj4De",
  },
];

const MobileSidebar = ({
  closeSidebar,
  isLoggedIn,
}: {
  closeSidebar: () => void;
  isLoggedIn: boolean;
  setShowAbstraxion: any;
}) => {
  const pathname = usePathname();

  const { accountData, userAvatar } = useAccount();

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

  const { toast } = useToast();
  const disconnect = useDisconnect();
  const address = useAddress();

  // handle copy notification
  const handleCopy = (text: string | null) => {
    toast({
      description: "Address copied.",
    });
  };

  const links = [
    {
      Icon: TwitterIcon,
      href: "https://twitter.com/Mintyplex",
    },
    {
      Icon: FaFacebookF,
      href: "https://www.facebook.com/mintyplex",
    },
    {
      Icon: TelegramIcon,
      href: "https://t.me/mintyplex",
    },
  ];

  return (
    <main className="fixed block w-full px-6 lg:hidden bg-brand10 top-14 h-fit">
      <div className="border-[1px] border-mintyplex-border rounded-[12px] p-4 flex lg:hidden flex-col items-start gap-6">
        {isLoggedIn && (
          <>
            <div className="flex flex-col w-full items-left justify-left gap-4">
              <Image
                src={userAvatar}
                width={100}
                height={100}
                alt="curator image"
                className="rounded-full border-[8px] border-mintyplex-dark"
                style={{
                  height: "100px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="w-fit">
                <div className="flex items-center gap-2">
                  <p className="text-[28px] font-bold">
                    {truncate(accountData)}
                  </p>
                  <div
                    onClick={() =>
                      copyToClipboard(`${accountData}`, handleCopy)
                    }
                  >
                    <GoCopy />
                  </div>
                </div>
                <p className="text-[16px] !underline text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Testnet Version
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="!bg-mintyplex-primary text-white flex justify-between items-center px-4 w-full py-6 rounded-[8px] font-semibold text-[16px]">
                  <p>Reserve Username</p>
                  <BsArrowUpRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[300px]">
                <ReserveUsername />
              </DialogContent>
            </Dialog>
          </>
        )}
        <div className="flex flex-col w-full gap-12">
          <div className="flex flex-col gap-2">
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
              <ConnectWallet
              btnTitle="Login"
              modalSize="compact"
              modalTitle="Connect to Mintyplex"
            />
            ) : (
              <div
                onClick={() => {
                  closeSidebar();
                  disconnect();
                }}
                className={`mt-4 bg-[#FF0000] rounded-[8px] text-center cursor-pointer w-full flex gap-1 py-4 px-4 items-center justify-center transition-color hover:bg-dark`}
              >
                <p>Log Out</p>
                <WalletIcon />
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-full pb-4 gap-3 border-mintyplex-border">
              <h2>Let&apos;s Connect</h2>
              <div className="flex items-center gap-3">
                {links.map((link, index) => (
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={link.href}
                    key={index}
                    className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary"
                  >
                    <link.Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MobileSidebar;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9253 21.9253L28.0003 28.0003"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
