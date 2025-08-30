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
            <form onSubmit={handleSubmit(search)} className="relative">
                <Input
                    placeholder="Search videos..."
                    className="pr-10 rounded-full border-gray-600 focus:border-purple-500 transition-colors"
                    {...register("query", { required: true })}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                >
                    <CiSearch size={20} />
                </button>
            </form>
        </>
    );
}

export default Search;