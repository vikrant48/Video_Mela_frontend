import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skelton/loginskelton.jsx";

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        const isEmail = data.username.includes("@");
        const loginData = isEmail
            ? { email: data.username, password: data.password }
            : data;

        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        if (user && response?.payload) {
            navigate("/");
        }
    };

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <>
            <div className="min-h-screen w-full text-white flex justify-center items-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex flex-col space-y-6 justify-center items-center border border-gray-700/50 p-6 sm:p-8 rounded-xl shadow-2xl bg-gray-800/80 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Logo />
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                        <form
                            onSubmit={handleSubmit(submit)}
                            className="space-y-5 w-full text-sm"
                        >
                            <div className="space-y-2">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Username / Email
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username or email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 hover:border-gray-500"
                                    {...register("username", {
                                        required: "Username or email is required",
                                    })}
                                    aria-invalid={errors.username ? "true" : "false"}
                                />
                                {errors.username && (
                                    <span
                                        className="text-sm text-red-400 mt-1 block"
                                        role="alert"
                                    >
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 hover:border-gray-500"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                {errors.password && (
                                    <span
                                        className="text-sm text-red-400 mt-1 block"
                                        role="alert"
                                    >
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-purple-500/25 touch-manipulation"
                            >
                                Sign In
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-gray-400">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to={"/signup"}
                                        className="text-purple-400 font-medium hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:underline"
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;