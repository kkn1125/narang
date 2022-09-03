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
  animation: boolean;
}

function DynamicSection({
  main,
  img,
  title,
  titleSize,
  icons,
  slot,
  background,
  animation,
}: DynamicSectionProps) {
  return (
    <Stack
      component='section'
      justifyContent='center'
      sx={{
        position: "relative",
        height: {
          xs: "auto",
          md: main ? "80vh" : "auto",
        },
        minHeight: "500px",
        overflow: "hidden",
        py: main ? 0 : 10,
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
            width: {
              md: "100%",
            },
            height: {
              xs: "auto",
              md: "100%",
            },
            zIndex: -1,
            objectFit: "cover",
            objectPosition: "0 calc(-7rem + 10vh)",
            ...(main && { filter: "brightness(0.7)" }),
            ...(background && { backgroundColor: "#fff5f8" }),
          }}
        />
      )}
      {title && (
        <Title
          title={title}
          size={titleSize}
          main={main}
          animation={animation}
        />
      )}
      {slot}
      {icons && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "normal", md: "center" }}
          alignItems={{ xs: "center", md: "normal" }}
          gap={20}>
          {icons.map(({ index, title, icon, content }, idx) => (
            <IconSet
              key={index + title + content}
              index={index}
              icon={icon}
              title={title}
              content={content}
              order={idx}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

DynamicSection.defaultProps = {
  animation: false,
};

export default DynamicSection;
