import { Box, Stack } from "@mui/material";
import React from "react";
import Title, { SizeProps } from "../atoms/Title";
import IconSet, { IconSetProps } from "../molecules/IconSet";

interface DynamicSectionProps {
  main?: boolean;
  img?: string;
  title?: string | React.ReactElement;
  titleSize?: SizeProps;
  icons?: IconSetProps[];
  slot?: React.ReactElement;
  background?: boolean;
}

function DynamicSection({
  main,
  img,
  title,
  titleSize,
  icons,
  slot,
  background,
}: DynamicSectionProps) {
  return (
    <Stack
      component='section'
      justifyContent='center'
      sx={{
        position: "relative",
        height: {
          xs: "auto",
          md: main ? "80vh" : "65vh",
        },
        minHeight: "500px",
        overflow: "hidden",
        py: 10,
        "& .MuiTypography-root": {
          color: img ? "#ffffff" : "black",
          ...(main && { px: 5 }),
        },
      }}>
      {(img || background) && (
        <Box
          component='img'
          src={
            img ||
            "https://mui.com/static/themes/onepirate/productCurvyLines.png"
          }
          alt='img'
          sx={{
            display: "inline-block",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            objectFit: "cover",
            objectPosition: "0 calc(-7rem + 10vh)",
            ...(main && { filter: "brightness(0.7)" }),
            ...(background && { backgroundColor: "#fff5f8" }),
          }}
        />
      )}
      {title && <Title title={title} size={titleSize} main={main} />}
      {slot}
      {icons && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "normal", md: "center" }}
          alignItems={{ xs: "center", md: "normal" }}
          gap={20}>
          {icons.map(({ index, title, icon, content }) => (
            <IconSet
              key={index + title + content}
              index={index}
              icon={icon}
              title={title}
              content={content}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default DynamicSection;
