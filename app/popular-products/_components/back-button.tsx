"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "~/components/ui/button";

type Props = {
  children?: React.ReactNode;
} & ButtonProps;

export default function BackButton({ children, ...props }: Props) {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </Button>
  );
}
