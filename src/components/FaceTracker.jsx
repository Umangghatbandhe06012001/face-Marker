import { useEffect, useRef, useState } from 'react';
import useScript from '../utils/useScript';
import RecordButton from './RecordButton';

export default function FaceTracker() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const faceMeshLoaded = useScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');

  useEffect(() => {
    if (!faceMeshLoaded) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    let stream;

    async function setup() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      const faceMesh = new window.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
          for (const face of results.multiFaceLandmarks) {
            for (const point of face) {
              ctx.beginPath();
              ctx.arc(point.x * canvas.width, point.y * canvas.height, 2, 0, 2 * Math.PI);
              ctx.fillStyle = 'red';
              ctx.fill();
            }
          }
        }
      });

      const detect = async () => {
        await faceMesh.send({ image: video });
        requestAnimationFrame(detect);
      };

      detect();
    }

    setup();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [faceMeshLoaded]);

   const handleStartRecording = () => {
    const canvas = canvasRef.current;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];
    setRecordedChunks([]); // clear old data

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });

      const reader = new FileReader();
reader.onloadend = () => {
  const base64data = reader.result;
  const prevVideos = JSON.parse(localStorage.getItem('recordedVideos') || '[]');
  localStorage.setItem('recordedVideos', JSON.stringify([...prevVideos, base64data]));
};
reader.readAsDataURL(blob);

      setRecordedChunks([]);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };;

  

  

  return (
    <div className="relative w-[800px] h-[500px] rounded-[25px] overflow-hidden max-[768px]:!w-[100%] !h-[350px]">
      <video ref={videoRef} className="absolute w-full h-full " autoPlay muted playsInline />
      <canvas ref={canvasRef} className="absolute w-full h-full z-10" />
        <div className="absolute bottom-4 left-1/2 top-6/7 transform -translate-x-1/2 flex gap-4 z-20 w-[50px] h-[50px] bg-[white] flex justify-center items-center rounded-full max-[768px]:!w-[40px] !h-[40px]" onClick={handleStartRecording}>
       
         
        <RecordButton onStart={handleStartRecording} onStop={handleStopRecording} />

      </div>
      

        
    </div>
  );
}
