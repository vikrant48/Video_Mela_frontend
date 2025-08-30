import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none h-screen">
                <div className="flex-shrink-0">
                    <Sidebar />
                </div>
                <div className="sm:flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;