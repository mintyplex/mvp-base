"use client";

import { useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { useAccount } from "~/components/context/AccountContext";
import { useCart } from "~/components/context/CartContext";
import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import useBuyFunction from "~/hooks/useBuyFunction";
import useFetchUserData from "~/hooks/useFetchData";
import {
  createPriceWithDiscount,
  mintyplexContractAddress,
  truncateString,
  truncateXionAddress,
} from "~/lib/utils/utils";
import img from "~/public/top-creator.jpeg";
import { TypographyH3, TypographyH4 } from "~/utils/typography";

export default function Cart() {
  const [activeTab, setActiveTab] = useState(0);
  const { accountData } = useAccount();
  const { cartItems, clearCart, totalPrice, updatePrice, updateQuantity } =
    useCart();
  const { client } = useAbstraxionSigningClient();
  const {
    loading,
    executeResult,
    buyProduct,
    blockExplorerUrl,
    errors,
    setProductID,
  } = useBuyFunction({
    accountData,
    seatContractAddress: mintyplexContractAddress,
    client,
  });

  useEffect(() => {
    setProductID(cartItems[0]?.ID);
  });

  const tabs = [
    {
      title: "Pay with wallet",
      content: "1",
    },
    {
      title: "Pay with card",
      content: "3",
    },
  ];

  return (
    <>
      <TooltipProvider>
        <section className="container p-3 mx-auto space-y-5">
          <div className="mt-6 space-y-8">
            <div className="flex items-center justify-between">
              <TypographyH3>My Cart</TypographyH3>
              <Link href="/popular-products">
                <Button className="px-6 w-fit active:scale-95 transition-all duration-300 bg-mintyplex-primary">
                  <span className="text-white">Continue Shopping</span>
                </Button>
              </Link>
            </div>
            <div className="flex flex-col justify-between w-full lg:flex-row gap-6">
              <div className="w-full space-y-4 rounded-[8px] bg-[#2C2D2E]">
                <div className="p-[24px] w-full space-y-4">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <CartCard
                        key={item.ID}
                        name={item?.Name}
                        by={truncateXionAddress(item?.UserId)}
                        price={item?.Price}
                        discount={item?.Discount}
                        quantity={item?.quantity}
                        itemId={item.ID}
                        image={item.CoverImage}
                        updateQuantity={updateQuantity}
                        updatePrice={updatePrice}
                      />
                    ))
                  ) : (
                    <div className=" w-full flex items-center justify-center min-h-[10vh]">
                      <p>Your cart is empty</p>
                    </div>
                  )}
                  {cartItems?.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-[#f8fafc] hover:text-white px-4 py-2 rounded-[8px] bg-mintyplex-dark hover:bg-mintyplex-primary "
                    >
                      Clear cart
                    </button>
                  )}
                </div>
                <div className="border-t border-[#757575] mt-3 p-[24px] flex-col flex gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] font-[500]">Total value</p>
                    <p className="text-[20px] font-[500]">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="sticky top-5 flex flex-col gap-4 bg-[#313233] rounded-[8px] h-fit p-[24px] lg:w-[520px] md:w-full w-full">
                <TypographyH3 className="text-[30px] font-[600]">
                  Pay with
                </TypographyH3>
                <div className="flex items-center w-full gap-2">
                  {tabs.map((tab, index) => (
                    <div key={index} className="relative w-[100%]">
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`py-[10px] px-[14px] w-full text-center font-[500] text-[14px] rounded-[10px] hover:bg-mintyplex-primary  ${
                          activeTab === index
                            ? "bg-mintyplex-primary"
                            : "bg-mintyplex-dark"
                        }`}
                      >
                        {tab.title}
                      </button>
                      {tab.title === "Pay with card" && (
                        <div className="absolute top-[-26%] left-[6%] !bg-[#313233] px-2 rounded-[5px] text-[10px] font-semibold">
                          <p className="text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                            Coming soon
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {activeTab === 0 && (
                  <div className="flex flex-col w-full mt-4 gap-2">
                    <div className="flex flex-col w-full gap-4">
                      <div className="form">
                        <input
                          type="text"
                          className="px-4 py-6 border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                          placeholder="0xERDS34....DE21"
                          required
                          defaultValue={accountData as string}
                        />
                        <label htmlFor="" className="px-4 text-sm">
                          Wallet address <span className="text-red-600">*</span>
                        </label>
                      </div>
                      <div className="form">
                        <input
                          type="text"
                          className="px-4 py-6 border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                          placeholder="Sadistar@gmail.com"
                          required
                        />
                        <label htmlFor="" className="px-4 text-sm">
                          Email address <span className="text-red-600">*</span>
                        </label>
                      </div>
                    </div>
                    <Button
                      className="w-full px-6 py-6 active:scale-95 transition-all duration-300 bg-mintyplex-primary"
                      // onClick={() => {
                      //   accountData ? void buyProduct() : alert("Please login");
                      // }}
                    >
                      <span className="text-white">
                        {loading ? "Processing" : "Pay Now"}
                      </span>
                    </Button>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="flex flex-col w-full mt-4 gap-2 w-full">
                    <div className="flex flex-col items-center gap-2 w-full my-[16px]">
                      <BsExclamationCircle size={25} />
                      <p className="italic">Coming soon!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </TooltipProvider>
    </>
  );
}

function CartCard({
  name,
  quantity,
  price,
  discount,
  by,
  itemId,
  image,
  updateQuantity,
  updatePrice,
}: any) {
  const [number, setNumber] = useState(quantity);

  const { removeFromCart } = useCart();

  const handleIncrement = () => {
    setNumber((prevNumber: any) => {
      const newQuantity = prevNumber + 1;
      updateQuantity(itemId, newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setNumber((prevNumber: any) => {
      if (prevNumber > 1) {
        const newQuantity = prevNumber - 1;
        updateQuantity(itemId, newQuantity);
        return newQuantity;
      }
      return prevNumber; // Prevent decrementing below 1
    });
  };
  const updatedPrice = price * number;

  return (
    <>
      <div className="hidden md:flex bg-mintyplex-dark p-[24px] rounded-[7px] justify-between w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-top gap-[16px]">
            <Image
              src={image}
              alt=""
              width={125}
              height={125}
              className="h-[125px] object-cover rounded-[8px]"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[20px] font-[500] font-[600]">
                  {truncateString(name, 20)}
                </p>
                <p className="text-[16px] font-[400]">{by}</p>
                {/* <p className="text-[14px] font-[400]">Membership: Monthly</p> */}
              </div>
            </div>
          </div>
          <div
            onClick={() => removeFromCart(itemId)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <HiTrash size={25} />
            <p className="text-primary">Remove</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-1">
            <TypographyH4 className="text-transparent !bg-clip-text text-[26px] font-[700] [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              ${createPriceWithDiscount(updatedPrice, discount)}
            </TypographyH4>
            <div className="font-semibold">
              <s>${updatedPrice}</s>
            </div>
          </div>
          <div className="flex gap-[10px] items-center">
            <button
              className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-[10px] hover:bg-primary"
              onClick={handleDecrement}
            >
              -
            </button>
            <div className="text-[20px] font-[500] flex items-center justify-center w-[20px] font-[600]">
              {number}
            </div>
            <button
              className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-[10px] hover:bg-primary"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full">
        <div className="flex justify-between">
          <div className="flex items-top gap-[8px]">
            <Image
              src={img}
              alt=""
              width={79}
              height={79}
              className="object-cover rounded-[8px]"
            />
            <div className="">
              <p className="text-[16px] font-[500] font-[600]">{name}</p>
              <p className="text-[14px] font-[400]">{by}</p>
              <p className="text-[12px] font-[400]">{quantity}</p>
            </div>
          </div>
          <div className="flex flex-col items-right justify-between">
            <div className="flex items-center gap-1">
              <TypographyH4 className="text-transparent !bg-clip-text text-[16px] font-[700] [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                ${createPriceWithDiscount(updatedPrice, discount)}
              </TypographyH4>
              <div className="font-medium">
                <s>${updatedPrice}</s>
              </div>
            </div>
            <HiTrash size={20} />
          </div>
        </div>
      </div>
    </>
  );
}
