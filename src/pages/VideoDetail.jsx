import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import {
    CommentList,
    TweetAndComment,
    Video,
    Description,
    Spinner,
    InfiniteScroll,
    Navbar,
    RecommendedVideos,
} from "../components";
import {
    cleanUpComments,
    getVideoComments,
} from "../store/Slices/commentSlice";

function VideoDetail() {
    const dispatch = useDispatch();
    const { videoId } = useParams();
    const video = useSelector((state) => state.video?.video);
    const comments = useSelector((state) => state.comment?.comments);
    const totalComments = useSelector((state) => state.comment?.totalComments);
    const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
    const loading = useSelector((state) => state.comment?.loading);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (videoId) {
            dispatch(getVideoById({ videoId }));
            dispatch(getVideoComments({ videoId }));
        }

        return () => dispatch(cleanUpComments());
    }, [dispatch, videoId]);

    const fetchMoreComments = useCallback(() => {
        if (!loading && hasNextPage) {
            dispatch(getVideoComments({ videoId, page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, [page, loading, hasNextPage, dispatch, videoId]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900">
                <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 max-w-[1400px] mx-auto">
                    {/* Main Video Content */}
                    <div className="flex-1 xl:max-w-4xl space-y-3 sm:space-y-4 lg:space-y-6">
                    <Video
                        src={video?.videoFile?.url}
                        poster={video?.thumbnail?.url}
                    />
                    <Description
                        avatar={video?.owner?.avatar.url}
                        channelName={video?.owner?.username}
                        createdAt={video?.createdAt}
                        description={video?.description}
                        isSubscribed={video?.owner?.isSubscribed}
                        likesCount={video?.likesCount}
                        subscribersCount={video?.owner?.subscribersCount}
                        title={video?.title}
                        views={video?.views}
                        key={video?._id}
                        isLiked={video?.isLiked}
                        videoId={video?._id}
                        channelId={video?.owner?._id}
                        videoFile={video?.videoFile?.url}
                    />
                        {/* Comments Section */}
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-3 sm:p-4 lg:p-6 shadow-lg">
                            <div className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                <span className="text-purple-400 font-bold">{totalComments}</span>
                                <span>Comments</span>
                            </div>
                            
                            <TweetAndComment
                                comment={true}
                                videoId={video?._id}
                            />
                            
                            <InfiniteScroll
                                fetchMore={fetchMoreComments}
                                hasNextPage={hasNextPage}
                            >
                                <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                                    {comments?.map((comment) => (
                                        <CommentList
                                            key={comment?._id}
                                            avatar={comment?.owner?.avatar?.url}
                                            commentId={comment?._id}
                                            content={comment?.content}
                                            createdAt={comment?.createdAt}
                                            fullName={comment?.owner?.fullName}
                                            isLiked={comment?.isLiked}
                                            likesCount={comment?.likesCount}
                                            username={comment?.owner?.username}
                                        />
                                    ))}
                                    {loading && (
                                        <div className="w-full flex justify-center items-center py-6 sm:py-8">
                                            <Spinner width={10} />
                                        </div>
                                    )}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                    
                    {/* Recommended Videos Sidebar */}
                    <div className="xl:w-96 xl:flex-shrink-0">
                        <div className="sticky top-16 sm:top-20">
                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-3 sm:p-4 shadow-lg">
                                <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                    <span>Recommended Videos</span>
                                </h3>
                                <RecommendedVideos currentVideoId={videoId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoDetail;