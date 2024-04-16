"use client";

import { useParams } from "next/navigation";
import React from "react";
import Home from "~/app/page";
import AddProduct from "./add-product/page";
import DashboardLayout from "~/components/dashboardlayout/page";
import CreatorDashboard from "~/components/creatordashboard/page";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";
import useFetchUserData from "~/hooks/useFetchData";

export default function Dashboard() {

  const { accountData, isLoggedIn } = useAccount();
  const { isLoading } = useFetchUserData({
    isLoggedIn,
    accountData,
    retries: 1,
  });

  return (
    <>
      <DashboardLayout>
        <CreatorDashboard />
      </DashboardLayout>
    </>
  );
}
