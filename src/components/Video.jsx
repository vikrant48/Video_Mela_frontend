import PropTypes from 'prop-types';

function Video({ src, poster }) {

Video.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string
};
    return (
        <>
            <div className="relative w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-700/50 group">
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    controls
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                    className="w-full aspect-video object-contain bg-black rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 touch-manipulation"
                    style={{
                        maxHeight: 'calc(100vh - 120px)'
                    }}
                ></video>
            </div>
        </>
    );
}

export default Video;
