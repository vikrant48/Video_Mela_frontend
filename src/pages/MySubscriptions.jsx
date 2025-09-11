import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar, Container, HomeSkeleton } from "../components";

function MySubscriptions() {
    const dispatch = useDispatch();
    const subscriptions = useSelector(
        (state) => state.subscription?.mySubscriptions
    );
    const loading = useSelector((state) => state.subscription?.loading);
    const subscriberId = useSelector((state) => state.auth?.userData?._id);
    useEffect(() => {
        if (subscriberId) {
            dispatch(getSubscribedChannels(subscriberId));
        }
    }, [dispatch, subscriberId]);
    window.scrollTo(0, 0);

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center">
                    <HomeSkeleton />
                </div>
            </Container>
        );
    }
    
    return (
        <Container>
            <div className="flex gap-2 p-2 text-white items-center bg-[#222222] rounded-lg mb-4">
                {subscriptions?.map((subscription) => (
                    <div
                        key={subscription?.subscribedChannel?._id}
                        className="flex flex-col items-center "
                    >
                        <Avatar
                            src={subscription?.subscribedChannel?.avatar.url}
                            channelName={
                                subscription?.subscribedChannel?.username
                            }
                        />
                        <h5 className="text-xs">
                            {subscription?.subscribedChannel?.username}
                        </h5>
                    </div>
                ))}
            </div>

            <div className="text-white w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {subscriptions?.map((subscription) => (
                        <div key={subscription?.subscribedChannel?._id} className="group">
                            <Link
                                to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
                                className="block"
                            >
                                {subscription?.subscribedChannel?.latestVideo && (
                                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20">
                                        <VideoList
                                            key={subscription?.subscribedChannel?._id}
                                            avatar={
                                                subscription?.subscribedChannel?.avatar.url
                                            }
                                            duration={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?.duration
                                            }
                                            title={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?.title
                                            }
                                            thumbnail={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?.thumbnail?.url
                                            }
                                            createdAt={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?.createdAt
                                            }
                                            views={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?.views
                                            }
                                            channelName={
                                                subscription?.subscribedChannel?.username
                                            }
                                            videoId={
                                                subscription?.subscribedChannel?.latestVideo
                                                    ?._id
                                            }
                                        />
                                    </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default MySubscriptions;