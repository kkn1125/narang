import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { FormEvent, useState } from "react";
import * as yup from "yup";
import { addFaceImage } from "../../apis/faceImage";
import { userApi, userUpdate } from "../../apis/user";
import TextFieldSet from "../../components/molecules/TextFieldSet";
import FaceImage from "../../models/FaceImage";
import User, { UserColumn } from "../../models/User";
import {
  emailValidation,
  FILE_NAME_REGEXP,
  FILE_TYPE_ERROR,
  FILE_TYPE_REGEXP,
  nickNameValidation,
  passwordValidation,
  phoneValidation,
  REQUIRED_ERROR,
} from "../../tools/utils";

const fields = [
  {
    name: "nickName",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    name: "email",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    name: "phone",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "",
    required: true,
  },
  {
    name: "check password",
    type: "password",
    placeholder: "",
    required: true,
  },
];

const validationSchema = yup.object({
  nickName: nickNameValidation,
  email: emailValidation,
  password: passwordValidation,
  check_password: passwordValidation.test(
    "passwords-match",
    "비밀번호가 일치하지 않습니다.",
    function (value) {
      return this.parent.password === value;
    }
  ),
  phone: phoneValidation,
  profileImg: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup
          .object({
            type: yup.string().matches(FILE_TYPE_REGEXP, {
              exclideEmptyString: false,
              message: FILE_TYPE_ERROR,
            }),
            name: yup.string().matches(FILE_NAME_REGEXP, {
              exclideEmptyString: false,
              message: FILE_TYPE_ERROR,
            }),
            size: yup.number(),
            lastModified: yup.number(),
            lastModifiedDate: yup.string(),
            webkitRelativePath: yup.string(),
            insertTime: yup.number(),
            insertDate: yup.string(),
          })
          .nullable()
          .required(REQUIRED_ERROR);
      case "string":
        return yup.string().required("필수입력");
      default:
        return yup.string();
    }
  }),
  faceImage: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup
          .object({
            type: yup.string().matches(FILE_TYPE_REGEXP, {
              exclideEmptyString: false,
              message: FILE_TYPE_ERROR,
            }),
            name: yup.string().matches(FILE_NAME_REGEXP, {
              exclideEmptyString: false,
              message: FILE_TYPE_ERROR,
            }),
            size: yup.number(),
            lastModified: yup.number(),
            lastModifiedDate: yup.string(),
            webkitRelativePath: yup.string(),
            insertTime: yup.number(),
            insertDate: yup.string(),
          })
          .nullable()
          .required(REQUIRED_ERROR);
      case "string":
        return yup.string().required("필수입력");
      default:
        return yup.string();
    }
  }),
});

// http://placekitten.com/200/200
function Profile() {
  const formik = useFormik({
    initialValues: {
      nickName: "",
      email: "",
      password: "",
      check_password: "",
      phone: "",
      profileImg: null,
      faceImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      const user = new User();
      Object.entries(values).forEach(([column, value]) => {
        user.set(column as UserColumn, value);
      });
      user.set("profileImg", values.profileImg.name);

      const face = new FaceImage();
      face.set("uid", "12345");
      face.set("imgPath", values.faceImage.name);

      setTimeout(() => {
        const userFormData = user.makeFormData();
        const faceFormData = face.makeFormData();
        userUpdate(userFormData);
        addFaceImage(faceFormData);
      }, 1);
    },
  });

  const [profileImg, setProfileImg] = useState(null);
  const [faceImage, setFaceImage] = useState(null);

  // formik 상세화면 배경 이미지 파일 직접 지정
  const handleProfileImg = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    const newFiles = {
      name: files.name,
      size: files.size,
      type: files.type,
      lastModified: files.lastModified,
      lastModifiedDate: new Date(files.lastModified).toLocaleString("ko", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      webkitRelativePath: files.webkitRelativePath,
    };
    formik.values.profileImg = newFiles;
    setProfileImg(files);
  };

  const handleFaceImage = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    const newFiles = {
      name: files.name,
      size: files.size,
      type: files.type,
      lastModified: files.lastModified,
      lastModifiedDate: new Date(files.lastModified).toLocaleString("ko", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      webkitRelativePath: files.webkitRelativePath,
    };
    formik.values.faceImage = newFiles;
    setFaceImage(files);
  };

  return (
    <Stack
      direction={{
        xs: "column",
        lg: "row",
      }}
      spacing={4}
      justifyContent={{
        xs: "flex-start",
        md: "center",
      }}
      alignItems={{
        xs: "center",
        lg: "flex-start",
      }}
      sx={{
        maxWidth: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <Box sx={{ width: "100%" }}>
        <Card
          sx={{
            width: "100%",
            p: 2,
            textAlign: "center",
          }}
          elevation={5}>
          <Stack spacing={2}>
            <Avatar
              src='http://placekitten.com/300/200'
              sx={{ width: 60, height: 60, display: "block", margin: "auto" }}
            />
            <Box>
              <Typography variant='h5' gutterBottom component='div'>
                Katarina Smith
              </Typography>
            </Box>
            <Box>
              <Typography variant='body2' gutterBottom component='div' mb={2}>
                Email Address
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              {/* https://mui.com/material-ui/react-button/#upload-button */}
              <Button component='label'>
                Upload picture
                <input
                  hidden
                  accept='image/*'
                  multiple
                  type='file'
                  name='profileImg'
                  onChange={handleProfileImg}
                />
              </Button>
            </Box>
          </Stack>
        </Card>
      </Box>

      {/* Profile area */}
      <Card sx={{ m: 2, p: 2, width: "100%" }} elevation={5}>
        <Box>
          <Typography variant='h5' gutterBottom component='div'>
            Profile
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' gutterBottom component='div' mb={4}>
            The information can be edited
          </Typography>
        </Box>
        <Divider />

        {/* text fields */}
        <Box component='form' onSubmit={formik.handleSubmit}>
          <Stack sx={{ mt: 2, mb: 1 }} spacing={2}>
            <TextFieldSet fields={fields} size={"medium"} formik={formik} />

            {/* https://mui.com/material-ui/react-button/#upload-button */}
            <Button component='label'>
              Upload Face Login Picture
              <input
                hidden
                accept='image/*'
                multiple
                type='file'
                name='faceImage'
                onChange={handleFaceImage}
              />
            </Button>
          </Stack>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              type='submit'
              variant='contained'
              sx={{ display: "block", margin: "auto" }}>
              프로필 저장하기
            </Button>
          </Box>
        </Box>
      </Card>
    </Stack>
  );
}

export default Profile;
