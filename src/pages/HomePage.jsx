import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container } from "../components";
import HomeSkeleton from "../skelton/homeSkelton.jsx";
import { Spinner } from "../components";

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos?.docs || []);
    const loading = useSelector((state) => state.video?.loading);
    const totalPages = useSelector((state) => state.video?.videos?.totalPages || 1);
    const currentPage = useSelector((state) => state.video?.videos?.page || 1);
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage || false);
    const totalDocs = useSelector((state) => state.video?.videos?.totalDocs || 0);

    const [page, setPage] = useState(1);
    const [fetchingMore, setFetchingMore] = useState(false);
    const isFetchingRef = useRef(false);

    // Initial fetch on component mount
    useEffect(() => {
        setPage(1);
        dispatch(getAllVideos({ page: 1, limit: 12 }));
        return () => dispatch(makeVideosNull());
    }, [dispatch]);

    // Scroll handler to detect when user reaches near bottom
    const handleScroll = useCallback(() => {
        const scrollableDiv = document.getElementById("scrollableDiv") || document.documentElement;
        const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;

        // Trigger next page fetch when user is within 300px of bottom
        if (
            scrollTop + clientHeight >= scrollHeight - 300 &&
            hasNextPage &&
            !loading &&
            !isFetchingRef.current
        ) {
            isFetchingRef.current = true;
            setFetchingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);

            dispatch(getAllVideos({ page: nextPage, limit: 12 }))
                .finally(() => {
                    isFetchingRef.current = false;
                    setFetchingMore(false);
                });
        }
    }, [hasNextPage, loading, page, dispatch]);

    // Attach scroll listener to #scrollableDiv
    useEffect(() => {
        const scrollableDiv = document.getElementById("scrollableDiv") || window;
        scrollableDiv.addEventListener("scroll", handleScroll);
        return () => scrollableDiv.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Show initial loading skeleton
    if (loading && videos.length === 0) {
        return (
            <Container>
                <HomeSkeleton />
            </Container>
        );
    }

    return (
        <Container>
            <div className="text-white w-full flex flex-col justify-between min-h-[calc(100vh-60px)] pt-4 pb-12 relative">
                {/* Videos Grid - 4 per row on desktop */}
                {videos && videos.length > 0 ? (
                    <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 p-4 sm:p-6 bg-gradient-to-br from-gray-900/20 to-purple-900/10 rounded-2xl">
                        {videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.ownerDetails?.avatar.url}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.ownerDetails?.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="text-lg font-medium">No videos found.</p>
                    </div>
                )}

                {/* Additional loading skeleton cards during infinite scroll fetch */}
                {fetchingMore && (
                    <div className="w-full mt-6">
                        <HomeSkeleton />
                    </div>
                )}

                {/* Sleek Floating Page Indicator Pill (YouTube style) */}
                <div className="sticky bottom-4 z-40 flex justify-center w-full mt-8 pointer-events-none">
                    <div className="bg-gray-900/90 border border-purple-500/40 text-xs sm:text-sm text-gray-200 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-auto transition-all duration-300 transform hover:scale-105">
                        {fetchingMore ? (
                            <>
                                <Spinner />
                                <span className="text-purple-300 font-semibold animate-pulse">Loading more videos...</span>
                            </>
                        ) : hasNextPage ? (
                            <>
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                <span>
                                    Page <strong className="text-purple-400">{currentPage}</strong> of <strong>{totalPages}</strong> ({videos.length} / {totalDocs} loaded)
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                                <span className="text-purple-400 font-bold">✓</span> All {totalDocs} videos loaded
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default HomePage;