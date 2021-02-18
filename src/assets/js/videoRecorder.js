const recordContainer = document.querySelector("#jsRecordContainer");

function init() {
  const videoPreview = recordContainer.querySelector("#jsVideoPreview");
  const recordBtn = recordContainer.querySelector("#jsRecordBtn");
  let stream;
  let videoRecorder;
  const getRecord = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 },
      });
      videoPreview.srcObject = stream;
      videoPreview.muted = true;
      videoPreview.play();
      recordBtn.innerHTML = `⛔ Stop Recording`;
      startRecording();
    } catch (error) {
      recordBtn.innerHTML = `❌ ${error}`;
    }
  };
  const startRecording = () => {
    recordBtn.removeEventListener("click", getRecord);
    recordBtn.addEventListener("click", stopRecording);
    videoRecorder = new MediaRecorder(stream);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
  };
  const stopRecording = () => {
    videoRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    recordBtn.innerHTML = `🎬 Start Recording`;
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getRecord);
  };
  function handleVideoData(event) {
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
  }
  // main
  recordBtn.addEventListener("click", getRecord);
}

if (recordContainer) {
  init();
}
