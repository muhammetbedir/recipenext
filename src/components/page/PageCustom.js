import React from "react";

const PageCustom = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-8/12 items-center justify-center flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default PageCustom;
