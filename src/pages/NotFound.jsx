import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineVideocamOff } from "react-icons/md";
import { FaHome, FaArrowLeft } from "react-icons/fa";

// Shown for any URL that doesn't match a route (catch-all "*" in App.jsx)
function NotFound() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    // "Go back" only makes sense if there's an in-app page to return to
    const canGoBack = window.history.state?.idx > 0;

    return (
        <div className="w-full min-h-full flex flex-col items-center justify-center text-white px-4 py-16 sm:py-24 text-center">
            <MdOutlineVideocamOff size={64} className="text-purple-500/80 mb-4" />

            <p className="text-6xl sm:text-7xl font-extrabold text-purple-500">404</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-100">Page not found</h1>
            <p className="mt-2 max-w-md text-gray-400">
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <p className="mt-3 max-w-md break-all rounded-md bg-gray-800/80 px-3 py-1.5 font-mono text-sm text-gray-400">
                {pathname}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-purple-700"
                >
                    <FaHome size={16} />
                    Go to Home
                </Link>
                {canGoBack && (
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-5 py-2.5 font-medium text-gray-200 transition-colors hover:bg-gray-800"
                    >
                        <FaArrowLeft size={14} />
                        Go back
                    </button>
                )}
            </div>
        </div>
    );
}

export default NotFound;
