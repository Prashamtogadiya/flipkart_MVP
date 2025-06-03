import Navbar from "../components/Navbar";
import CategoryNavbar from "../components/CategoryNavbar";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] px-4 py-2">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardPage;
