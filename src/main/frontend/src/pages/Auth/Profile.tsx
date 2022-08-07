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
import { EncryptJWT } from "jose";
import { sha256 } from "js-sha256";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { checkPassword } from "../../apis/auth";
import { handleReceiveError } from "../../apis/commonTypes";
import { addFaceImage } from "../../apis/faceImage";
import { userUpdate } from "../../apis/user";
import { fileupload } from "../../apis/utils/fileupload";
import TextFieldSet from "../../components/molecules/TextFieldSet";
import { UserContext } from "../../contexts/UserProvider";
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
  splitToUnderBar,
} from "../../tools/utils";

const validationSchema = yup.object({
  nickName: nickNameValidation,
  email: emailValidation,
  password: passwordValidation,
  check_password: passwordValidation.test(
    "passwords-match",
    "비밀번호가 일치하지 않습니다.",
    function (value) {
      return this.parent.password === value;
    },
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
          .nullable();
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
          .nullable();
      case "string":
        return yup.string().required("필수입력");
      default:
        return yup.string();
    }
  }),
});

// http://placekitten.com/200/200
function Profile() {
  const [user, dispatch] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const [fields, setFields] = useState([
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
  ]);

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

      checkPassword(values.check_password, user.id)
        .then((result) => {
          if (result) {
            const userInfo = new User();
            Object.entries(values).forEach(([column, value]) => {
              userInfo.set(column as UserColumn, value);
            });
            userInfo.set("id", user.id);
            userInfo.set("profileImg", values.profileImg?.name);

            const face = new FaceImage();
            const imgSplit = values.faceImage?.name.split(".");
            const type = imgSplit.pop();
            const name = imgSplit.join();
            face.set("uid", user.id);
            face.set("imgPath", `${sha256(name)}.${type}`);

            const userFormData = userInfo.makeFormData();
            const faceFormData = face.makeFormData();

            console.log(userInfo, face, user.id);
            console.log(type, name);

            fileupload(values.faceImage, user.id, `${sha256(name)}.${type}`);
            userUpdate(userFormData);
            addFaceImage(faceFormData);
          } else {
            alert("비밀번호를 다시 확인 해 주세요.");
          }
        })
        .catch(handleReceiveError);
    },
  });

  const [profileImg, setProfileImg] = useState(null);
  const [faceImage, setFaceImage] = useState(null);

  useEffect(() => {
    Object.entries(user).forEach(([key, value]) => {
      switch (key) {
        case "nickName":
        case "email":
        case "password":
        case "check_password":
        case "phone":
          formik.values[key] = value as string;
          break;
        case "profileImg":
        case "faceImage":
          formik.values[key] = value as object | string;
          break;
      }
    });
    setProfileImg("");
    setTimeout(() => {
      setProfileImg(null);
    }, 1);
  }, [user]);

  // formik 상세화면 배경 이미지 파일 직접 지정
  const handleProfileImg = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.profileImg = files;
    setProfileImg(files);
  };

  const handleFaceImage = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.faceImage = files;
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
                {user.nickName}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body2' gutterBottom component='div' mb={2}>
                {user.email}
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
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          encType='multipart/form-data'>
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
