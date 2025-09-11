import React, { useEffect, useState } from "react";
import { Button, EditAvatar } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";

function ChannelHeader({
    coverImage,
    avatar,
    username,
    fullName,
    subscribersCount,
    subscribedCount,
    isSubscribed,
    channelId,
    edit,
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
                                className="sm:h-48 h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
                                    <EditAvatar
                                        cover={true}
                                        preImage={coverImage}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="sm:h-48 h-32 w-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-gray-700"></div>
                    )}
                </section>

                <section className="w-full sm:px-6 p-4 flex sm:flex-row flex-col items-start sm:gap-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
                    <div className="h-12">
                        <div className="relative sm:w-36 w-32 sm:h-36 h-32">
                            <img
                                src={avatar}
                                className="rounded-full sm:w-36 w-32 sm:h-36 h-32 object-cover absolute sm:bottom-12 bottom-24 ring-4 ring-purple-500/30 hover:ring-purple-500/60 transition-all duration-300"
                            />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-start bg-black/50 backdrop-blur-sm rounded-full">
                                    <EditAvatar preImage={avatar} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:h-28 sm:h-24 flex justify-between items-start px-1">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white">{fullName}</h1>
                            <h3 className="text-base text-purple-400 font-medium">
                                @{username}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm">
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
                        {user == userProfile && !edit && (
                            <Link to={"/edit"}>
                                <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                                    Edit
                                </Button>
                            </Link>
                        )}
                        {user != userProfile && !edit && (
                            <Button
                                onClick={handleSubscribe}
                                className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                            >
                                {localIsSubscribed ? "Subscribed" : "Subscribe"}
                            </Button>
                        )}
                        {edit && (
                            <Link to={`/channel/${username}`}>
                                <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                                    View Channel
                                </Button>
                            </Link>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default ChannelHeader;