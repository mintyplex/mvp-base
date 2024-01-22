"use client";

import Image from 'next/image'
import React from 'react'
import curator from '~/public/curator.png'
import { HomeIcon, UserIcon, CreditCardIcon, } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RxDashboard } from 'react-icons/rx'
import { FaFacebookF } from "react-icons/fa6";
import { PiWallet } from 'react-icons/pi'
import { GoHomeFill } from 'react-icons/go'
import { HiLogout, HiUserCircle } from 'react-icons/hi'
import { BsArrowUpRight, BsChevronDown } from 'react-icons/bs'
import { usePathname } from 'next/navigation'
import TwitterIcon from '../ui/TwitterIcon';
import TelegramIcon from '../ui/TelegramIcon';
import { Button } from '../ui/button';

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
]

const MobileSidebar = ({ closeSidebar }: any) => {

    const pathname = usePathname()

    return (
        <main className='p-6 flex lg:hidden flex-col gap-6 bg-brand10 sticky top-0 h-screen'>
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
            <div className='h-screen flex flex-col w-full gap-12 '>
                <div className="flex gap-2 flex-col">
                    {SidebarData.map((data, i) => (
                        <div key={i}>
                            <Link href={data.link} onClick={closeSidebar}>
                                <div className={`text-center cursor-pointer w-full flex items-center gap-4 py-2 px-4 transition-colors rounded-[8px] hover:bg-brand1 ${pathname === data.id ? "bg-brand1" : " "}`}>
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
    )
}

export default MobileSidebar