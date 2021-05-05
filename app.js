const vid = document.querySelector(".video");
const startElem = document.querySelector("button");
const stopElem = document.querySelector("stop");
var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: true
};
startElem.addEventListener("click", async function (evt) {
    startCapture();
    await vid.requestPictureInPicture();
}, false);

stopElem.addEventListener("click", function (evt) {
    stopCapture();
}, false);
async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

        vid.srcObject = captureStream;
        vid.onloadedmetadata = () => {
            vid.play();
        }

    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}