import React, { useEffect } from "react";
import { Container, NoVideosFound, VideoList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../store/Slices/userSlice";
import HomeSkeleton from "../skelton/homeSkelton.jsx";

function History() {
    const loading = useSelector((state) => state.user?.loading);
    const videos = useSelector((state) => state.user?.history);
    const dispatch = useDispatch();
    window.scrollTo(0, 0);
    useEffect(() => {
        dispatch(getWatchHistory());
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />;
    }

    if (videos?.length == 0) {
        return <NoVideosFound />;
    }

    if (videos && videos.length > 0) {
        return (
            <>
                <Container>
                    <div className="text-white mb-20 sm:m-0 w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 p-6 bg-gradient-to-br from-gray-900/20 to-purple-900/10">
                        {videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.owner?.avatar.url}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.owner.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                </Container>
            </>
        );
    }
    return <></>;
}

export default History;