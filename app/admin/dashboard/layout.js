// app/dashboard/layout.jsx
import Sidebar from "./component/Sidebar.jsx";
import Navbar from "./component/Navbar.jsx";
import "./dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
