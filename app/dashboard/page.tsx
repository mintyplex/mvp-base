"use client";

import { useParams } from "next/navigation";
import React from "react";
import Home from "~/app/page";
import AddProduct from "./add-product/page";
import DashboardLayout from "~/components/dashboardlayout/page";
import CreatorDashboard from "~/components/creatordashboard/page";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";

export default function Dashboard() {

  const { accountData, userData, isLoading, isError } = useAccount();


  return (
    <>
          {isLoading && <LoadingModal isOpen={isLoading} />}

      <DashboardLayout>
        <CreatorDashboard />
      </DashboardLayout>
    </>
  );
}
