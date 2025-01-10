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
            <div className="w-full h-screen text-white flex justify-center items-start sm:mt-8">
                <div className="flex flex-col space-y-6 justify-center items-center border border-gray-600 p-6 mt-24 rounded-lg shadow-lg bg-gray-800 sm:w-3/4 lg:w-1/3">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 w-full sm:w-96 text-sm"
                    >
                        {/* Username / Email Input */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium mb-2"
                            >
                                Username / Email:
                            </label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="example@gmail.com"
                                className="rounded bg-gray-900 text-white p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                {...register("username", {
                                    required: "Username is required",
                                })}
                                aria-invalid={errors.username ? "true" : "false"}
                            />
                            {errors.username && (
                                <span
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.username.message}
                                </span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium mb-2"
                            >
                                Password:
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="rounded bg-gray-900 text-white p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && (
                                <span
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full py-3 bg-purple-500 hover:bg-purple-700 text-lg font-medium rounded-lg transition duration-200"
                        >
                            Login
                        </Button>

                        {/* Signup Redirect */}
                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-purple-400 font-medium hover:opacity-80 transition duration-200"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Login;