"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import ReuseableBackground from "~/components/ui/ReuseableBackground";
import ProductForm from "~/components/ui/ProductForm";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import DashboardLayout from "~/components/dashboardlayout/page";
import BackButton from "~/app/popular-products/_components/back-button";
import { ArrowLeftIcon } from "lucide-react";

const AddProduct: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mt-10">
        <BackButton
          variant="ghost"
          size="icon"
          className="!border bg-!none border-input mb-6"
        >
          <ArrowLeftIcon />
        </BackButton>

        <div className="flex items-center justify-between">
          <h2 className="md:text-[36px] text-[24px] leading-[46px] font-semibold">
            Add Product
          </h2>
        </div>

        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
