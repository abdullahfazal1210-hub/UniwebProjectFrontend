import React from "react";

export default function Authlayout({ children }) {
  return (
    <div className="flex justify-between">
      <div className="bg-red w-[50%]"></div>
      <div className="bg-blue w-[50%]">{children}</div>
    </div>
  );
}
