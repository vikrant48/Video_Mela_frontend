import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const NoVideosFound = ({ text }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center text-white py-16 sm:py-24">
            <FaPlayCircle
                size={48}
                className="text-purple-500/80 mb-3"
            />
            <p className="text-lg font-medium text-gray-200">There are no videos available here.</p>
            {text && <p className="mt-1 text-sm text-gray-400">{text}</p>}
        </div>
    );
};

export default NoVideosFound;