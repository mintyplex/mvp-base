"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";

export const useFetchData = () => {
  const router = useRouter();
  const {
    isLoggedIn,
    accountData,
    setUserData,
    loading,
    setLoading,
    isError,
    setIsError,
  } = useAccount();

  useEffect(() => {
    const fetchUserData = async () => {
      const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

      if (isLoggedIn && accountData) {
        // router.push("/profile-update");
        // setLoading(true);
        setIsError(false);

        try {
          const response = await fetch(`${apiUrl}/profile/${accountData}`, {
            method: "GET", // or 'POST'
            headers: {
              "Content-Type": "application/json",
              // Include other headers as needed
            },
            // Include body if method is 'POST'
          });
          const data = await response.json();

          if (response.status == 200) {
            setUserData(data.user); // Update global state
            // router.push("/dashboard");
          } else {
            setIsError(true);
            router.push("/profile-update");
          }
        } catch (error) {
          setIsError(true);
          console.error("Failed to fetch user data:", error);
          router.push("/profile-update");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, accountData, router, setUserData, setIsError, setLoading]);

  return { loading, isError };
};