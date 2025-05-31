import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto font-inter">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
