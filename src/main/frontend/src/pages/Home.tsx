import { Box } from "@mui/material";
import React from "react";
import Image from "../components/atoms/Image";

function Home() {
  return (
    <Box>
      <Image
        src='https://mui.com/static/themes/onepirate/productHeroWonder.png'
        alt='sample'
      />
    </Box>
  );
}

export default Home;
