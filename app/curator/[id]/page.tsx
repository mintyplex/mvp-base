"use client";

import React, { useState } from 'react'
import topCreator from "~/public/top-creator.jpeg";
import Image, { StaticImageData } from "next/image";
import { Card } from '~/app/page'
import { Button } from '~/components/ui/button';
import curatorImage from '~/public/curator-bg.png'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { TbSettings } from "react-icons/tb";
import { TypographyH3 } from '~/utils/typography';

export default function Curator() {

    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <section className="container p-3 mx-auto space-y-10 mt-6">
                <div className="w-full relative">
                    <div className='flex w-full rounded-[24px] relative overflow-hidden'>
                        <Image
                            height={600}
                            draggable={false}
                            alt="Curator bg"
                            src={curatorImage}
                            objectFit='contain'
                            objectPosition='center'
                        />
                        <div className="absolute bottom-0 right-0 mr-6 mb-6">
                            <div className='rounded-full bg-mintyplex-dark p-3'>
                                <FaXTwitter />
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-[80%] right-0'>
                        <div className="flex gap-2 justify-center items-center p-[8px] w-[125px] rounded-[8px] border border-[#313233]">
                            <TbSettings size={24} />
                            <p>Edit Bio</p>
                        </div>
                    </div>
                    <div className="relative mt-[-80px] z-[1] flex justify-center w-full">
                        <div className='flex flex-col gap-4 items-center'>
                            <Image
                                width={150}
                                height={150}
                                className="rounded-full border-[9px] border-mintyplex-dark"
                                draggable={false}
                                alt="user image"
                                src={topCreator}
                            />
                            <TypographyH3>0AHY21....342</TypographyH3>
                        </div>
                    </div>
                </div>
                <div className='w-full grid place-items-center'>
                    <p className='max-w-[1000px] text-center font-[300]'>The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation.</p>
                </div>
                {/* <div className="flex gap-6">
                    <div className="w-[300px] flex flex-col gap-4">
                        <div onClick={() => { showFilter ? setShowFilter(false) : setShowFilter(true); }} className="w-full cursor-pointer bg-primary flex items-center p-4 rounded-[8px] justify-between" >
                            <p></p>
                            {showFilter ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {showFilter && (
                            <>
                                <div className="w-full bg-brand11 flex items-center p-4 rounded-[8px] justify-between">
                                    <p>Attributes</p>
                                    <FaChevronDown />
                                </div>
                                <div className="w-full bg-brand11 flex items-center p-4 rounded-[8px] justify-between">
                                    <p>Search by ID</p>
                                    <FaChevronDown />
                                </div>
                            </>
                        )}
                    </div>
                </div> */}
                <div className="space-y-6">
                    <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                        {Array.from({ length: 18 }).map((_, index) => (
                            <Card
                                byImg={topCreator}
                                name="Yatch Ape Club"
                                by="0x20..8"
                                image={topCreator}
                                price="23"
                                key={index}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Button
                            className="mx-auto text-white border rounded-full linear-gradient"
                            variant="ghost"
                        >
                            View All
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
