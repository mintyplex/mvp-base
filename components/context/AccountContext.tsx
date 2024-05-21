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
import useFetchUserData from "~/hooks/useFetchData";

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
  userData: any | null;
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

  // const [userData, setUserData] = useState(null);

  // XION
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  // console.log(account, client)
  // const apiUrl = process.env.NEXT_BASE_URL;

  
  const profile = account?.bech32Address;
  
  useEffect(() => {
    setIsLoggedIn(!!profile);
    setAccountData(profile);
  }, [profile, router]);
  
  const { userData } = useFetchUserData({ isLoggedIn, accountData });
  
  // useEffect(() => {
  //   if (!userData) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn, router, userData]);
  
  // console.log(userData);
  const userAvatar = userData?.avatar

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
    userData,
    userAvatar,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}
