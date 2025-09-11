import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideos } from "../store/Slices/videoSlice";
import { timeAgo } from "../helpers/timeAgo";
import { Spinner } from "./index";

function RecommendedVideos({ currentVideoId }) {
    const dispatch = useDispatch();
    const { videos, loading } = useSelector((state) => state.video);
    
    useEffect(() => {
        // Fetch recommended videos (excluding current video)
        dispatch(getAllVideos({ 
            sortBy: "views", 
            sortType: "desc", 
            limit: 12
        }));
    }, [dispatch]);

    // Filter out the current video from recommendations
    const recommendedVideos = videos?.docs?.filter(video => video._id !== currentVideoId) || [];

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-8">
                <Spinner width={8} />
            </div>
        );
    }

    return (
        <div className="w-full space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
                {recommendedVideos.slice(0, 8).map((video) => (
                    <Link
                        key={video._id}
                        to={`/watch/${video._id}`}
                        className="group flex gap-2.5 sm:gap-3 p-2.5 sm:p-3 hover:bg-gray-800/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-gray-700/50 active:bg-gray-700/60 active:scale-[0.98] touch-manipulation"
                    >
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0 w-32 h-20 sm:w-40 sm:h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-md sm:rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={video.thumbnail?.url}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = '/vite.svg'; // Fallback image
                                }}
                            />
                            {/* Duration overlay */}
                            {video.duration && (
                                <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/90 text-white text-xs px-1 py-0.5 sm:px-1.5 rounded shadow-lg">
                                    {Math.floor(video.duration / 60)}:{String(Math.floor(video.duration % 60)).padStart(2, '0')}
                                </div>
                            )}
                        </div>
                        
                        {/* Video Info */}
                        <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                            <h4 className="text-white text-xs sm:text-sm font-medium line-clamp-2 group-hover:text-purple-300 transition-colors leading-4 sm:leading-5">
                                {video.title}
                            </h4>
                            <p className="text-gray-400 text-xs hover:text-purple-400 transition-colors font-medium truncate">
                                {video.owner?.username}
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs">
                                <span className="flex items-center gap-1">
                                    <span className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0"></span>
                                    <span className="truncate">{video.views} views</span>
                                </span>
                                <span className="text-gray-600">•</span>
                                <span className="truncate">{video.createdAt ? timeAgo(video.createdAt) : 'Unknown date'}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecommendedVideos;