"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  wallet_address: string;
  avatar: string;
  bio: string;
  created_at: number;
  email: string;
  id: string;
  updated_at: number;
  x_link: string;
}

interface UserData {
  user?: UserProfile;
  status?: number;
  error?: boolean; // Assuming the API response includes a status code inside the data
}

interface UseFetchUserDataProps {
  isLoggedIn: boolean;
  accountData: string | null;
  retries?: number;
  setLoadingModal: (value: boolean) => void;
}

const useFetchUserData = ({
  isLoggedIn,
  accountData,
  setLoadingModal,
  retries = 0,
}: UseFetchUserDataProps) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserData = async (): Promise<UserData> => {
    const response = await fetch(`${API_URL}/user/profile/${accountData}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const [hasError, setHasError] = useState(false);

  const { data, status, isLoading } = useQuery<UserData, Error>(
    ["userData"],
    fetchUserData,
    {
      refetchOnWindowFocus: true,
      enabled: isLoggedIn && !!accountData,
      retry: retries,
      onSuccess: (data) => {
        if (data?.user) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        }
        if (data?.error === true) {
          setHasError(true);
        }
      },
      onError: (error) => {
        // console.error("Error fetching user data:", error);
      },
    }
  );

  useEffect(() => {
    if (hasError) {
      // router.push("/profile-update");
      setLoadingModal(true);
    }
  }, [router, hasError, setLoadingModal]);

  return { userData: data?.user, status, isLoading, hasError };
};

export default useFetchUserData;
