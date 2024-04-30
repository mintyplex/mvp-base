"use client";
import { createContext, useContext } from "react";

import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import axios from "axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingModal from "../ui/LoadingModal";

// I don't know how to properly get the type for client so I'll just pass in any for the type being
type AccountProviderProps = {
  toggleSidebar: () => void;
  client: any | null;
  accountData: string | null;
  isLoggedIn: boolean;
  isSidebarOpen: boolean;
  account: any;
  setShowAbstraxion: (value: boolean) => void;
  closeSidebar: () => void;
  isError: any | null;
  loading: any | null;
  setIsError: any | null;
  setLoading: any | null;
  userAvatar: any | null;
} | null;

// Create a context with an initial empty value
const AccountContext = createContext<AccountProviderProps>(null);

export function useAccount() {
  const account = useContext(AccountContext);

  if (account === null) {
    throw new Error("useAccount must be used within an AccountProvider");
  }

  return account;
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setShowAbstraxion] = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountData, setAccountData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  // XION
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  // console.log(account, client)
  // const apiUrl = process.env.NEXT_BASE_URL;

  // if (isLoggedIn) {
  //   router.push("/");
  // }

  const profile = account?.bech32Address;

  useEffect(() => {
    setIsLoggedIn(!!profile);
    setAccountData(profile);
  }, [profile, router]);

  const fetchData = async () => {
    setTimeout( async () => {
      try {
        const response = await axios.get(
          `https://mintyplex-api.onrender.com/api/v1/user/avatar/${accountData}`
        );
        setUserData(response.data);
      } catch (err:any) {
        setError(err);
        console.log(error);
      }
    }, 15000);
  };
  useEffect(() => {
    fetchData();
  }, [accountData]);

  const userAvatar = `https://mintyplex-api.onrender.com/api/v1/user/avatar/${accountData}`;

  const contextValue: AccountProviderProps = {
    toggleSidebar,
    client,
    accountData,
    isLoggedIn,
    isSidebarOpen,
    account,
    setShowAbstraxion,
    closeSidebar,
    isError,
    setIsError,
    loading,
    setLoading,
    userAvatar,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}
