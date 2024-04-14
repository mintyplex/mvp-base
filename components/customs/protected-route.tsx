import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "~/components/context/AccountContext";
import LoadingModal from "~/components/ui/LoadingModal";
import useFetchUserData from "~/hooks/useFetchData";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { accountData, isLoggedIn } = useAccount();
  const { isLoading } = useFetchUserData({
    isLoggedIn,
    accountData,
    retries: 2,
  });

//   useEffect(() => {
//     if (!isLoggedIn && !isLoading) {
//       router.push("/");
//     }
//   }, [isLoggedIn, isLoading, router]);

  //   if (!isLoggedIn) {
  //     isLoading === false
  //   }

  return (
    <>
      {isLoggedIn ? (
        <>{isLoading && <LoadingModal isOpen={isLoading} />}</>
      ) : null}
      {children}
    </>
  );
};

export default ProtectedRoute;
