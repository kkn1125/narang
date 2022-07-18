import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import clmtrackr from "clmtrackr";

function Diary() {
  const navigate = useNavigate();
  const canvas = useRef(null);
  const overlay = useRef(null);
  let drawRequest;
  let overlayCC: CanvasRenderingContext2D | null;
  let ctrack: clmtrackr.tracker;
  
  useEffect(() => {
    const img = new Image();
    ctrack = new clmtrackr.tracker({ stopOnConvergence: true });
    ctrack.init();

    img.addEventListener(
      "load",
      () => {
        if (canvas.current !== null) {
          const cc = (canvas.current as HTMLCanvasElement).getContext("2d");
          if (cc !== null) {
            cc.drawImage(img, 0, 0, 300, 400);
          }
        }
        if (overlay.current !== null) {
          overlayCC = (overlay.current as HTMLCanvasElement).getContext("2d");
        }
      },
      false
    );
    img.src = require("../../../src/images/[x]sample.jpg");
    if (canvas.current !== null) {
      const ctracker = new clmtrackr.tracker();
      console.log(ctracker);
      ctracker.start(canvas.current as HTMLCanvasElement);
    }
  }, []);

  function animateClean() {
    if (canvas.current !== null) {
      ctrack.start(canvas.current);
      drawLoop();
    }
  }

  function drawLoop() {
    drawRequest = requestAnimationFrame(drawLoop);
    if (overlayCC !== null) {
      overlayCC.clearRect(0, 0, 720, 576);
      if (ctrack.getCurrentPosition()) {
        ctrack.draw(overlay.current as unknown as HTMLCanvasElement);
      }
    }
  }

  return (
    <div>
      <div style={{ position: "relative" }}>
        <canvas
          style={{ position: "absolute" }}
          ref={canvas}
          height='400'></canvas>
        <canvas
          style={{ position: "absolute" }}
          ref={overlay}
          height='400'></canvas>
      </div>
      <Button onClick={() => animateClean()}>start</Button>
      diary
      <Button variant='outlined' onClick={() => navigate("./write")}>
        일기 쓰기
      </Button>
    </div>
  );
}

export default Diary;
