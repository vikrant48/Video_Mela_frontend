import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";
import { IoClose } from "react-icons/io5";

const LoginPopup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-black/75 backdrop-blur-sm z-50 p-4 cursor-default"
            onClick={handleClose}
        >
            <div
                className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 text-white w-full max-w-sm text-center shadow-2xl transition-all scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Icon */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800 transition duration-200"
                    aria-label="Close modal"
                >
                    <IoClose size={22} />
                </button>

                {/* Logo Section */}
                <div className="flex flex-col gap-2 items-center mb-5 mt-2">
                    <Logo size="32" />
                </div>

                {/* Prompt Message */}
                <p className="text-xl font-semibold mb-2">
                    Login or Signup to continue
                </p>
                <p className="text-sm text-gray-400 mb-6">
                    Join VideoMela to access your history, liked videos, subscriptions, and more.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link to="/login" className="w-full">
                        <Button
                            className="bg-purple-600 w-full py-3 font-bold text-base rounded-xl hover:bg-purple-700 transition duration-200"
                            textColor="text-white"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup" className="w-full">
                        <Button
                            className="bg-gray-800 border border-gray-700 w-full py-3 font-bold text-base rounded-xl hover:bg-gray-700 transition duration-200"
                            textColor="text-white"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;