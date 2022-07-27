import { Box, TextField, Button, Stack, FormHelperText } from "@mui/material";
import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Analyzer from "../../tools/analyzer";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

interface FormikProps {
  title: string;
  content: string;
  username: string;
}

function WriteForm() {
  const navigate = useNavigate();
  const editor = useRef<SunEditorCore>();
  const [formData, setFormData] = useState({ title: "" });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      username: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("필수 항목 입니다."),
      content: yup.string(),
      username: yup.string(),
    }),
    onSubmit: (value) => {
      formik.values.username = "username";
      // values로 넣는 이유는 form data에 전달되는 반응 속도가 제일 빨라서.
      formik.values.content = editor.current?.getContents(true);

      sendDiaryInfo().then((result) => devSendFormData(value, result));
    },
  });

  // 프론트 개발 폼데이터 전송 테스트용
  const devSendFormData = (value: FormikProps, result: any) => {
    // 데이터 전송
    console.log(value);
    console.log(result);
  };

  // api 서버 개발 후 테스트용
  const sendFormData = (value: FormikProps, result: any) => {
    const formData = new FormData();
    const url = "/api/diary";
    // 데이터 전송
    console.log(value);
    console.log(result);
    axios.post(url, formData).then((res) => {
      if (res.status === 200) {
        navigate("/diary");
      }
    });
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const sendDiaryInfo = async () => {
    const analyzer = new Analyzer(
      "ko",
      "en",
      editor.current?.getContents(true)
    );

    await analyzer.translate();
    const result = analyzer.analyze();
    return {
      regdate: Date.now(),
      negative: result.negative,
      positive: result.positive,
      score: result.score,
      emotionScore: analyzer.getEmotionScore(),
    };
  };

  return (
    <Box>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete='off'
        onSubmit={formik.handleSubmit}>
        <Box mb={2} sx={{ display: "inline-block", position: "relative" }}>
          <TextField
            label='제목을 입력하세요'
            id='standard-size-normal'
            variant='standard'
            onChange={formik.handleChange}
            value={formik.values.title}
            name='title'
            color={formik.errors.title ? "error" : "info"}
          />
          {formik.touched.title && (
            <FormHelperText
              error={formik.touched.title}
              sx={{
                position: "absolute",
                top: "50%",
                left: "100%",
                whiteSpace: "nowrap",
              }}>
              {formik.errors.title}
            </FormHelperText>
          )}
        </Box>
        <Box>
          <SunEditor
            lang='ko'
            // defaultValue='<p>내용을 입력하세요</p>'
            placeholder='내용을 입력하세요'
            width='100%'
            height='300px'
            name='content'
            getSunEditorInstance={getSunEditorInstance}
          />
        </Box>
        <Box
          component='input'
          readOnly
          hidden
          name='username'
          value='username'
        />
        <Stack
          direction='row'
          spacing={4}
          mt={2}
          justifyContent='center'
          alignItems='center'>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            type='submit'>
            일기 저장하기
          </Button>
          <Button variant='contained' size='medium' color='warning'>
            취소
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default WriteForm;
