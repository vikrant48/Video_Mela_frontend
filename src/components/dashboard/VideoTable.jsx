import React from "react";
import { ImBin, GrEdit } from "../../components/icons";
import TogglePublish from "../TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
    return (
        <>
            <section className="mx-auto w-full overflow-x-auto rounded-lg border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
                <table className="min-w-full">
                    <thead className="bg-gray-800/70">
                        <tr>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Toggle
                            </th>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Likes
                            </th>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="py-3 px-2 sm:px-4 border-b border-gray-700/50 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {videos?.map((video) => (
                            <tr key={video?._id} className="hover:bg-gray-800/50 transition-colors duration-200">
                                <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                                    <TogglePublish
                                        isPublished={video?.isPublished}
                                        videoId={video?._id}
                                    />
                                </td>
                                <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                                    {video?.isPublished ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-500/50">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-900/50 text-orange-400 border border-orange-500/50">
                                            Unpublished
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-2 sm:px-4 text-sm text-gray-300 max-w-xs">
                                    <div className="truncate" title={video?.title}>
                                        {video?.title}
                                    </div>
                                </td>
                                <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-900/50 text-purple-400 border border-purple-500/50">
                                        {video?.likesCount || 0} likes
                                    </span>
                                </td>
                                <td className="py-3 px-2 sm:px-4 whitespace-nowrap text-sm text-gray-400">
                                    {video?.createdAt?.day}/
                                    {video?.createdAt?.month}/
                                    {video?.createdAt?.year}
                                </td>
                                <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    editVideo: !prev.editVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                            className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            title="Edit video"
                                        >
                                            <GrEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    deleteVideo: !prev.deleteVideo,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                            title="Delete video"
                                        >
                                            <ImBin size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default VideoTable;