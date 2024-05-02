"use client";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "~/lib/queryClient";

interface CuratorProfile {
  wallet_address: string;
  avatar: string;
  bio: string;
  created_at: number;
  email: string;
  id: string;
  updated_at: number;
  x_link: string;
}

interface CuratorData {
  user?: CuratorProfile;
  status?: number;
  error?: boolean; // Assuming the API response includes a status code inside the data
}

interface UseFetchCuratorDataProps {
  creatorAddress: string | null;
  retries?: number;
}

const useFetchCuratorData = ({
  creatorAddress,
  retries = 1,
}: UseFetchCuratorDataProps) => {
  const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

  const fetchCuratorData = async (): Promise<CuratorData> => {
    const response = await fetch(`${apiUrl}/profile/${creatorAddress}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const { data, status, isLoading, isError, refetch } = useQuery<
    CuratorData,
    Error
  >(["CuratorData"], fetchCuratorData, {
    enabled: !!creatorAddress,
    retry: retries,
    onSuccess: (data) => {
      if (data?.user) {
        localStorage.setItem("curator", JSON.stringify(data.user));
      }
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });

  return { CuratorData: data?.user, status, isLoading, refetch, isError };
};

export default useFetchCuratorData;
