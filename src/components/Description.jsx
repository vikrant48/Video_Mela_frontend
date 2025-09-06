import React, { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { Like, Button, AddToPlaylistModal } from "./index";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSubscription } from "../store/Slices/subscriptionSlice";
import { MdPlaylistAdd, MdDownload } from "react-icons/md";

function Description({
    title,
    views,
    createdAt,
    channelName,
    avatar,
    subscribersCount,
    likesCount,
    isSubscribed,
    description,
    isLiked,
    videoId,
    channelId,
    videoFile,
}) {
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const dispatch = useDispatch();

    const handleSubscribe = () => {
        dispatch(toggleSubscription(channelId));
        setLocalIsSubscribed((prev) => !prev);
        if (localIsSubscribed) {
            setLocalSubscribersCount((prev) => prev - 1);
        } else {
            setLocalSubscribersCount((prev) => prev + 1);
        }
    };

    const handleSubsribe = () => {};

    const handleDownload = async () => {
        if (videoFile) {
            try {
                // Create a safe filename with username and title
                const safeTitle = (title || 'video').replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
                const safeUsername = (channelName || 'unknown').replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
                const filename = `${safeUsername}_${safeTitle}.mp4`;
                
                // Fetch the video file
                const response = await fetch(videoFile);
                const blob = await response.blob();
                
                // Create download link
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.style.display = 'none';
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download failed:', error);
                alert('Failed to download video. Please try again.');
            }
        }
    };
    return (
        <>
            <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
                <div className="border-b border-slate-700">
                    <div className="space-y-2 mb-2">
                        <h1 className="sm:text-2xl font-semibold">{title}</h1>
                        <div className="flex items-center justify-between sm:justify-start sm:gap-5">
                            <div>
                                <span className="text-sm text-slate-400">
                                    {views} views .{" "}
                                </span>
                                <span className="text-sm text-slate-400">
                                    {createdAt ? timeAgo(createdAt) : 'Unknown date'}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <div className="rounded-full w-24 flex justify-center bg-[#222222] py-1">
                                    <Like
                                        isLiked={isLiked}
                                        videoId={videoId}
                                        likesCount={likesCount}
                                        size={25}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowPlaylistModal(true)}
                                    className="flex items-center gap-2 bg-[#222222] hover:bg-[#333333] px-3 py-1 rounded-full text-white transition-colors"
                                    title="Add to playlist"
                                >
                                    <MdPlaylistAdd size={20} />
                                    <span className="text-sm">Save</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 bg-[#222222] hover:bg-[#333333] px-3 py-1 rounded-full text-white transition-colors"
                                    title="Download video"
                                    disabled={!videoFile}
                                >
                                    <MdDownload size={20} />
                                    <span className="text-sm">Download</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Link
                                to={`/channel/${channelName}/videos`}
                                className="flex gap-2"
                            >
                                <img
                                    src={avatar}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h1 className="font-semibold">
                                        {channelName}
                                    </h1>
                                    <p className="text-xs text-slate-400">
                                        {localSubscribersCount} Subscribers
                                    </p>
                                </div>
                            </Link>
                            <div onClick={handleSubsribe}>
                                <Button
                                    onClick={handleSubscribe}
                                    className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                                >
                                    {localIsSubscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xs bg-[#222222] rounded-lg p-2 outline-none">
                    {description}
                </p>
            </section>
            
            {/* Add to Playlist Modal */}
            <AddToPlaylistModal
                isOpen={showPlaylistModal}
                onClose={() => setShowPlaylistModal(false)}
                videoId={videoId}
            />
        </>
    );
}

export default Description;