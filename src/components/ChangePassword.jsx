import React, { useState } from "react";
import { Input2, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../store/Slices/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function ChangePassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        resetField,
    } = useForm();
    const dispatch = useDispatch();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        dispatch(
            changePassword({
                oldPassword: data?.oldPassword,
                newPassword: data?.newPassword,
            })
        );
        resetField("oldPassword");
        resetField("newPassword");
        resetField("confirmPassword");
    };

    return (
        <div className="w-full text-white bg-gray-800 p-6 border border-gray-700/60 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Change Password</h2>
            <p className="text-sm text-gray-400 mb-6">
                Ensure your account is using a long, random password to stay secure.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Old Password */}
                <div className="flex flex-col">
                    <label
                        htmlFor="oldPassword"
                        className="text-sm font-medium mb-2"
                    >
                        Old Password
                    </label>
                    <div className="relative flex items-center">
                        <Input2
                            id="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            className="rounded bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2 pr-10 w-full"
                            {...register("oldPassword", {
                                required: "Old password is required",
                            })}
                            aria-invalid={errors.oldPassword ? "true" : "false"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
                            title={showOldPassword ? "Hide password" : "Show password"}
                        >
                            {showOldPassword ? (
                                <FaRegEyeSlash size={18} />
                            ) : (
                                <FaRegEye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.oldPassword && (
                        <span
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                        >
                            {errors.oldPassword.message}
                        </span>
                    )}
                </div>

                {/* New Password */}
                <div className="flex flex-col">
                    <label
                        htmlFor="newPassword"
                        className="text-sm font-medium mb-2"
                    >
                        New Password
                    </label>
                    <div className="relative flex items-center">
                        <Input2
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            className="rounded bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2 pr-10 w-full"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            aria-invalid={errors.newPassword ? "true" : "false"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
                            title={showNewPassword ? "Hide password" : "Show password"}
                        >
                            {showNewPassword ? (
                                <FaRegEyeSlash size={18} />
                            ) : (
                                <FaRegEye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <span
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                        >
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium mb-2"
                    >
                        Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                        <Input2
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="rounded bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2 pr-10 w-full"
                            {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: {
                                    matchesNewPassword: (value) =>
                                        value === getValues("newPassword") ||
                                        "Passwords do not match",
                                },
                            })}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <FaRegEyeSlash size={18} />
                            ) : (
                                <FaRegEye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                        >
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <Button
                        type="submit"
                        className="bg-purple-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;