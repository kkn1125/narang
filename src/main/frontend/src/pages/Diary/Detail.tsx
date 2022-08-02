import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { findDiaryById } from "../../apis/diary";
import DetailLayout from "../../components/templates/DetailLayout";

function Detail() {
  const params = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const diary = async () => {
      const getDiary = await findDiaryById(params.id);
      setDiary(getDiary);
    };
    diary();
  }, []);
  return <Stack>{diary && <DetailLayout diary={diary} />}</Stack>;
}

export default Detail;
