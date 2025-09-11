import React from "react";
import {
    MdOutlineSlowMotionVideo,
    RxAvatar,
    FaRegEye,
    FaRegHeart,
} from "../../components/icons";

function StatsSection({ dashboard }) {
    const stats = [
        {
            icon: MdOutlineSlowMotionVideo,
            label: "Total Videos",
            value: dashboard?.totalVideos || 0,
            color: "from-purple-600 to-purple-700",
            iconColor: "text-purple-400",
            bgColor: "bg-purple-900/20"
        },
        {
            icon: FaRegEye,
            label: "Total Views",
            value: dashboard?.totalViews || 0,
            color: "from-blue-600 to-blue-700",
            iconColor: "text-blue-400",
            bgColor: "bg-blue-900/20"
        },
        {
            icon: RxAvatar,
            label: "Total Subscribers",
            value: dashboard?.totalSubscribers || 0,
            color: "from-green-600 to-green-700",
            iconColor: "text-green-400",
            bgColor: "bg-green-900/20"
        },
        {
            icon: FaRegHeart,
            label: "Total Likes",
            value: dashboard?.totalLikes || 0,
            color: "from-red-600 to-red-700",
            iconColor: "text-red-400",
            bgColor: "bg-red-900/20"
        }
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.color} p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700/50 backdrop-blur-sm`}
                    >
                        <div className={`absolute inset-0 ${stat.bgColor} backdrop-blur-sm`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor} border border-gray-600/30`}>
                                    <IconComponent
                                        className={`${stat.iconColor}`}
                                        size={24}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-200 text-sm font-medium">{stat.label}</p>
                                <p className="text-white text-2xl sm:text-3xl font-bold">
                                    {stat.value.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default StatsSection;