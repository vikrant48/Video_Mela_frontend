import { Container, Spinner } from "../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SettingsNavigate from "../components/settings/SettingsNavigate";

function Settings() {
    const loading = useSelector((state) => state.auth?.loading);
    
    window.scrollTo(0, 0);
    
    return (
        <>
            {loading && (
                <div className="w-full fixed top-20 flex justify-center z-20">
                    <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                        <Spinner />
                        <span className="text-md font-bold text-white">
                            Loading settings...
                        </span>
                    </div>
                </div>
            )}

            <Container>
                <div className="text-white py-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">Settings</h1>
                        <p className="text-gray-400">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    
                    <SettingsNavigate />
                    
                    <div className="mt-6">
                        <Outlet />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Settings;