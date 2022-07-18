import { Box } from "@mui/material";
import React from "react";
import Image from "../components/atoms/Image";

function Home() {
  return (
    <Box>
      <Image
        src='https://cdn.pixabay.com/photo/2020/05/24/11/14/sea-5213746_1280.jpg'
        alt='sample'
      />
    </Box>
  );
}

export default Home;
