import React from "react";
import Button from "../Button";

function HeaderSection({ username, setPopUp }) {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30 p-6 sm:p-8 border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Welcome Back, <span className="text-purple-400">{username}</span>
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                        Dive into a seamless video journey where creativity meets convenience.
                        Effortless video management, personalized recommendations, and limitless entertainment—all at your fingertips.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
                        textColor="text-white"
                        onClick={() =>
                            setPopUp((prev) => ({
                                ...prev,
                                uploadVideo: !prev.uploadVideo,
                            }))
                        }
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Upload Video
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default HeaderSection;