import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Diary() {
  const navigate = useNavigate();

  return (
    <div>
      diary
      <Button variant='outlined' onClick={() => navigate("./write")}>
        일기 쓰기
      </Button>
    </div>
  );
}

export default Diary;
