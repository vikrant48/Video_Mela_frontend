import React, { useEffect, useState } from "react"
import {
    Container,
    DeleteConfirmation,
    HeaderSection,
    Navbar,
    Spinner,
    StatsSection,
    VideoTable,
    EditVideo,
    UploadVideo,
} from "../components";
import Sidebar from "../components/Header/Sidebar.jsx"
import { useDispatch, useSelector } from "react-redux"
import { getChannelStats, getChannelVideos } from "../store/Slices/dashboardSlice.js"
import { deleteAVideo } from "../store/Slices/videoSlice.js"
import HomeSkeleton from "../skelton/homeSkelton.jsx";

function AdminDashboard() {
    const username = useSelector((state) => state.auth.userData?.username)
    const dashboard = useSelector((state) => state.dashboard.channelStats)
    const videos = useSelector((state) => state.dashboard.channelVideos)
    const uploaded = useSelector((state) => state.video.uploaded)
    const publishToggled = useSelector((state) => state.video.publishToggled)
    const deleting = useSelector((state) => state.video.loading)
    const loading = useSelector((state) => state.user?.loading)

    const dispatch = useDispatch();
    const [videoDetails, setVideoDetails] = useState(null);
    const [popUp, setPopUp] = useState({
        uploadVideo: false,
        editVideo: false,
        deleteVideo: false,
    });

    const handleDeleteVideo = async () => {
        dispatch(deleteAVideo(videoDetails?._id));
        setPopUp((prev) => ({
            ...prev,
            deleteVideo: !prev.deleteVideo,
        }));
    };

    useEffect(() => {
        dispatch(getChannelStats());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getChannelVideos());
    }, [dispatch, uploaded, publishToggled, deleting])

    window.scrollTo(0, 0)

    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <>
            {/* <Navbar />
            <Sidebar/>
            <Container>
                <div className=" w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">
                    {popUp.uploadVideo && (
                        <UploadVideo setUploadVideoPopup={setPopUp} />
                    )}

                    {popUp.editVideo && (
                        <div className="w-full flex justify-center top-24 fixed z-20">
                            <EditVideo
                                setEditVideoPopup={setPopUp}
                                title={videoDetails?.title}
                                description={videoDetails?.description}
                                videoId={videoDetails?._id}
                            />
                        </div>
                    )}

                    {popUp.deleteVideo && (
                        <div className="w-full fixed top-52 flex justify-center z-20">
                            <DeleteConfirmation
                                video={true}
                                onCancel={() =>
                                    setPopUp((prev) => ({
                                        ...prev,
                                        deleteVideo: !prev.deleteVideo,
                                    }))
                                }
                                onDelete={handleDeleteVideo}
                            />
                        </div>
                    )}

                    {deleting && (
                        <div className="w-full fixed top-20 flex justify-center z-20">
                            <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                                <Spinner />
                                <span className="text-md font-bold">
                                    Deleting video...
                                </span>
                            </div>
                        </div>
                    )}

                    <HeaderSection
                        username={username}
                        setPopUp={setPopUp}
                    />

                    <StatsSection dashboard={dashboard} />

                    <VideoTable
                        videos={videos}
                        setPopUp={setPopUp}
                        setVideoDetails={setVideoDetails}
                    />
                </div>
            </Container> */}
            <Navbar />
            <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Sidebar className="hidden sm:block flex-shrink-0" />
                
                <main className="flex-1 overflow-y-auto">
                    <div className="min-h-screen bg-gray-900/50 backdrop-blur-sm">
                        <Container>
                            <div className="w-full relative text-white space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                            {popUp.uploadVideo && (
                                <UploadVideo setUploadVideoPopup={setPopUp} />
                            )}

                            {popUp.editVideo && (
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                    <div className="w-full max-w-2xl">
                                        <EditVideo
                                            setEditVideoPopup={setPopUp}
                                            title={videoDetails?.title}
                                            description={videoDetails?.description}
                                            videoId={videoDetails?._id}
                                        />
                                    </div>
                                </div>
                            )}

                            {popUp.deleteVideo && (
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                    <DeleteConfirmation
                                        video={true}
                                        onCancel={() =>
                                            setPopUp((prev) => ({
                                                ...prev,
                                                deleteVideo: !prev.deleteVideo,
                                            }))
                                        }
                                        onDelete={handleDeleteVideo}
                                    />
                                </div>
                            )}

                            {deleting && (
                                <div className="fixed top-4 right-4 z-50">
                                    <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl p-4 flex items-center gap-3 min-w-64">
                                        <Spinner />
                                        <span className="text-sm font-medium text-white">
                                            Deleting video...
                                        </span>
                                    </div>
                                </div>
                            )}

                            <HeaderSection
                                username={username}
                                setPopUp={setPopUp}
                            />

                            <StatsSection dashboard={dashboard} />

                            <VideoTable
                                videos={videos}
                                setPopUp={setPopUp}
                                setVideoDetails={setVideoDetails}
                            />
                            </div>
                        </Container>
                    </div>
                </main>
            </div>
        </>
    );
}

export default AdminDashboard;