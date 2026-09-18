import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateAvatar, updateCoverImg } from "../store/Slices/authSlice";
import GetImagePreview from "./GetImagePreview";
import PropTypes from "prop-types";

function EditAvatar({ cover, preImage, onClose }) {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const upload = (data) => {
        if (data && data.avatar?.[0]) {
            const formData = new FormData();
            formData.append(cover ? "coverImage" : "avatar", data.avatar[0]);
            if (cover) {
                dispatch(updateCoverImg(formData));
            } else {
                dispatch(updateAvatar(formData));
            }
        }
        if (onClose) onClose();
    };

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700/80 p-6 relative rounded-xl shadow-2xl w-full max-w-md">
                {/* Close button */}
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={() => onClose && onClose()}
                >
                    <MdClose size={22} />
                </button>

                {/* Content */}
                <h2 className="text-xl font-bold text-white mb-4">
                    Change {cover ? "Cover" : "Profile"} Picture
                </h2>
                <form onSubmit={handleSubmit(upload)}>
                    <div className="flex flex-col items-center">
                        <GetImagePreview
                            name={"avatar"}
                            control={control}
                            cameraIcon
                            cameraSize={30}
                            rules={{ required: "Avatar is required" }}
                            className={
                                "w-full h-full object-contain min-h-20 max-h-60 bg-gray-800 rounded-lg border border-gray-700"
                            }
                            image={preImage}
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 mt-5 rounded-lg w-full transition-colors cursor-pointer"
                        >
                            Upload
                        </button>
                    </div>
                    {errors.avatar && (
                        <span className="text-red-500 text-sm mt-2 block">
                            {errors.avatar.message}
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}

EditAvatar.propTypes = {
    cover: PropTypes.bool,
    preImage: PropTypes.string,
    onClose: PropTypes.func,
};

export default EditAvatar;