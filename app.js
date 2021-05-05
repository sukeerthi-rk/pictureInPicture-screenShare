const vid = document.querySelector(".video");
const startElem = document.querySelector(".button");
const stopElem = document.querySelector(".stop");
const popElem = document.querySelector(".popout");
var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: true
};
startElem.addEventListener("click", function (evt) {
    startCapture();
}, false);

stopElem.addEventListener("click", function (evt) {
    stopCapture();
}, false);
async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        vid.setAttribute("vid", "hidden=false");
        vid.srcObject = captureStream;
        vid.onloadedmetadata = () => {
            vid.play();
        }

    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}
function stopCapture(evt) {
    let tracks = vid.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    vid.srcObject = null;
}

popElem.addEventListener("click", async () => {
    await vid.requestPictureInPicture();
})