import { Outlet } from "react-router-dom";
import AdminNavbar from "../navbar/adminNavbar.jsx";
import Sidebar from "../components/sidebar.jsx"
import Footer from "../components/footerSecnd.jsx";


export default function AdminLayout() {
  return (
    <>
      <div id="detail">
        <nav>
          <AdminNavbar />
          <Sidebar/>
        </nav>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
}
