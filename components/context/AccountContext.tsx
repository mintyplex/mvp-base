"use client";
import { createContext, useContext } from "react";

import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  userData: any | null;
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
  const [userData, setUserData] = useState<any>(null); // Initialize userData state

  const router = useRouter();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // XION
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  // console.log(account, client)
  // const apiUrl = process.env.NEXT_BASE_URL;

  if (isLoggedIn) {
    router.push("/profile-update");
  }

  const profile = account?.bech32Address;

  useEffect(() => {
    setIsLoggedIn(!!profile);
    setAccountData(profile);

    if (isLoggedIn && profile) {

      const apiUrl = 'https://mintyplex-api.onrender.com/api/v1/user';      

      fetch(`${apiUrl}/profile/${profile}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUserData(data);
          } else {
            router.push("/profile-update");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          router.push("/profile-update");
        });
    }
  }, [profile, isLoggedIn, router]);

  const contextValue: AccountProviderProps = {
    toggleSidebar,
    client,
    accountData,
    isLoggedIn,
    isSidebarOpen,
    account,
    setShowAbstraxion,
    closeSidebar,
    userData,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}
