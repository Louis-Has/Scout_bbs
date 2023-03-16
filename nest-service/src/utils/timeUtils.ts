
export function currentTime() {
    return Date.now();
}

export function formatTime() {
    return new Date().toLocaleDateString().replace(/\//g, "-");
}