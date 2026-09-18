import { useEffect } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const channel = useSelector((state) => state.user?.profileData);
    useEffect(() => {
        if (username && username !== "undefined") {
            dispatch(userChannelProfile(username));
        }
    }, [dispatch, username]);

    window.scrollTo(0, 0);

    return (
        <div className="w-full flex flex-col h-[calc(100vh-70px)] overflow-hidden">
            {/* Fixed Header & Navigation Tabs */}
            <div className="flex-shrink-0 sticky top-0 z-20 shadow-md">
                {channel && (
                    <ChannelHeader
                        username={username}
                        coverImage={channel?.coverImage?.url || channel?.coverImage}
                        avatar={channel?.avatar?.url || channel?.avatar}
                        subscribedCount={channel?.channelsSubscribedToCount}
                        fullName={channel?.fullName}
                        subscribersCount={channel?.subcribersCount}
                        isSubscribed={channel?.isSubscribed}
                        channelId={channel?._id}
                    />
                )}
                <ChannelNavigate username={username} />
            </div>

            {/* Scrollable Tab Data Content (Videos, Playlists, Tweets, etc.) */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0 custom-scrollbar">
                <Outlet />
            </div>
        </div>
    );
}

export default Channel;