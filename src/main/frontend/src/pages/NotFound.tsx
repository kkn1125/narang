import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NotFoundIcon } from "../svg/NotFound.svg";

const ERROR_MSG = `404: The page you are looking for isn’t here`;
const ERROR_COMMENTS = `You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
`;

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth='md'
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: "bold",
        }}>
        {ERROR_MSG}
      </Typography>
      <Typography variant='body2'>{ERROR_COMMENTS}</Typography>
      <Box sx={{ my: 3 }}>
        <NotFoundIcon width={500} height={300} />
      </Box>
      <Button
        variant='contained'
        color='primary'
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <ArrowBackIcon />
        <Typography onClick={() => navigate("/")}>메인으로</Typography>
      </Button>
    </Container>
  );
}

export default NotFound;
