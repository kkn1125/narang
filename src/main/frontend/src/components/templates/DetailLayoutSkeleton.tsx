import { Container, Divider, Skeleton, Stack } from "@mui/material";
import React from "react";

interface DetailLayoutSkeletonProps {
  isLoaded: boolean;
  children?: React.ReactElement;
}

function DetailLayoutSkeleton({
  isLoaded,
  children,
}: DetailLayoutSkeletonProps) {
  if (isLoaded) return children;

  return (
    <Container maxWidth='lg'>
      <Stack direction='row' alignItems='center' sx={{ gap: 2 }}>
        <Skeleton variant='circular' width={48} height={48} />
        <Stack justifyContent='center'>
          <Skeleton variant='text' sx={{ fontSize: "1rem", width: 120 }} />
          <Skeleton variant='text' sx={{ fontSize: "1rem", width: 180 }} />
        </Stack>
      </Stack>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent='space-between'>
        <Skeleton
          variant='text'
          sx={{
            fontSize: "3rem",
            width: {
              xs: 300,
              md: "100%",
            },
            maxWidth: 500,
          }}
        />
        <Stack direction='row' sx={{ gap: 2 }}>
          <Skeleton variant='text' sx={{ fontSize: "3rem", width: 100 }} />
          <Skeleton variant='text' sx={{ fontSize: "3rem", width: 100 }} />
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: "100%" } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: "100%" } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: 1000 } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: 600 } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: 700 } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: 1000 } }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: "1rem", width: { xs: "auto", md: 600 } }}
      />
    </Container>
  );
}

export default DetailLayoutSkeleton;
