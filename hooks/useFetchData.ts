"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  // Assuming the API response includes a status code inside the data
}

interface UseFetchUserDataProps {
  isLoggedIn: boolean;
  accountData: string | null;
  retries?: number;
}

const useFetchUserData = ({
  isLoggedIn,
  accountData,
  retries=0,
}: UseFetchUserDataProps) => {
  const router = useRouter();
  const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

  const fetchUserData = async (): Promise<UserData> => {
    const response = await fetch(`${apiUrl}/profile/${accountData}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const { data, status,isLoading } = useQuery<UserData, Error>(
    ["userData"],
    fetchUserData,
    {
      enabled: isLoggedIn && !!accountData,
      retry: retries,
      onSuccess: (data) => {
        if (data?.status === 200) {
          router.push("/dashboard");
        } else {
          router.push("/profile-update");
        }
      },
      onError: (error) => {
        console.error("Error fetching user data:", error);
        router.push("/profile-update");
      },
    }
  );

  // This state and effect are placeholders. Adapt according to your state management strategy.
  const [userData, setUserData] = useState<UserProfile | undefined>();
  if (status === "success" && data) {
    setUserData(data?.user);
    // storeUserData(data);
  }

  return { userData, status,isLoading };
};

export default useFetchUserData;
