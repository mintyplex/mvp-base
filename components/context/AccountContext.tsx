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
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "~/app/client";
import { base } from "thirdweb/chains";
import ProfileModal from "~/app/profile-update/profileModal";

// I don't know how to properly get the type for client so I'll just pass in any for the type being
type AccountProviderProps = {
  toggleSidebar: () => void;
  // client: any | null;
  accountData: string | null;
  userBalance: string | null;
  isLoggedIn: boolean;
  isSidebarOpen: boolean;
  account: any;
  setShowAbstraxion: (value: boolean) => void;
  setLoadingModal: (value: boolean) => void;
  closeSidebar: () => void;
  loadingModal: any | null;
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
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const router = useRouter();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // XION
  // const { data: account } = useAbstraxionAccount();
  // const { client } = useAbstraxionSigningClient();

  // Thirdweb
  const account = useActiveAccount();
  const profile = account?.address;

  const { data: balance, isLoading } = useWalletBalance({
    client: client,
    chain: base,
    address: account?.address,
  });

  // console.log("wallet address", account?.address);
  // console.log("wallet balance", balance?.displayValue, balance?.symbol);

  useEffect(() => {
    setIsLoggedIn(!!profile);
    setAccountData(profile as any);
    setUserBalance(balance?.displayValue as string);
  }, [profile, router, balance?.displayValue]);

  const { userData } = useFetchUserData({
    isLoggedIn,
    accountData,
    setLoadingModal,
  });

  {
    loadingModal && <ProfileModal isOpen={loadingModal} />;
  }

  // useEffect(() => {
  //   if (!userData) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn, router, userData]);

  // console.log(userData);
  const userAvatar = userData?.avatar;

  const contextValue: AccountProviderProps = {
    toggleSidebar,
    setLoadingModal,
    loadingModal,
    accountData,
    userBalance,
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
