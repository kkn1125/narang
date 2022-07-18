import { Box } from "@mui/material";
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

function WriteForm() {
  return (
    <Box>
      <SunEditor
        lang='ko'
        // defaultValue='<p>내용을 입력하세요</p>'
        placeholder='내용을 입력하세요'
        width='100%'
        height='300px'
      />
    </Box>
  );
}

export default WriteForm;
