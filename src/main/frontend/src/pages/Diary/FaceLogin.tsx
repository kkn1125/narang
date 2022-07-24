import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function FaceLogin() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const container = useRef(null);
  const findRef = useRef(null);
  const videoRef = useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;
  let canvasRef = useRef(null);

  const constraints = {
    video: {
      width: videoWidth,
    },
    audio: false,
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .catch((err) => console.error(err));
  };

  return <div>face login</div>;
}

export default FaceLogin;
