import React, { Children } from "react";

const ReuseableBackground = ({ children }: any) => {
  return (
    <div className="bg-[rgb(44,45,46)] rounded-lg py-4 px-4">{children}</div>
  );
};

export default ReuseableBackground;
