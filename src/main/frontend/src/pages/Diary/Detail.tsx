import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findDiaryById } from "../../apis/diary";
import { findEmotionByDid } from "../../apis/emotions";
import DetailLayout from "../../components/templates/DetailLayout";

function Detail() {
  const params = useParams();
  const [diary, setDiary] = useState(null);
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const getDiaryWithEmotion = async () => {
      const diaryId = params.id;
      const getDiary = await findDiaryById(diaryId);
      setDiary(getDiary);
      const getEmotion = await findEmotionByDid(diaryId);
      setEmotion(getEmotion);
    };

    getDiaryWithEmotion();
  }, []);
  return (
    <Stack>
      {diary && emotion && <DetailLayout diary={diary} emotion={emotion} />}
    </Stack>
  );
}

export default Detail;
