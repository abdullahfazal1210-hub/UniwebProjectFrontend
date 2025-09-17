import React from "react";

export default function Authlayout({ children }) {
  return (
    <div className="flex justify-between h-screen">
      <div className="bg-red w-[60%] auth-bg h-screen"></div>
      <div className="bg-[#1A1A1A] w-[40%] h-screen flex flex-col justify-center items-center">{children}</div>
    </div>
  );
}
