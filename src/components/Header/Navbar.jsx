import React, { useState } from "react";
import { Search, Button, Logo, SearchForSmallScreen } from "../index.js";
import { Link } from "react-router-dom";
import {
    IoCloseCircleOutline,
    BiLike,
    CiSearch,
    HiOutlineVideoCamera,
    SlMenu,
} from "../icons.js";
import { MdVideoCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { CiSettings, CiUser, CiRepeat } from "react-icons/ci";
import { userLogout } from "../../store/Slices/authSlice.js";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const username = useSelector((state) => state.auth?.userData?.username);
    const profileImg = useSelector((state) => state.auth.userData?.avatar.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    const sidePanelItems = [
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
        {
            icon: <MdVideoCall size={25} />,
            title: "Upload Video",
            url: "/upload",
        },
    ];

    return (
        <>
            <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex justify-between items-center p-4 sm:gap-6 gap-3 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-3 cursor-pointer">
                    <Logo />
                </div>

                <div className="w-full sm:w-1/3 hidden sm:block">
                    <Search />
                </div>

                <div className="text-white flex justify-end sm:hidden">
                    <CiSearch
                        size={28}
                        className="hover:text-purple-400 transition"
                        onClick={() => setOpenSearch((prev) => !prev)}
                    />
                    {openSearch && (
                        <SearchForSmallScreen
                            open={openSearch}
                            setOpenSearch={setOpenSearch}
                        />
                    )}
                </div>

                {authStatus ? (
                    <div className="flex items-center gap-4">
                        {/* Upload Video Button */}
                        <Link 
                            to="/upload"
                            className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                        >
                            <MdVideoCall size={20} />
                            <span>Upload</span>
                        </Link>
                        
                        <div className="relative">
                            <div 
                                className="rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            >
                                <img
                                    src={profileImg}
                                    alt="profile"
                                    className="rounded-full w-10 h-10 object-cover border border-gray-600 shadow-md"
                                />
                            </div>
                        
                        {/* Profile Dropdown */}
                        {showProfileDropdown && (
                            <>
                                {/* Backdrop */}
                                <div 
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowProfileDropdown(false)}
                                ></div>
                                
                                {/* Dropdown Panel */}
                                <div className="fixed right-4 top-16 z-50 w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-2xl transform transition-all duration-300 ease-out animate-slide-in-right">
                                    {/* Header */}
                                    <div className="p-4 border-b border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={profileImg}
                                                alt="profile"
                                                className="rounded-full w-12 h-12 object-cover border border-gray-600"
                                            />
                                            <div>
                                                <h3 className="text-white font-semibold text-lg">{username}</h3>
                                                <p className="text-gray-400 text-sm">Manage your account</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Menu Items */}
                                    <div className="p-2">
                                        <Link 
                                            to="/settings/account"
                                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
                                            onClick={() => setShowProfileDropdown(false)}
                                        >
                                            <CiUser size={20} />
                                            <span>Edit Profile</span>
                                        </Link>
                                        
                                        <div className="flex items-center gap-3 px-4 py-3 text-gray-400 cursor-not-allowed rounded-lg">
                                            <CiRepeat size={20} />
                                            <span>Switch Account</span>
                                            <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded">Coming Soon</span>
                                        </div>
                                        
                                        <Link 
                                            to="/settings"
                                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
                                            onClick={() => setShowProfileDropdown(false)}
                                        >
                                            <CiSettings size={20} />
                                            <span>Settings</span>
                                        </Link>
                                        
                                        <div className="border-t border-gray-700 mt-2 pt-2">
                                            <button 
                                                onClick={() => {
                                                    setShowProfileDropdown(false);
                                                    logout();
                                                }}
                                                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
                                            >
                                                <IoMdLogOut size={20} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
                    </div>
                ) : (
                    <div className="hidden sm:flex gap-3">
                        <Link to="/login">
                            <Button className="bg-gray-800 border border-gray-700 hover:bg-purple-600 hover:text-white px-4 py-2 transition rounded-3xl">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-transparent border border-gray-700 hover:bg-purple-600 hover:text-white px-4 py-2 transition rounded-3xl">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="sm:hidden block">
                    <SlMenu
                        size={26}
                        className="text-white hover:text-purple-400 transition"
                        onClick={() => setToggleMenu((prev) => !prev)}
                    />
                </div>

                {toggleMenu && (
                    <div className="fixed right-0 top-0 text-white flex flex-col border-l border-gray-700 h-screen w-[70%] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 sm:hidden shadow-lg">
                        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
                            <Logo />
                            <IoCloseCircleOutline
                                size={30}
                                className="hover:text-red-500 transition"
                                onClick={() => setToggleMenu((prev) => !prev)}
                            />
                        </div>

                        <div className="flex flex-col justify-between h-full py-5 px-4">
                            <div className="flex flex-col gap-4">
                                {sidePanelItems.map((item) => (
                                    <NavLink
                                        to={item.url}
                                        key={item.title}
                                        onClick={() => setToggleMenu((prev) => !prev)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-3 py-2 rounded-lg transition ${isActive
                                                ? "bg-purple-500"
                                                : "hover:bg-gray-800"
                                            }`
                                        }
                                    >
                                        <div>{item.icon}</div>
                                        <span className="text-lg">{item.title}</span>
                                    </NavLink>
                                ))}
                            </div>

                            {!authStatus ? (
                                <div className="flex flex-col space-y-3">
                                    <Link to="/login">
                                        <Button className="w-full bg-gray-800 border border-gray-700 hover:bg-purple-600 hover:text-white py-2 transition rounded-lg">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="w-full bg-transparent border border-gray-700 hover:bg-purple-600 hover:text-white py-2 transition rounded-lg">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div
                                    className="flex gap-3 items-center cursor-pointer px-3 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                                    onClick={logout}
                                >
                                    <IoMdLogOut size={24} />
                                    <span className="text-base">Logout</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

        </>
    );
}

export default Navbar;