import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none" style={{height: 'calc(100vh - 40px)'}}>
                <div className="flex-shrink-0 h-full overflow-y-auto fixed left-0 top-10 z-40 hidden sm:block" style={{height: 'calc(100vh - 40px)'}}>
                    <Sidebar />
                </div>
                <div className="sm:flex-1 h-full pb-16 sm:pb-0 sm:ml-20 md:ml-44 lg:ml-56" id="scrollableDiv" style={{height: 'calc(100vh - 40px)', overflowY: 'auto'}}>
                    <Outlet />
                </div>
                <div className="sm:hidden">
                    <Sidebar />
                </div>
            </div>
        </>
    );
}

export default Layout;