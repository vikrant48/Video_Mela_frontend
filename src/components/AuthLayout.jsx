import { useSelector } from "react-redux";
import { LoginPopup, Spinner } from "../components";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const authChecked = useSelector((state) => state.auth.authChecked);

    if (authentication && authStatus !== authentication) {
        // Session check still running (e.g. right after a page refresh): wait rather than
        // flash the login prompt at a user who is actually logged in
        if (!authChecked) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <Spinner width={8} />
                </div>
            );
        }

        // Not logged in: don't mount the protected page at all. Rendering it behind the prompt
        // fired its API calls anyway (all rejected with 401). The server is still what enforces auth.
        return (
            <div className="relative min-h-screen">
                <LoginPopup onClose={() => navigate("/")} />
            </div>
        );
    }

    return children;
}

export default AuthLayout;
