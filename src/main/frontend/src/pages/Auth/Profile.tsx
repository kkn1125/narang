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
import { sha256 } from "js-sha256";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkPassword } from "../../apis/auth";
import { handleReceiveError } from "../../apis/commonTypes";
import {
  addFaceImage,
  deleteFaceImageById,
  findFaceImageAll,
  findFaceImageByUid,
} from "../../apis/faceImage";
import { userUpdate } from "../../apis/user";
import {
  deleteProfileImage,
  fileupload,
  profileUpload,
} from "../../apis/utils/fileupload";
import TextFieldSet from "../../components/molecules/TextFieldSet";
import { setUser, UserContext } from "../../contexts/UserProvider";
import FaceImage from "../../models/FaceImage";
import User, { UserColumn } from "../../models/User";
import {
  cutMiddleText,
  emailValidation,
  FILE_NAME_REGEXP,
  FILE_TYPE_ERROR,
  FILE_TYPE_REGEXP,
  nickNameValidation,
  passwordValidation,
  phoneValidation,
  profileImageOrCat,
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

function Profile() {
  const navigate = useNavigate();
  const [faceImages, setFaceImages] = useState([]);
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
      isFaceSign:
        user && user.id && user.isFaceSign !== null ? user.isFaceSign : false,
      terms: user && user.id && user.terms !== null ? user.terms : false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.values.email = user.email;
      checkPassword(values.check_password, user.id)
        .then((result) => {
          if (result) {
            const userFormData = new FormData();
            Object.entries(values).forEach(([column, value]) => {
              console.log(column);
              if (column === "password") return;
              if (
                (column === "profileImg" || column === "faceImage") &&
                typeof value === "string"
              )
                return;

              userFormData.append(column as UserColumn, value);
            });

            const face = new FaceImage();
            const profileSplit = values.profileImg?.name?.split(/[.]/g);
            const imgSplit = values.faceImage?.name?.split(/[.]/g);
            const profileType = profileSplit?.pop();
            const profileName = profileSplit?.join(".");
            const type = imgSplit?.pop();
            const name = imgSplit?.join(".");

            userFormData.append("id", user.id);

            const faceFormData = face.makeFormData();

            if (values.profileImg && values.profileImg instanceof File) {
              const hashProfileName = `${sha256(profileName)}.${profileType}`;
              userFormData.set("profileImg", hashProfileName);
              deleteProfileImage(user.id).then(() => {
                profileUpload(values.profileImg, user.id, hashProfileName);
              });
            }

            if (values.faceImage && values.faceImage instanceof File) {
              const hashedName = `${sha256(name)}.${type}`;
              faceFormData.set("uid", user.id);
              faceFormData.set("imgPath", hashedName);
              fileupload(values.faceImage, user.id, hashedName);
              addFaceImage(faceFormData);
              userFormData.set("isFaceSign", "true");
            }

            userUpdate(userFormData).then((result: any) => {
              if (result) {
                delete result["password"];
                dispatch(setUser(result));
              }
            });
          } else {
            alert("비밀번호를 다시 확인 해 주세요.");
          }
        })
        .catch(handleReceiveError)
        .finally(() => {
          formik.values.password = "";
          formik.values.check_password = "";
        });
    },
  });

  const [faceImage, setFaceImage] = useState(null);

  useEffect(() => {
    if (cookies.token.token_type) {
      navigate(-1);
    }
    findFaceImageByUid(user.id).then((result) => {
      setFaceImages(result);
    });
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
  }, [user]);

  // formik 상세화면 배경 이미지 파일 직접 지정
  const handleProfileImg = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.profileImg = files;
  };

  const handleFaceImage = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.faceImage = files;
    setFaceImage(files);
  };

  const handleRemoveFaceImage = (uid: string, ids: string, imgPath: string) => {
    if (
      !confirm("등록된 이미지를 제거하면 복구 불가합니다. 삭제하시겠습니까?")
    ) {
      return;
    }

    deleteFaceImageById(uid, [ids], imgPath).then((isDeleted: boolean) => {
      if (isDeleted) {
        findFaceImageAll().then((result) => {
          if (result.length === 0) {
            const updateUser = new User();
            updateUser.getResponseData(user);
            const formData = updateUser.makeFormData();
            formData.set("id", user.id);
            formData.set("isFaceSign", "false");
            userUpdate(formData);
          }
          setFaceImages(result);
        });
      }
    });
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
              src={profileImageOrCat(user)}
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
            {faceImages.map((face) => (
              <Box key={face.id}>
                <Typography>{cutMiddleText(face.imgPath)}</Typography>
                <Button
                  size='small'
                  color='error'
                  onClick={() =>
                    handleRemoveFaceImage(user.id, face.id, face.imgPath)
                  }>
                  &times;
                </Button>
              </Box>
            ))}
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
