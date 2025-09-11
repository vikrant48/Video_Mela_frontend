import React, { useState } from "react";
import { Button, Input2, UploadingVideo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../store/Slices/videoSlice";
import { IoCloseCircleOutline } from "./icons";
import GetImagePreview from "./GetImagePreview";

function UploadVideo({ setUploadVideoPopup }) {
    const [videoName, setVideoName] = useState("");
    const [videoSize, setVideoSize] = useState(0);
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.video.uploading);
    const uploaded = useSelector((state) => state.video.uploaded);

    const publishVideo = async (data) => {
        setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
        await dispatch(publishAvideo(data));
    };

    if (uploading) {
        return (
            <>
                <UploadingVideo
                    setUploadVideoPopup={setUploadVideoPopup}
                    videoFileName={videoName}
                    fileSize={videoSize}
                />
            </>
        );
    }

    if (uploaded) {
        return (
            <>
                <UploadingVideo
                    setUploadVideoPopup={setUploadVideoPopup}
                    videoFileName={videoName}
                    fileSize={videoSize}
                    uploaded={true}
                />
            </>
        );
    }

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50 p-4">
                <div className="relative w-full max-w-6xl h-[90vh] mx-auto text-white border border-gray-700/50 overflow-y-auto bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl">
                    <form
                        onSubmit={handleSubmit(publishVideo)}
                        className="space-y-5"
                    >
                        <section className="h-16 sticky top-0 z-50 border-b border-gray-700/50 w-full bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md flex justify-between items-center px-6 rounded-t-2xl">
                            <div className="flex gap-3 items-center">
                                <button
                                    type="button"
                                    className="p-2 hover:bg-gray-700/50 rounded-full transition-all duration-200 hover:scale-110"
                                    onClick={() =>
                                        setUploadVideoPopup((prev) => !prev)
                                    }
                                >
                                    <IoCloseCircleOutline
                                        size={24}
                                        className="text-gray-400 hover:text-white"
                                    />
                                </button>
                                <div>
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Upload Video</h3>
                                    <p className="text-xs text-gray-400">Share your content with the world</p>
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
                                    textColor="text-white"
                                    type="submit"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Publish
                                    </span>
                                </Button>
                            </div>
                        </section>

                        <section className="px-6 py-6">
                            <div className="w-full border-2 border-dashed border-gray-600/50 hover:border-purple-500/50 rounded-2xl h-72 p-6 flex flex-col gap-4 justify-center items-center text-center transition-all duration-300 bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:from-purple-900/20 hover:to-blue-900/20 backdrop-blur-sm relative">
                                <div className="space-y-3">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
                                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="font-semibold text-lg text-white mb-2">
                                            Drag and drop video files to upload
                                        </h1>
                                        <p className="text-sm text-gray-400">
                                            Your videos will be private until you publish them.
                                        </p>
                                    </div>
                                </div>
                                <label
                                    htmlFor="video-upload"
                                    className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Select Files
                                    </span>
                                </label>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    {...register("videoFile", {
                                        required: "VideoFile is required",
                                        onChange: (e) =>
                                            setVideoName(
                                                e.target.files[0]?.name
                                            ),
                                    })}
                                />
                                {videoName && (
                                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-gray-800/90 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
                                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-300 truncate">{videoName}</p>
                                                <p className="text-xs text-green-400">Ready to upload</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {errors.videoFile && (
                                    <span className="text-red-400 text-sm font-medium">
                                        {errors.videoFile?.message}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-5 mt-2 w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-10 justify-start items-start">
                                {/* THUMBNAIL */}
                                <div className="w-full">
                                    <GetImagePreview
                                        name="thumbnail"
                                        control={control}
                                        label="Thumbnail *"
                                        className={
                                            "w-full h-56 border object-contain"
                                        }
                                        cameraIcon={true}
                                        rules={{ required: "Thumbnail is required" }}
                                        cameraSize={40}
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors.thumbnail?.message}
                                    </span>
                                </div>

                                <div className="w-full">
                                    {/* TITLE */}
                                    <Input2
                                        type="text"
                                        label="Title *"
                                        className="mb-2"
                                        {...register("title", {
                                            required: "Title is required",
                                        })}
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors.title?.message}
                                    </span>

                                    {/* DESCRIPTION */}
                                    <div>
                                        <label>Description *</label>
                                        <textarea
                                            rows="5"
                                            className="focus:bg-[#222222] bg-transparent outline-none border w-full mt-1 p-1"
                                            {...register("description", {
                                                required:
                                                    "Description is required",
                                            })}
                                        ></textarea>
                                        <span className="text-red-500 text-xs">
                                            {errors.description?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UploadVideo;