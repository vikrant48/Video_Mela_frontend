import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none" style={{height: 'calc(100vh - 64px)'}}>
                <div className="flex-shrink-0 h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="sm:flex-1 h-full overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;