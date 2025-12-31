// Simple URL parameter reader
const Router = {
    getParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
};
