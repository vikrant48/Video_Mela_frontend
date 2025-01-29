import React from "react";
import { IoIosVideocam } from "react-icons/io";
import { Link } from "react-router-dom";

function Logo({ size = "40" }) {
    return (
        <>
            <Link to={'/'} className="flex gap-2 items-center">
                <IoIosVideocam
                    size={size}
                    color="#A855F7"
                />
                <span className="font-extrabold text-xl text-white">VideoMela</span>
            </Link>
        </>
    );
}

export default Logo;