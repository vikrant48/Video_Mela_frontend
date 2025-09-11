import React, { useEffect } from "react";
import Input2 from "./Input2";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateAVideo, updateUploadState } from "../store/Slices/videoSlice";
import Spinner from "./Spinner";
import GetImagePreview from "./GetImagePreview";

function EditVideo({
    videoId,
    title,
    description,
    setEditVideoPopup,
    thumbnail,
}) {
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
    } = useForm();
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.video.uploading);

    const handleClosePopUp = () => {
        setEditVideoPopup((prev) => ({
            ...prev,
            uploadVideo: false,
            editVideo: false,
        }));
    };

    const updateVideo = async (data) => {
        await dispatch(updateAVideo({ videoId, data }));
        setEditVideoPopup((prev) => ({
            ...prev,
            uploadVideo: false,
            editVideo: false,
        }));
        dispatch(updateUploadState());
    };

    useEffect(() => {
        setValue("title", title);
        setValue("description", description);
    }, [title, description, setValue]);

    if (uploading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50">
                <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 text-white">
                    <Spinner />
                    <span className="text-lg font-semibold">Updating video...</span>
                    <p className="text-sm text-gray-400">Please wait while we save your changes</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50 p-4">
            <form
                onSubmit={handleSubmit(updateVideo)}
                className="relative w-full max-w-5xl h-[85vh] mx-auto text-white border border-gray-700/50 overflow-y-auto bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl"
            >
                {/* Header */}
                <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700/50 px-6 py-4 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Video
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Update your video details and thumbnail
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleClosePopUp}
                            className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200 text-gray-400 hover:text-white"
                        >
                            <IoCloseCircleOutline size={28} />
                        </button>
                    </div>
                </div>
                    <div className="p-2 grid lg:grid-cols-2 grid-cols-1 gap-5 z-40">
                        <div>
                            <GetImagePreview
                                name={"thumbnail"}
                                control={control}
                                label={"Thumbnail: "}
                                cameraIcon
                                cameraSize={30}
                                rules={{ required: "Thumbnail is required" }}
                                className={
                                    "object-contain w-full min-w-xl h-72 min-h-32"
                                }
                                image={thumbnail}
                            />
                            <span className="text-red-500 text-xs">
                                {errors.thumbnail?.message}
                            </span>
                        </div>

                        <div className="flex flex-col justify-between sm:gap-0 gap-2">
                            <Input2
                                type="text"
                                label="Title *"
                                // value={title}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            <span className="text-red-500 text-xs">
                                {errors.title?.message}
                            </span>
                            <div className="mb-4">
                                <label>Description *</label>
                                <textarea
                                    rows="4"
                                    className="focus:bg-[#222222] text-sm overflow-y-scroll bg-transparent outline-none border w-full mt-1 p-1"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                ></textarea>
                                <span className="text-red-500 text-xs">
                                    {errors.description?.message}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 border p-2"
                                    onClick={handleClosePopUp}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-purple-500 p-2 font-bold"
                                    textColor="text-black"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    );
}

export default EditVideo;