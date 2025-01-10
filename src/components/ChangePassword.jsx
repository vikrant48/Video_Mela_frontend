import React from "react";
import { Input2, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../store/Slices/authSlice";

function ChangePassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        resetField,
    } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(
            changePassword({
                oldPassword: data?.oldPassword,
                newPassword: data?.oldPassword,
            })
        );
        resetField("oldPassword");
        resetField("newPassword");
        resetField("confirmPassword");
    };

    return (
        <div className="w-full text-white flex justify-center items-center mt-4">
            <div className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-6 text-center">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Old Password */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="oldPassword"
                            className="text-sm font-medium mb-2"
                        >
                            Old Password
                        </label>
                        <Input2
                            id="oldPassword"
                            type="password"
                            className="rounded bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2"
                            {...register("oldPassword", {
                                required: "Old password is required",
                            })}
                            aria-invalid={errors.oldPassword ? "true" : "false"}
                        />
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
                        <Input2
                            id="newPassword"
                            type="password"
                            className="rounded bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            aria-invalid={errors.newPassword ? "true" : "false"}
                        />
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
                        <Input2
                            id="confirmPassword"
                            type="password"
                            className="rounded bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none p-2"
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
        </div>

    );
}

export default ChangePassword;