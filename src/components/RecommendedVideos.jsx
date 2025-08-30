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
            limit: 10 
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
        <div className="w-full">
            <h3 className="text-white text-lg font-semibold mb-4 px-2">
                Recommended Videos
            </h3>
            <div className="space-y-3">
                {recommendedVideos.slice(0, 8).map((video) => (
                    <Link
                        key={video._id}
                        to={`/watch/${video._id}`}
                        className="flex gap-3 p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    >
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-40 h-24 bg-gray-700 rounded-lg overflow-hidden">
                            <img
                                src={video.thumbnail?.url}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/vite.svg'; // Fallback image
                                }}
                            />
                        </div>
                        
                        {/* Video Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                                {video.title}
                            </h4>
                            <p className="text-gray-400 text-xs mb-1">
                                {video.owner?.username}
                            </p>
                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                <span>{video.views} views</span>
                                <span>•</span>
                                <span>{video.createdAt ? timeAgo(video.createdAt) : 'Unknown date'}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecommendedVideos;