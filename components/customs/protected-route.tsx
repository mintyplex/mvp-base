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
  const { isLoading, userData } = useFetchUserData({
    isLoggedIn,
    accountData,
    retries: 0,
  });

  // const isUserDataInLocalStorage = () => {
  //   const userDataa = localStorage.getItem("user");
  //   return !!userDataa;
  // };

  // useEffect(() => {
  //   const userDataExists = isUserDataInLocalStorage();

  //   if (!userData) {
  //     console.log("User data not found");
  //     // Example: Redirect to a login page
  //     router.push("/profile-update");
  //   } else {
  //     console.log("User data found in localStorage");
  //   }
  // }, [router]);

  useEffect(() => {
    if (userData) {
      if (userData) {
        // router.push("/dashboard");
        // window.location.href = window.location.href;
        // console.log(data);
      }
    } else {
      router.push("/profile-update");
    }
  }, [router, userData, isLoggedIn]);

  return children;
};

export default ProtectedRoute;
