import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-black text-white">
            <Navbar />
            <div className="flex flex-1 overflow-hidden relative">
                {/* Scroll 1: Left Sidebar Scroll */}
                <aside className="hidden sm:block flex-shrink-0 h-full overflow-y-auto z-40 border-r border-gray-800">
                    <Sidebar />
                </aside>

                {/* Scroll 2: Right Main Page Content Scroll */}
                <main className="flex-1 h-full overflow-y-auto pb-16 sm:pb-0" id="scrollableDiv">
                    <Outlet />
                </main>

                {/* Mobile Navigation */}
                <div className="sm:hidden">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default Layout;