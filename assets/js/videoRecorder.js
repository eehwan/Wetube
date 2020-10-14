const recordContainer = document.querySelector("#jsRecordContainer");

function init() {
  const videoPreview = recordContainer.querySelector("#jsVideoPreview");
  const recordBtn = recordContainer.querySelector("#jsRecordBtn");
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 },
      });
      videoPreview.srcObject = stream;
      videoPreview.muted = true;
      videoPreview.play();
    } catch (error) {
      recordBtn.innerHTML = `❌ ${error}`;
      // recordBtn.innerHTML = "❌ Can't Record";
      // recordBtn.removeEventListener("click", startRecording);
    }
  };

  // main
  recordBtn.addEventListener("click", startRecording);
}

if (recordContainer) {
  init();
}
