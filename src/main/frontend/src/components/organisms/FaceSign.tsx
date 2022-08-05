import {
  createCanvasFromMedia,
  detectAllFaces,
  detectSingleFace,
  draw,
  FaceMatcher,
  fetchImage,
  LabeledFaceDescriptors,
  matchDimensions,
  nets,
  resizeResults,
  TinyFaceDetectorOptions,
} from "face-api.js";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";

let limitCount = 5;

let localStream: any;

interface FaceSignProps {
  test?: boolean;
  modelsLoaded?: boolean;
  setModelsLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  processing?: number;
  setProcessing?: React.Dispatch<React.SetStateAction<number>>;
}

function FaceSign({
  test,
  modelsLoaded,
  setModelsLoaded,
  processing,
  setProcessing,
}: FaceSignProps) {
  const [captureVideo, setCaptureVideo] = useState(true);
  const [userName, setUserName] = useState("");
  const [target, setTarget] = useState(null);
  const count = useRef(0);

  const displayRef = useRef(null);
  const videoRef = useRef(null);

  const videoWidth = 560;
  const videoHeight = 360;

  const constraints = {
    video: captureVideo
      ? {
          width: videoWidth,
          height: videoHeight,
        }
      : false,
    audio: false,
  };

  useEffect(() => {
    setUserName("kimson");
    handleOnVideo();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track: any) => {
          track.stop();
        });
        setCaptureVideo(false);
      }
    };
  }, []);

  const loadImage = async () => {
    const labels = [userName];
    return Promise.all(
      labels.map(async (label) => {
        const images = await fetchImage(
          require("../../users/me/[x]sample.jpg")
        );
        const descriptions = [];
        const detections = await detectSingleFace(images)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  const handleOnVideo = () => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        nets.faceExpressionNet.loadFromUri(MODEL_URL),
        // video 에서 로드된 이미지 매칭 시 아래 모델이 필요 함.
        nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded?.(true);
        startVideo();
      });
    };

    loadModels();
  };

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        localStream = stream;
        if (videoRef.current) {
          return ((videoRef.current as any).srcObject = stream);
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCount = (num: number) => {
    setProcessing?.(num);
  };

  const clearCount = (num: number) => {
    setProcessing?.(num);
  };

  const onPlay = async (e: React.SyntheticEvent) => {
    // video loaded
    setModelsLoaded?.(true);

    const canvas = createCanvasFromMedia(videoRef.current);
    displayRef.current.append(canvas);

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    matchDimensions(canvas, displaySize);

    const faceDetecting = async () => {
      if (!videoRef.current) return;
      const detections = await detectAllFaces(
        videoRef.current,
        new TinyFaceDetectorOptions()
      )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

      const resizedDetections = resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const labeledFaceDescriptors = await loadImage();
      const faceMatcher = new FaceMatcher(labeledFaceDescriptors, 0.6);

      const matched = resizedDetections[0];
      if (matched) {
        const box = matched.detection.box;
        const label = faceMatcher.findBestMatch(matched.descriptor).toString();
        const drawBox = new draw.DrawBox(box, {
          label: label,
        });

        drawBox.draw(canvas);
        return label;
      }
      return null;
    };

    const testFaceDetecting = async () => {
      if (!videoRef.current) return;
      const detections = await detectAllFaces(
        videoRef.current,
        new TinyFaceDetectorOptions()
      )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

      const resizedDetections = resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      resizedDetections.forEach((detection, i) => {
        const box = resizedDetections[i].detection.box;

        const drawBox = new draw.DrawBox(box, {
          label: "Face",
        });

        drawBox.draw(canvas);
      });

      // // 감정 읽기
      draw.drawFaceExpressions(canvas, resizedDetections);
      draw.drawFaceLandmarks(canvas, resizedDetections);
    };

    const loop = () => {
      if (test) {
        testFaceDetecting().then(() => {
          if (captureVideo) {
            setTimeout(loop, 1);
          }
        });
      } else {
        faceDetecting().then((label) => {
          if (label && label.match(userName)) {
            updateCount((count.current += 1));
          }

          if (count.current > limitCount) {
            setModelsLoaded?.(false);
            setCaptureVideo(false);
            clearCount(0);
            alert("로그인 되었습니다");
          } else {
            console.log("인식 중...");
            setTimeout(loop, 1);
          }
        });
      }
    };
    setTimeout(loop, 1);
  };

  return (
    <Box>
      {captureVideo && (
        <FaceDisplay show={test} ref={displayRef}>
          {(modelsLoaded || test) && (
            <>
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
    </Box>
  );
}

const FaceDisplay = styled(Box)(({ show }: { show?: boolean }) => ({
  position: show ? "relative" : "absolute",
  ...(show && {
    width: "560px",
    height: "350px",
  }),
  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "560px",
    height: "350px",
    opacity: show ? 1 : 0,
  },
  "& canvas": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "560px",
    height: "350px",
    opacity: show ? 1 : 0,
  },
}));

export default memo(FaceSign);

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
