import PropTypes from "prop-types";
import { FaRegClock } from "react-icons/fa";

// Wraps a settings page whose options aren't implemented on the backend yet: shows it as a
// preview, disabled, so nobody believes their changes were saved.
function ComingSoon({ title, children }) {
    return (
        <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-lg border border-purple-500/40 bg-purple-500/10 p-4 text-white">
                <FaRegClock size={20} className="mt-0.5 flex-shrink-0 text-purple-400" />
                <div>
                    <p className="font-semibold">{title} settings are coming soon</p>
                    <p className="mt-1 text-sm text-gray-300">
                        This is a preview of what&apos;s planned. These options can&apos;t be changed yet.
                    </p>
                </div>
            </div>

            {/* inert: not clickable or focusable (keyboard included) and hidden from assistive tech */}
            <div inert="" className="pointer-events-none select-none opacity-50">
                {children}
            </div>
        </div>
    );
}

ComingSoon.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ComingSoon;
