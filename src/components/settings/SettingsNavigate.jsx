import { NavLink } from "react-router-dom";
import { CiSettings, CiLock, CiBellOn, CiPalette } from "react-icons/ci";

function SettingsNavigate() {
    const navigationItems = [
        {
            name: "Account",
            path: "/settings/account",
            icon: <CiSettings size={20} />
        },
        {
            name: "Privacy",
            path: "/settings/privacy",
            icon: <CiLock size={20} />
        },
        {
            name: "Notifications",
            path: "/settings/notifications",
            icon: <CiBellOn size={20} />
        },
        {
            name: "Appearance",
            path: "/settings/appearance",
            icon: <CiPalette size={20} />
        }
    ];

    return (
        <div className="border-b border-gray-700">
            <nav className="flex space-x-8 overflow-x-auto">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                isActive
                                    ? "border-purple-500 text-purple-500"
                                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-300"
                            }`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default SettingsNavigate;