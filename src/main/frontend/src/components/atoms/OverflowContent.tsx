import { styled, Typography, TypographyProps } from "@mui/material";
import React, { useEffect, useState } from "react";

interface OverflowContentProps extends TypographyProps {
  limit: number;
  children: string;
}

const Text = styled(Typography)``;

const OverflowContent = ({
  children,
  limit,
  ...rest
}: OverflowContentProps) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const getLengthOrZero = (target: string[] | null) =>
      target ? target.length : 0;
    const en: number = getLengthOrZero(children.match(/[A-z]/g));
    const ko: number = getLengthOrZero(children.match(/[ㄱ-힣]/g));
    const whitespace: number = getLengthOrZero(children.match(/[^A-zㄱ-힣]/g));

    if (ko * 2 + en + whitespace > limit) {
      setResult(children.slice(0, limit));
      setIsOverflow(true);
    }
  });

  return (
    <Text {...rest}>
      {result}
      {isOverflow && "..."}
    </Text>
  );
};

OverflowContent.defaultProps = {
  limit: 100,
};

export default OverflowContent;