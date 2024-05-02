"use client";

import { useParams } from "next/navigation";
import React from "react";
import DashboardLayout from "~/components/dashboardlayout/page";
import Profile from "~/components/creatordashboard/profile";

export default function ProfilePage() {
  return (
    <>
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    </>
  );
}
