import React, { Children } from "react";
import { LayoutProps } from "~/.next/types/app/page";

const ReuseableBackground = ({ children }: LayoutProps) => {
  return (
    <div className="bg-[rgb(44,45,46)] rounded-lg py-4 px-4">{children}</div>
  );
};

export default ReuseableBackground;
