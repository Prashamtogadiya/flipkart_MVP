import Navbar from "../components/Navbar";
import CategoryNavbar from "../components/CategoryNavbar";
import { Outlet } from "react-router-dom";

// DashboardPage is the main layout for authenticated users
const DashboardPage = () => {
  return (
    <>
      {/* Top navigation bar */}
      <Navbar />
      {/* Main content area with some padding and minimum height */}
      <main className="min-h-[80vh] px-4 py-2">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
    </>
  );
};

export default DashboardPage;
