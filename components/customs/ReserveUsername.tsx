"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from "../ui/use-toast";
import { TypographyH3 } from "../../utils/typography";
import { Input } from "../ui/input";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";


type ReserveUsernameProps = {
    setEditModal?: any;
    response?: any;
};

export default function ReserveUsername({ response }: ReserveUsernameProps) {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const tweetText = "Just secured a unique @Mintyplex username! 🚀 The top 100 to join before launch will receive exclusive value-added benefits for free. 🎁 Reserve your own username now: https://www.mintyplex.com";
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;



    const onSubmit = async (data) => {

        try {
            setLoading(true)

            const updatedData = {
                ...data,
                username: `${data.username}.mtpx`
            };

            await axios.post('/api/waitlist', updatedData);
            reset();
            // when submit is true
            console.log(updatedData, 'Successful');
            const message = `Your username ${updatedData.username} has been reserved!`
            // onOpen(true)
        } catch (error) {
            setLoading(false);
            const errorMessage = error?.response?.data?.message;
            toast({
                title: 'Waitlist Failed',
                description: errorMessage,
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full my-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <AiOutlineMail size={25} />
                <Input placeholder="Email address" {...register('email')} />
            </div>
            <div className="flex items-center gap-4">
                <AiOutlineUser size={25} />
                <div className="flex gap-2 w-full">
                    <Input placeholder="Username" {...register('username')} />
                    <div className="grid place-items-center text-[12px] rounded-[5px] px-2 py-1 bg-mintyplex-dark">
                        <span>.mtpx</span>
                    </div>
                </div>
            </div>
            <Button className="!bg-mintyplex-primary text-white" type='submit'>
                {
                    loading ? (
                        <FaSpinner />
                    ) : (
                        <h3>Reserve Now</h3>
                    )
                }
            </Button>
        </form>
    );
}


