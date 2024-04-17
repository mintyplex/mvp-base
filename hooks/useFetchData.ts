"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
}

const useFetchUserData = ({
  isLoggedIn,
  accountData,
  retries = 0,
}: UseFetchUserDataProps) => {
  const router = useRouter();
  const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

  const fetchUserData = async (): Promise<UserData> => {
    const response = await fetch(`${apiUrl}/profile/${accountData}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const { data, status, isLoading } = useQuery<UserData, Error>(
    ["userData"],
    fetchUserData,
    {
      enabled: isLoggedIn && !!accountData,
      retry: retries,
      onSuccess: (data) => {
        // No state updates or router pushes here
      },
      onError: (error) => {
        console.error("Error fetching user data:", error);
      },
    }
  );

  useEffect(() => {
    if (status === "success" && data) {
      if (data.error === false) {
        // router.push("/dashboard");
      } else {
        router.push("/profile-update");
      }
    }
  }, [data, router, status]);

  return { userData: data?.user, status, isLoading };
};

export default useFetchUserData;