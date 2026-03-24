import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[112px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};


export default AuthLayout;
