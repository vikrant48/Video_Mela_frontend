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
                <div className="text-white bg-gradient-to-b from-gray-900 to-gray-800 lg:w-56 md:w-44 w-20 sm:p-4 p-3 border-r border-gray-700 shadow-lg h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-800" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg transition ${isActive
                                        ? "bg-purple-500 text-white shadow-md"
                                        : "hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                {item.icon}
                                <span className="text-sm md:text-base hidden md:block">
                                    {item.title}
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 mt-16 ">
                        {username && (
                            <div
                                className="flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition cursor-pointer border border-gray-600"
                                onClick={() => logout()}
                            >
                                <IoMdLogOut size={25} />
                                <span className="text-sm md:text-base hidden md:block">
                                    Logout
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition cursor-pointer border border-gray-600">
                                <CiSettings size={25} />
                                <span className="text-sm md:text-base hidden md:block">
                                    Settings
                                </span>
                            </div>

                            <div className="flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition cursor-pointer border border-gray-600">
                                <RiFileHistoryLine size={25} />
                                <span className="text-sm md:text-base hidden md:block">
                                    Report History
                                </span>
                            </div>

                            <div className="flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition cursor-pointer border border-gray-600">
                                <AiOutlineQuestionCircle size={25} />
                                <span className="text-sm md:text-base hidden md:block">
                                    Help
                                </span>
                            </div>

                            <div className="flex items-center gap-3 justify-center sm:justify-start py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition cursor-pointer border border-gray-600">
                                <MdFeedback size={25} />
                                <span className="text-sm md:text-base hidden md:block">
                                    Send Feedback
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-center text-gray-400 border-t border-gray-700 pt-4">
                        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar for Mobile */}
            <div className="fixed bottom-0 z-20 w-full border-t-2 border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 text-white h-16 flex justify-around items-center shadow-lg sm:hidden">
                {bottomBarItems.map((item) => (
                    <NavLink
                        to={item.url}
                        key={item.title}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition ${isActive
                                ? "text-purple-500 font-semibold"
                                : "hover:text-purple-400"
                            }`
                        }
                    >
                        {item.icon}
                        <span className="text-xs">{item.title}</span>
                    </NavLink>
                ))}
            </div>

        </>
    );
}

export default Sidebar;