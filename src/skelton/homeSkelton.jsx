import React from 'react'

export default function HomeSkeleton() {
    const SkeletonCard = () => (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
            {/* Video thumbnail skeleton */}
            <div className="aspect-video bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse relative">
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    <div className="w-8 h-3 bg-gray-500 animate-pulse rounded"></div>
                </div>
            </div>
            
            {/* Video info skeleton */}
            <div className="p-4">
                <div className="flex gap-3">
                    {/* Avatar skeleton */}
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full animate-pulse flex-shrink-0"></div>
                    
                    {/* Text content skeleton */}
                    <div className="flex-1 space-y-2">
                        {/* Title skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded animate-pulse w-full"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded animate-pulse w-3/4"></div>
                        </div>
                        
                        {/* Channel name skeleton */}
                        <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse w-1/2"></div>
                        
                        {/* Views and date skeleton */}
                        <div className="flex gap-2">
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse w-16"></div>
                            <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }, (_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
}
