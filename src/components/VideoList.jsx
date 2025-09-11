import React from "react";
import { formatDuration, timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";

function VideoList({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    videoId,
}) {
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };

    return (
        <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] touch-manipulation">
            <div
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => navigate(`/watch/${videoId}`)}
            >
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    
                    <span className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg">
                        {formatDuration(duration)}
                    </span>
                </div>
                
                <div className="p-3 sm:p-4 space-y-2">
                    <div className="flex items-start gap-3">
                        {avatar && (
                            <div 
                                onClick={handleAvatarClick}
                                className="flex-shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200 touch-manipulation"
                            >
                                <img
                                    src={avatar}
                                    alt={channelName}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-600/50 hover:border-purple-500/70 transition-all duration-200 shadow-md"
                                />
                            </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm sm:text-base leading-5 sm:leading-6 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
                                {title}
                            </h3>
                            
                            {channelName && (
                                <p className="text-gray-400 text-xs sm:text-sm mt-1 hover:text-purple-400 transition-colors duration-200 font-medium">
                                    {channelName}
                                </p>
                            )}
                            
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1.5 space-x-1.5">
                                <span className="font-medium">{views} views</span>
                                <span className="text-gray-600">•</span>
                                <span>{createdAt ? timeAgo(createdAt) : 'Unknown date'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;