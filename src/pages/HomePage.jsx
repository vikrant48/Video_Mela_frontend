import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container } from "../components";
import HomeSkeleton from "../skelton/homeSkelton.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos?.docs);
    const loading = useSelector((state) => state.video?.loading);
    const hasNextPage = useSelector(
        (state) => state.video?.videos?.hasNextPage
    );
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 12 }));

        return () => dispatch(makeVideosNull());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1, limit: 12 }))
                .then(() => {
                    setPage((prev) => prev + 1);
                })
                .catch((error) => {
                    console.error("Error loading more videos:", error);
                    setIsLoading(false);
                });
        }
    }, [page, hasNextPage, dispatch]);

    // Show skeleton during initial loading
    if (loading && (!videos || videos.length === 0)) {
        return (
            <Container>
                <HomeSkeleton />
            </Container>
        );
    }

    return (
        <Container>
            <InfiniteScroll
                dataLength={videos?.length || 0}
                next={fetchMoreVideos}
                hasMore={hasNextPage}
                loader={<div className="w-full flex justify-center py-4"><HomeSkeleton /></div>}
                className="mt-0"
            >
                <div className="text-white w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 p-6 bg-gradient-to-br from-gray-900/20 to-purple-900/10">
                    {videos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.ownerDetails?.avatar.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </Container>
    );
}

export default HomePage;