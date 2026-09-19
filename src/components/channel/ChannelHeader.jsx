import { useEffect, useState } from "react";
import { Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../../store/Slices/subscriptionSlice";
import PropTypes from "prop-types";

function ChannelHeader({
    coverImage,
    avatar,
    username,
    fullName,
    subscribersCount,
    subscribedCount,
    isSubscribed,
    channelId,
}) {
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] =
        useState(subscribersCount);
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user?.profileData?._id);
    const user = useSelector((state) => state.auth?.userData?._id);

    useEffect(() => {
        setLocalSubscribersCount(subscribersCount);
        setLocalIsSubscribed(isSubscribed);
    }, [subscribersCount, isSubscribed]);

    const handleSubscribe = () => {
        dispatch(toggleSubscription(channelId));
        setLocalIsSubscribed((prev) => !prev);
        if (localIsSubscribed) {
            setLocalSubscribersCount((prev) => prev - 1);
        } else {
            setLocalSubscribersCount((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className="w-full text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <section className="w-full">
                    {coverImage ? (
                        <div className="relative overflow-hidden">
                            <img
                                src={coverImage}
                                className="sm:h-28 h-20 w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                    ) : (
                        <div className="sm:h-28 h-20 w-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-gray-700"></div>
                    )}
                </section>

                <section className="w-full sm:px-6 px-4 pb-4 flex flex-row items-start gap-3 sm:gap-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 -mt-8 sm:-mt-12 flex-shrink-0 z-10">
                        <img
                            src={avatar}
                            className="rounded-full w-full h-full object-cover ring-4 ring-purple-500/40 hover:ring-purple-500/70 transition-all duration-300 shadow-xl bg-gray-900"
                        />
                    </div>
                    <div className="flex-1 flex justify-between items-start pt-2 min-w-0">
                        <div className="space-y-1 sm:space-y-2 min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{fullName}</h1>
                            <h3 className="text-sm sm:text-base text-purple-400 font-medium truncate">
                                @{username}
                            </h3>
                            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm pt-1">
                                <p className="text-gray-300 flex items-center gap-1">
                                    <span className="text-purple-400 font-semibold">
                                        {localSubscribersCount || 0}
                                    </span>
                                    Subscribers
                                </p>
                                <p className="text-gray-300 flex items-center gap-1">
                                    <span className="text-purple-400 font-semibold">
                                        {subscribedCount || 0}
                                    </span>
                                    Subscribed
                                </p>
                            </div>
                        </div>
                        {user != userProfile && (
                            <Button
                                onClick={handleSubscribe}
                                className="border-slate-500 hover:scale-105 transition-all text-black font-bold px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-purple-500 rounded-lg ml-2 flex-shrink-0"
                            >
                                {localIsSubscribed ? "Subscribed" : "Subscribe"}
                            </Button>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

ChannelHeader.propTypes = {
    coverImage: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    subscribersCount: PropTypes.number,
    subscribedCount: PropTypes.number,
    isSubscribed: PropTypes.bool,
    channelId: PropTypes.string,
};

export default ChannelHeader;