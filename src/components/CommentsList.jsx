import React, { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "./index";
import { HiOutlineDotsVertical } from "./icons";
import { deleteAComment, editAComment } from "../store/Slices/commentSlice";

function CommentsList({
    avatar,
    username,
    createdAt,
    content,
    commentId,
    isLiked,
    likesCount,
}) {
    const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const dispatch = useDispatch();

    const [editState, setEditState] = useState({
        editing: false,
        editedContent: content,
        isOpen: false,
        delete: false,
    });

    const handleEditComment = (editedContent) => {
        console.log(editedContent);
        dispatch(editAComment({ commentId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
        }));
    };

    const handleDeleteComment = () => {
        dispatch(deleteAComment(commentId));
        setEditState((prevState) => ({
            ...prevState,
            delete: false,
        }));
    };

    return (
        <>
            <div className="text-white w-full flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-gray-800/30 hover:bg-gray-800/50 active:bg-gray-800/60 rounded-lg border border-gray-700/50 transition-all duration-200 touch-manipulation">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img
                        src={avatar || avatar2}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full ring-2 ring-gray-600 hover:ring-purple-500 transition-all shadow-md"
                        alt={username}
                    />
                </div>
                
                {/* Comment Content */}
                <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                    {/* Header with username, time, and options */}
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors truncate">
                                {username}
                            </h3>
                            <span className="text-xs text-gray-400 flex-shrink-0">
                                {createdAt ? timeAgo(createdAt) : 'Unknown date'}
                            </span>
                        </div>

                        {/* Options dropdown for comment owner */}
                        {authUsername === username && (
                            <div className="relative flex-shrink-0">
                                <button
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            isOpen: !prevState.isOpen,
                                        }))
                                    }
                                    className="p-2 rounded-full hover:bg-gray-700 active:bg-gray-600 transition-colors touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                                >
                                    <HiOutlineDotsVertical className="text-gray-400 hover:text-white transition-colors" size={16} />
                                </button>

                                {editState.isOpen && (
                                    <div className="absolute right-0 top-10 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20 min-w-[120px] backdrop-blur-sm">
                                        <ul className="py-1">
                                            <li>
                                                <button
                                                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-700 active:bg-gray-600 transition-colors touch-manipulation flex items-center gap-2"
                                                    onClick={() =>
                                                        setEditState((prevState) => ({
                                                            ...prevState,
                                                            editing: !prevState.editing,
                                                            isOpen: false,
                                                        }))
                                                    }
                                                >
                                                    <span>✏️</span>
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 active:bg-gray-600 transition-colors touch-manipulation flex items-center gap-2"
                                                    onClick={() =>
                                                        setEditState((prevState) => ({
                                                            ...prevState,
                                                            delete: true,
                                                            isOpen: false,
                                                        }))
                                                    }
                                                >
                                                    <span>🗑️</span>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Comment text or edit form */}
                    <div className="space-y-2 sm:space-y-3">
                        {editState.editing ? (
                            <Edit
                                initialContent={editState.editedContent}
                                onCancel={() =>
                                    setEditState((prevState) => ({
                                        ...prevState,
                                        editing: false,
                                        isOpen: false,
                                    }))
                                }
                                onSave={handleEditComment}
                            />
                        ) : (
                            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
                                {editState.editedContent}
                            </p>
                        )}

                        {/* Like button */}
                        <div className="flex items-center pt-1">
                            <Like
                                isLiked={isLiked}
                                likesCount={likesCount}
                                commentId={commentId}
                                size={16}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {editState.delete && (
                <DeleteConfirmation
                    onCancel={() =>
                        setEditState((prevState) => ({
                            ...prevState,
                            delete: false,
                            isOpen: false,
                        }))
                    }
                    onDelete={handleDeleteComment}
                    comment={true}
                />
            )}
        </>
    );
}

export default CommentsList;