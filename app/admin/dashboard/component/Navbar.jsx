// app/dashboard/components/Navbar.jsx
"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("userName");
    localStorage.removeItem("returnUrl");
    localStorage.removeItem("savedClientNeed");
    localStorage.removeItem("savedPropertyRequest");

    // Expire cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to home
    router.push("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
