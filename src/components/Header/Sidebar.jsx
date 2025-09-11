import React from "react";
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
    RiFileHistoryLine,
    AiOutlineQuestionCircle,
    MdFeedback,

} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth?.userData?.username);
    const sidebarTopItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const bottomBarItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    return (
        <>
            <div className="hidden sm:block">
                <div className="text-white bg-gradient-to-b from-gray-900 via-gray-800/95 to-gray-900 lg:w-56 md:w-44 w-16 sm:w-20 sm:p-4 p-2 border-r border-gray-700/50 backdrop-blur-sm shadow-2xl h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-2 sm:gap-4 mt-3 sm:mt-5 flex-1">
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 sm:gap-3 justify-center sm:justify-start py-2 sm:py-3 px-2 sm:px-3 rounded-xl transition-all duration-300 touch-manipulation ${isActive
                                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 scale-105"
                                        : "hover:bg-gray-700/50 active:bg-gray-600/50 hover:text-white hover:scale-105 hover:shadow-md"
                                    }`
                                }
>
                                <div className="transition-transform duration-300">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        {React.cloneElement(item.icon, { size: 20 })}
                                    </div>
                                </div>
                                <span className="text-xs sm:text-sm md:text-base hidden md:block font-medium">
                                    {item.title}
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 mt-8 sm:mt-16">
                        {username && (
                            <button
                                className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start py-2 sm:py-3 px-2 sm:px-3 rounded-xl hover:bg-red-600/20 active:bg-red-600/30 hover:text-red-400 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-red-500/50 hover:scale-105 hover:shadow-md touch-manipulation"
                                onClick={() => logout()}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <IoMdLogOut size={20} />
                                </div>
                                <span className="text-xs sm:text-sm md:text-base hidden md:block font-medium">
                                    Logout
                                </span>
                            </button>
                        )}

                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="/settings/account"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 sm:gap-3 justify-center sm:justify-start py-2 sm:py-3 px-2 sm:px-3 rounded-xl transition-all duration-300 border border-gray-600/50 touch-manipulation ${
                                        isActive
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 border-blue-500/50 scale-105"
                                            : "hover:bg-gray-700/50 active:bg-gray-600/50 hover:text-white hover:border-gray-500/50 hover:scale-105 hover:shadow-md"
                                    }`
                                }
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <CiSettings size={20} />
                                </div>
                                <span className="text-xs sm:text-sm md:text-base hidden md:block font-medium">
                                    Settings
                                </span>
                            </NavLink>

                            <NavLink
                                to="/report-history"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 justify-center sm:justify-start py-3 px-3 rounded-xl transition-all duration-300 border border-gray-600/50 ${
                                        isActive
                                            ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/25 border-orange-500/50 scale-105"
                                            : "hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 hover:scale-105 hover:shadow-md"
                                    }`
                                }
                            >
                                <RiFileHistoryLine size={25} />
                                <span className="text-sm md:text-base hidden md:block font-medium">
                                    Report History
                                </span>
                            </NavLink>

                            <NavLink
                                to="/help"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 justify-center sm:justify-start py-3 px-3 rounded-xl transition-all duration-300 border border-gray-600/50 ${
                                        isActive
                                            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/25 border-green-500/50 scale-105"
                                            : "hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 hover:scale-105 hover:shadow-md"
                                    }`
                                }
                            >
                                <AiOutlineQuestionCircle size={25} />
                                <span className="text-sm md:text-base hidden md:block font-medium">
                                    Help
                                </span>
                            </NavLink>

                            <NavLink
                                to="/feedback"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 justify-center sm:justify-start py-3 px-3 rounded-xl transition-all duration-300 border border-gray-600/50 ${
                                        isActive
                                            ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/25 border-teal-500/50 scale-105"
                                            : "hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 hover:scale-105 hover:shadow-md"
                                    }`
                                }
                            >
                                <MdFeedback size={25} />
                                <span className="text-sm md:text-base hidden md:block font-medium">
                                    Send Feedback
                                </span>
                            </NavLink>
                        </div>
                    </div>

                    <div className="text-xs text-center text-gray-400 border-t border-gray-700 pt-4">
                        &copy; {new Date().getFullYear()}VideoMela. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-800/95 to-gray-900 border-t border-gray-700/50 backdrop-blur-md p-2 sm:p-3 flex justify-around items-center md:hidden z-50 shadow-2xl">
                {bottomBarItems.map((item) => (
                    <NavLink
                        key={item.title}
                        to={item.url}
                        className={({ isActive }) =>
                            `flex flex-col items-center p-2 rounded-xl transition-all duration-300 touch-manipulation min-w-0 flex-1 max-w-20 ${
                                isActive
                                    ? "text-purple-400 bg-gradient-to-t from-purple-600/20 to-purple-500/10 shadow-lg shadow-purple-500/25 scale-110 border border-purple-500/30"
                                    : "text-gray-400 hover:text-white active:text-purple-300 hover:bg-gray-700/30 active:bg-gray-600/30 hover:scale-105"
                            }`
                        }
                    >
                        <div className="transition-transform duration-300 mb-1">
                            {React.cloneElement(item.icon, { size: 20 })}
                        </div>
                        <span className="text-xs font-medium truncate w-full text-center leading-tight">{item.title}</span>
                    </NavLink>
                ))}
            </div>

        </>
    );
}

export default Sidebar;