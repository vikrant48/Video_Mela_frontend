import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Logo, Button, Input, Spinner } from "./index";
import {
    requestForgotPasswordOTP,
    verifyForgotPasswordOTP,
    submitResetPassword,
} from "../store/Slices/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { MdEmail, MdVpnKey, MdLock } from "react-icons/md";
import toast from "react-hot-toast";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Step state: 1 = Email, 2 = OTP, 3 = Reset Password
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form data
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Visibility toggles
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Resend OTP Cooldown Timer (60s)
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    // Step 1: Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await dispatch(requestForgotPasswordOTP({ email })).unwrap();
            setStep(2);
            setCooldown(60);
        } catch (error) {
            // error toasted in authSlice
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP handler
    const handleResendOTP = async () => {
        if (cooldown > 0 || loading) return;
        setLoading(true);
        try {
            await dispatch(requestForgotPasswordOTP({ email })).unwrap();
            setCooldown(60);
        } catch (error) {
            // error toasted in authSlice
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!otp.trim() || otp.trim().length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const data = await dispatch(
                verifyForgotPasswordOTP({ email, otp: otp.trim() })
            ).unwrap();
            if (data?.resetToken) {
                setResetToken(data.resetToken);
                setStep(3);
            }
        } catch (error) {
            // error toasted in authSlice
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            toast.error("Please enter a new password");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await dispatch(
                submitResetPassword({ resetToken, newPassword })
            ).unwrap();
            navigate("/login");
        } catch (error) {
            // error toasted in authSlice
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full text-white flex justify-center items-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="w-full max-w-md mx-auto">
                <div className="relative border border-gray-700/60 p-6 sm:p-8 rounded-2xl shadow-2xl bg-gray-800/90 backdrop-blur-sm space-y-6">
                    {/* Close Icon */}
                    <button
                        onClick={() => navigate("/login")}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition duration-200"
                        aria-label="Back to login"
                    >
                        <IoMdClose size={22} />
                    </button>

                    {/* Logo Section */}
                    <div className="flex flex-col items-center gap-2">
                        <Logo />
                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Forgot Password
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 text-center">
                            {step === 1 && "Enter your email to receive a 6-digit verification OTP."}
                            {step === 2 && `Enter the 6-digit OTP sent to ${email}`}
                            {step === 3 && "Create a new password for your account."}
                        </p>
                    </div>

                    {/* Step Indicators */}
                    <div className="flex items-center justify-between px-6 py-2 bg-gray-900/60 rounded-xl border border-gray-700/40">
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${step >= 1 ? "text-purple-400" : "text-gray-500"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"}`}>1</span>
                            Email
                        </div>
                        <div className={`h-0.5 flex-1 mx-2 ${step >= 2 ? "bg-purple-600" : "bg-gray-700"}`}></div>
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${step >= 2 ? "text-purple-400" : "text-gray-500"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"}`}>2</span>
                            OTP
                        </div>
                        <div className={`h-0.5 flex-1 mx-2 ${step >= 3 ? "bg-purple-600" : "bg-gray-700"}`}></div>
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${step >= 3 ? "text-purple-400" : "text-gray-500"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"}`}>3</span>
                            Reset
                        </div>
                    </div>

                    {/* STEP 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MdEmail className="text-purple-400" size={18} />
                                    Account Email:
                                </label>
                                <Input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 bg-gray-900/60 border-gray-700 focus:border-purple-500 text-sm rounded-lg"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Spinner /> Sending OTP...
                                    </>
                                ) : (
                                    "Send Verification OTP"
                                )}
                            </Button>
                        </form>
                    )}

                    {/* STEP 2: OTP Verification Form */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MdVpnKey className="text-purple-400" size={18} />
                                    Enter 6-Digit OTP Code:
                                </label>
                                <Input
                                    type="text"
                                    maxLength={6}
                                    placeholder="e.g. 123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    required
                                    className="h-12 bg-gray-900/60 border-gray-700 focus:border-purple-500 text-center text-2xl font-bold tracking-widest rounded-lg"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Spinner /> Verifying OTP...
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}
                            </Button>

                            {/* Resend OTP & Back Options */}
                            <div className="flex items-center justify-between pt-2 text-xs sm:text-sm">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-white flex items-center gap-1 transition"
                                >
                                    <IoMdArrowBack size={16} /> Change Email
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={cooldown > 0 || loading}
                                    className={`font-medium transition ${cooldown > 0 ? "text-gray-500 cursor-not-allowed" : "text-purple-400 hover:text-purple-300 underline"}`}
                                >
                                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3: Reset Password Form */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            {/* New Password */}
                            <div className="space-y-1 relative">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MdLock className="text-purple-400" size={18} />
                                    New Password:
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10 bg-gray-900/60 border-gray-700 focus:border-purple-500 text-sm rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
                                    >
                                        {showNewPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1 relative">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MdLock className="text-purple-400" size={18} />
                                    Confirm New Password:
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10 bg-gray-900/60 border-gray-700 focus:border-purple-500 text-sm rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
                                    >
                                        {showConfirmPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Spinner /> Resetting Password...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    )}

                    {/* Back to Login Footer */}
                    <div className="text-center pt-2 border-t border-gray-700/50">
                        <Link
                            to="/login"
                            className="text-sm text-purple-400 hover:text-purple-300 transition font-medium inline-flex items-center gap-1"
                        >
                            <IoMdArrowBack size={16} /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
