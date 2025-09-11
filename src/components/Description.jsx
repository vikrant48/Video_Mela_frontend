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
            <section className="w-full text-white bg-gray-900/50 rounded-xl border border-gray-800 p-4 md:p-6 space-y-4">
                <div className="border-b border-gray-700 pb-4">
                    <div className="space-y-4">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight">{title}</h1>
                        
                        {/* Views and Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-purple-400 font-medium">{views}</span>
                                <span>views</span>
                                <span>•</span>
                                <span>{createdAt ? timeAgo(createdAt) : 'Unknown date'}</span>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                                <div className="bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 transition-all duration-200">
                                    <Like
                                        isLiked={isLiked}
                                        videoId={videoId}
                                        likesCount={likesCount}
                                        size={20}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowPlaylistModal(true)}
                                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 hover:scale-105 px-4 py-2 rounded-full text-white transition-all duration-200"
                                    title="Add to playlist"
                                >
                                    <MdPlaylistAdd size={18} />
                                    <span className="text-sm font-medium hidden xs:inline">Save</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 hover:scale-105 px-4 py-2 rounded-full text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Download video"
                                    disabled={!videoFile}
                                >
                                    <MdDownload size={18} />
                                    <span className="text-sm font-medium hidden xs:inline">Download</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Channel Info and Subscribe */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                            <Link
                                to={`/channel/${channelName}/videos`}
                                className="flex items-center gap-3 hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-colors group"
                            >
                                <img
                                    src={avatar}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-purple-500 transition-all"
                                    alt={channelName}
                                />
                                <div>
                                    <h2 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                        {channelName}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        <span className="text-purple-400 font-medium">{localSubscribersCount}</span> Subscribers
                                    </p>
                                </div>
                            </Link>
                            
                            <Button
                                onClick={handleSubscribe}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${
                                    localIsSubscribed 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg'
                                }`}
                            >
                                {localIsSubscribed ? "Subscribed" : "Subscribe"}
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Description */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {description || 'No description available.'}
                    </p>
                </div>
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