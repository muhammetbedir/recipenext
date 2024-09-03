import CustomAppBar from "@/components/page/CustomAppBar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <CustomAppBar />
      <main className="pt-20"> {children}</main>
    </div>
  );
};

export default Layout;
