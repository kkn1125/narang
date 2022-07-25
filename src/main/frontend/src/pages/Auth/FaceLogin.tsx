import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { SettingsCellOutlined } from "@mui/icons-material";

let limitCount = 5;

function FaceLogin() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [processing, setProcessing] = useState(0);
  const [userName, setUserName] = useState("");
  const [target, setTarget] = useState(null);
  const count = useRef(0);

  const displayRef = useRef(null);
  const videoRef = useRef(null);

  const videoWidth = 560;
  const videoHeight = 360;

  const constraints = {
    video: {
      width: videoWidth,
      height: videoHeight,
    },
    audio: false,
  };

  useEffect(() => {
    setUserName("kimson");
  }, []);

  const loadImage = async () => {
    const labels = [userName];
    return Promise.all(
      labels.map(async (label) => {
        const images = await faceapi.fetchImage(
          require("../../users/me/[x]sample.jpg")
        );
        const descriptions = [];
        const detections = await faceapi
          .detectSingleFace(images)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  const handleOnVideo = () => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        // video 에서 로드된 이미지 매칭 시 아래 모델이 필요 함.
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
        startVideo();
      });
    };

    loadModels();
  };

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .catch((err) => console.error(err));
  };

  const updateCount = (num: number) => {
    setProcessing(num);
  };

  const clearCount = (num: number) => {
    setProcessing(num);
  };

  const onPlay = async (e: React.SyntheticEvent) => {
    // video loaded
    setModelsLoaded(true);

    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    displayRef.current.append(canvas);

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    faceapi.matchDimensions(canvas, displaySize);

    const faceDetecting = async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();
      // console.log(detections);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const labeledFaceDescriptors = await loadImage();
      // console.log(labeledFaceDescriptors);
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

      // console.log(faceMatcher);
      // console.log(resizedDetections);

      // const results = resizedDetections.map((d) =>
      //   faceMatcher.findBestMatch(d.descriptor)
      // );

      // results.forEach((result, i) => {
      const matched = resizedDetections[0];
      const box = matched.detection.box;
      const label = faceMatcher.findBestMatch(matched.descriptor).toString();
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: label,
      });

      drawBox.draw(canvas);
      // });

      return label;
    };

    const loop = () => {
      faceDetecting().then((label) => {
        if (label.match(userName)) {
          updateCount((count.current += 1));
        }

        // console.log(count.current);
        // console.log(label);

        if (count.current > limitCount) {
          setModelsLoaded(false);
          setCaptureVideo(false);
          clearCount(0);
          alert("로그인 되었습니다");
        } else {
          setTimeout(loop, 1);
        }
      });

      // 기본 안면 인식 테두리
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      // 감정 읽기
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    };

    setTimeout(loop, 1);
  };

  return (
    <div>
      <h2>face login</h2>
      {captureVideo && (
        <FaceDisplay ref={displayRef}>
          {!modelsLoaded && (
            <>
              <CircularProgress />
              <Typography>안면 인식 준비 중...</Typography>
            </>
          )}
          {modelsLoaded && (
            <>
              {(processing / limitCount) * 100} %
              <video
                ref={videoRef}
                width={560}
                height={350}
                autoPlay
                muted
                onPlay={onPlay}
              />
            </>
          )}
        </FaceDisplay>
      )}
      {!captureVideo && (
        <FaceDisplay ref={displayRef} width={560} height={350} />
      )}
      <Button
        onClick={() => {
          setCaptureVideo(!captureVideo);
          if (captureVideo) {
            setModelsLoaded(false);
          } else {
            handleOnVideo();
          }
        }}>
        Capture {captureVideo ? "off" : "on"}
      </Button>
      <input type='file' onChange={(e) => console.log(e.target.files)} />
    </div>
  );
}

const FaceDisplay = styled(Box)`
  position: relative;
  width: 560px;
  height: 350px;
  & video {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  & canvas {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;

export default FaceLogin;

/**
 * 인식 문제 이슈
 * 1. 리미트까지 퍼센트 출력
 * 2. 영상 안면 인식 시 라벨링 되지 않는 버그
 * 3. 비디오 히든 시 인식 안되는 오류
 * 4. 안면 인식 리미트 줄여야하나
 * 5. 안면 인식 turn on/off
 * 6. 자바스크립트 구문으로 파일 로드 후 매칭 이미지 등록 문제
 *  - input은 자동화가 아니여서 후보 제외
 *  - new File 사용 (파일 타입 일치하지 않아 후보 제외)
 *  - faceapi의 fetchImage 사용 (적합)
 */
