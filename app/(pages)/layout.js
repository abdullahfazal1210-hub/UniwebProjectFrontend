import React from "react";
import Header from "../components/web/common/Header/page";
import Footer from "../components/web/common/Footer/page";


export default function Weblayout({ children }) {
  return (
    <div className="relative">
      <Header />
      <main>
        {children}
      </main>
      <Footer />  
    </div>
  );
}
