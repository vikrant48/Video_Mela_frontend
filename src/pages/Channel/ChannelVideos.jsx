import React, { useEffect, useState } from "react";
import { NoVideosFound, VideoList, Container, HomeSkeleton } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../store/Slices/videoSlice";

function ChannelVideos() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.profileData?._id);
    const videos = useSelector((state) => state.video?.videos?.docs);
    const loading = useSelector((state) => state.video?.loading);
    const [searchParams, setSearchParams] = useState();
    const [activeButton, setActiveButton] = useState("button1");

    useEffect(() => {
        const sortBy = searchParams?.sortBy;
        const sortType = searchParams?.sortType;
        dispatch(getAllVideos({ userId, sortBy, sortType }));

        return () => dispatch(makeVideosNull());
    }, [dispatch, userId, searchParams]);

    if (loading) {
        return <HomeSkeleton />;
    }

    if (videos?.length == 0) {
        return <NoVideosFound />;
    }

    const handleSort = (sortBy, sortType = "asc") => {
        setSearchParams({ sortBy, sortType });
    };

    return (
        <Container>
            {/* For sorting latest, popular and oldest videos */}
            <div className="w-full p-4 text-white flex gap-4 mb-4">
                <button
                    onClick={() => {
                        setActiveButton("button1");
                        handleSort("createdAt", "desc");
                    }}
                    className={`group py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        activeButton === "button1"
                            ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                    }`}
                >
                    Latest
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button2");
                        handleSort("views", "desc");
                    }}
                    className={`group py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        activeButton === "button2"
                            ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                    }`}
                >
                    Popular
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button3");
                        handleSort("createdAt", "asc");
                    }}
                    className={`group py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        activeButton === "button3"
                            ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                    }`}
                >
                    Oldest
                </button>
            </div>
            {/* Video listing */}
            <div className="text-white w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 p-6 bg-gradient-to-br from-gray-900/20 to-purple-900/10">
                {videos?.map((video) => (
                    <VideoList
                        key={video._id}
                        avatar={video.ownerDetails?.avatar?.url}
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
        </Container>
    );
}

export default ChannelVideos;