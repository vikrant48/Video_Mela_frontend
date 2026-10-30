// Largest unit first, in seconds
const TIME_UNITS = [
    ["year", 365 * 24 * 60 * 60],
    ["month", 30 * 24 * 60 * 60],
    ["week", 7 * 24 * 60 * 60],
    ["day", 24 * 60 * 60],
    ["hour", 60 * 60],
    ["minute", 60],
];

// "1 day ago", "3 weeks ago", "1 year ago". Rounds down, so 18 months is "1 year ago".
export function timeAgo(createdAt) {
    const seconds = Math.abs(Date.now() - new Date(createdAt).getTime()) / 1000;

    for (const [unit, unitSeconds] of TIME_UNITS) {
        const value = Math.floor(seconds / unitSeconds);
        if (value >= 1) {
            return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
        }
    }
    return "just now";
}

export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}