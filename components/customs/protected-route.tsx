"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";
import useFetchUserData from "~/hooks/useFetchData";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { accountData, isLoggedIn } = useAccount();
  const { isLoading, hasError } = useFetchUserData({
    isLoggedIn,
    accountData,
    retries: 0,
  });


  return (
    <>
      <LoadingModal isOpen={isLoading} />
      {children}
    </>
  );
};

export default ProtectedRoute;
