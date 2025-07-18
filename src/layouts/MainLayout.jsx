import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto font-inter">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
