import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: (theme) => theme.palette.background.paper,
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
      }}
    >
      <Stack
        sx={{
          p: { xs: "1rem", sm: "3rem" },
          width: { xs: "100%", lg: "90%" },
        }}
      >
        <Skeleton animation="wave" variant="text" width="20%" height="5vh" />
        <Skeleton
          animation="wave"
          height="100%"
          width="100%"
        />
      </Stack>
    </Box>
  );
}

export default Loading;
