import { Box, Skeleton } from "@mui/material";
import React from "react";

interface LoadingSkeletonProps {
  isLoaded: boolean;
  title?: boolean;
  multiline?: boolean;
  children: React.ReactElement;
}

const LoadingSkeleton = ({
  isLoaded,
  title,
  multiline,
  children,
}: LoadingSkeletonProps) => {
  if (isLoaded) {
    return children;
  } else {
    if (multiline) {
      return (
        <Box>
          <Skeleton variant='text' sx={{ fontSize: "1rem" }} width={40} />
          <Skeleton variant='text' sx={{ fontSize: "1rem" }} width={70} />
          <Skeleton variant='text' sx={{ fontSize: "1rem" }} width={100} />
          <Skeleton variant='text' sx={{ fontSize: "1rem" }} width={60} />
        </Box>
      );
    } else {
      if (title) {
        return <Skeleton variant='text' sx={{ fontSize: "3rem" }} />;
      } else {
        return <Skeleton variant='text' sx={{ fontSize: "1rem" }} />;
      }
    }
  }
};

export default LoadingSkeleton;
