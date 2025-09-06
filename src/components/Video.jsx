import React from "react";

import PropTypes from 'prop-types';

function Video({ src, poster }) {

Video.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string
};
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="sm:h-[68vh] sm:max-w-4xl h-64 w-full object-contain"
            ></video>
        </>
    );
}

export default Video;
