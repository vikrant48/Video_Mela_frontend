import React from "react";
import { NavLink } from "react-router-dom";

function ChannelNavigate({ username, edit }) {
    if (edit) {
        return (
            <>
                <section className="text-white w-full flex justify-center items-center bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 text-sm sm:text-base">
                <div className="flex gap-1 p-1 bg-gray-800/50 rounded-full">
                    <NavLink
                        to={`/edit/personalInfo`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-300"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-6 py-2 transition-all duration-300"
                        }
                    >
                        Personal Information
                    </NavLink>
                    <NavLink
                        to={`/edit/password`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-300"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-6 py-2 transition-all duration-300"
                        }
                    >
                        Change Password
                    </NavLink>
                </div>
            </section>
            </>
        );
    }
    return (
        <>
            {/* channel options */}
            <section className="text-white w-full flex justify-center items-center bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 text-sm sm:text-base py-2">
                <div className="flex gap-1 p-1 bg-gray-800/50 rounded-full overflow-x-auto">
                    <NavLink
                        to={`/channel/${username}/videos`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-4 py-2 transition-all duration-300 whitespace-nowrap"
                        }
                    >
                        Videos
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/playlists`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-4 py-2 transition-all duration-300 whitespace-nowrap"
                        }
                    >
                        Playlists
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/tweets`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-4 py-2 transition-all duration-300 whitespace-nowrap"
                        }
                    >
                        Tweets
                    </NavLink>
                    <NavLink
                        to={`/channel/${username}/subscribed`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full px-4 py-2 transition-all duration-300 whitespace-nowrap"
                        }
                    >
                        Subscribed
                    </NavLink>
                </div>
            </section>
        </>
    );
}

export default ChannelNavigate;