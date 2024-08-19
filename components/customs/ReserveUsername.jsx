"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { TypographyH3 } from "../../utils/typography";
import { Input } from "../ui/input";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

// type ReserveUsernameProps = {
//     setEditModal?: any;
//     response?: any;
// };

export default function ReserveUsername() {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const tweetText =
    "Just secured a unique @Mintyplex username! 🚀 The top 100 to join before launch will receive exclusive value-added benefits for free. 🎁 Reserve your own username now: https://www.mintyplex.com";
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function onSubmit(data) {
    // Check if email and username are not empty
    if (!data.email || !data.username) {
      toast({
        title: "Submission Failed",
        description: "Email and username are required.",
      });
      return;
    }
    try {
      setLoading(true);

      const updatedData = {
        ...data,
        username: `${data.username}.mtpx`,
      };

      const res = await fetch(`${API_URL}/reserve/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedData }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const responseData = await response.json();

      reset(); // Reset the form state

      const message = `Your username ${responseData?.username || updatedData.username} has been reserved!`;
      // Call your method to show the success message, e.g., onOpen(true), or another toast
      toast({
        title: "Success",
        description: message,
        status: "success", // Assuming your toast system supports status or type of messages
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      // Display an error message
      toast({
        title: "Waitlist Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full my-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <AiOutlineMail size={25} />
        <Input
          type="email"
          placeholder="Email address"
          {...register("email")}
        />
      </div>
      <div className="flex items-center gap-4">
        <AiOutlineUser size={25} />
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Enter a unique username"
            {...register("username")}
          />
          <div className="grid place-items-center text-[12px] rounded-[5px] px-2 py-1 bg-mintyplex-dark">
            <span className="text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              .mtpx
            </span>
          </div>
        </div>
      </div>
      <Button className="!bg-mintyplex-primary text-white" type="submit">
        {loading ? <FaSpinner /> : <h3>Reserve Now</h3>}
      </Button>
    </form>
  );
}
