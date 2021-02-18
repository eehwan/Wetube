const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
}

function init() {
  videoPlayer.volume = 0.5;
  videoPlayer.addEventListener("ended", handleEnded);
}

if (videoContainer) {
  init();
}
