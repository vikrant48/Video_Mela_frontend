import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

const LoginPopup = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-white w-full max-w-sm text-center shadow-lg">
                {/* Logo Section */}
                <div className="flex flex-col gap-2 items-center mb-6">
                    <Logo size="30" />
                </div>

                {/* Prompt Message */}
                <p className="text-xl font-semibold mb-4">
                    Login or Signup to continue
                </p>

                {/* Login Button */}
                <Link to="/login">
                    <Button
                        className="bg-purple-500 w-full py-3 font-bold text-lg rounded-lg hover:bg-purple-700 transition duration-200"
                        textColor="text-black"
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </div>

    );
};

export default LoginPopup;