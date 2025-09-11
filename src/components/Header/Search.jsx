import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "../icons";

function Search() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const search = (data) => {
        const query = data?.query?.trim();
        if (query) {
            navigate(`/search/${encodeURIComponent(query)}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(search)} className="relative w-full max-w-2xl">
                <Input
                    placeholder="Search videos, channels, playlists..."
                    className="w-full pr-12 pl-3 sm:pl-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border-2 border-gray-600/50 bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:bg-gray-800 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400 shadow-lg hover:border-gray-500/70 hover:bg-gray-800/70"
                    {...register("query", { required: true })}
                />
                <button
                    type="submit"
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 text-gray-400 hover:text-white hover:bg-purple-600 active:bg-purple-700 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation shadow-md hover:shadow-purple-500/25"
                >
                    <CiSearch size={18} className="sm:w-5 sm:h-5" />
                </button>
            </form>
        </>
    );
}

export default Search;