import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "../components";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (!authentication && authStatus !== authentication) {
            return;
        }
    }, [authStatus, authentication, navigate]);

    if (authentication && authStatus !== authentication) {
        return (
            <div className="relative min-h-screen">
                <div className="pointer-events-none select-none opacity-30 blur-[2px] filter">
                    {children}
                </div>
                <LoginPopup onClose={() => navigate("/")} />
            </div>
        );
    }

    return children;
}

export default AuthLayout;