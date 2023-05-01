import { useRef, useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const videoRef: any = useRef(null);

  const captureImage = () => {
    const video: any = videoRef.current;
    const canvas: any = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL();
    setImage(dataUrl);
  };

  const constraints = {
    audio: false,
    video: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    })
    .catch((error) => console.error(error));

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={captureImage}>Capture Image</button>
      {image && <img src={image} alt="Captured Image" />}
    </div>
  );
}

export default App;
