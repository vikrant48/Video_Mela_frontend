import { useSelector } from "react-redux";
import { Button } from "../index";
import { Link } from "react-router-dom";
import ChangePassword from "../ChangePassword";

function AccountSettings() {
    const auth = useSelector((state) => state.auth?.userData);

    return (
        <div className="max-w-4xl text-white space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Account Overview</h2>

                <div className="space-y-4 border-t border-gray-700/60 pt-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/40">
                        <span className="text-gray-400 text-sm">Account Username</span>
                        <span className="font-semibold text-purple-400">@{auth?.username || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/40">
                        <span className="text-gray-400 text-sm">Full Name</span>
                        <span className="font-semibold text-gray-100">{auth?.fullName || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/40">
                        <span className="text-gray-400 text-sm">Primary Email</span>
                        <span className="font-medium text-gray-200">{auth?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-400 text-sm">Account Status</span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                            Active
                        </span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700/60 flex justify-end">
                    <Link
                        to="/settings/personalInfo"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Edit Personal Info & Avatar →
                    </Link>
                </div>
            </div>

            {/* Change Password Section */}
            <ChangePassword />

            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-gray-300 text-sm mb-4">
                    Once you delete your account, there is no going back. All videos, playlists, and channel data will be permanently removed.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Delete Account
                </Button>
            </div>
        </div>
    );
}

export default AccountSettings;