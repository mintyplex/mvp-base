"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";
import useFetchUserData from "~/hooks/useFetchData";
import ProfileModal from "~/app/profile-update/profileModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
// interface UseFetchUserDataProps {
//   isLoggedIn: boolean;
//   accountData: string | null;
//   retries?: number;
// }

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { accountData, isLoggedIn, setLoadingModal, loadingModal } = useAccount();
  const { isLoading, hasError, userData } = useFetchUserData({
    isLoggedIn,
    accountData,
    retries: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDatInLocalStorage = window.localStorage.getItem("user");
      if (accountData && !userDatInLocalStorage) {
        setLoadingModal(true);
      }
      if (userDatInLocalStorage) {
        setLoadingModal(false);
      }
      if (!accountData && !userDatInLocalStorage) {
        router.push("/");
      }
    }
  }, [accountData, userData, router]);

  const closeModal = () => {
    setLoadingModal(false);
  };

  return (
    <>
      {isLoggedIn && <LoadingModal isOpen={isLoading} />}
      {loadingModal && <ProfileModal isOpen={loadingModal} onClose={closeModal} />}
      {children}
    </>
  );
};

export default ProtectedRoute;
