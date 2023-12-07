import { Box, Card, CardMedia, Divider } from "@mui/material";
import React from "react";
import { TitleStyled } from "../utils/StyledComponents";
import MainLayout from "./MainLayout";
import WorkspaceHeader from "./WorkspaceHeader";

function Home() {
  const messageHome = sessionStorage.getItem("message-home");
  const mainHome = sessionStorage.getItem("main-home");

  return (
    <MainLayout>
      <WorkspaceHeader title="Inicio " showSearch={false} onSearch={null} />
      <Box sx={{ width: "100%", height: "70vh" }}>
        <Divider />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            padding: 1,
            height: "100%",
          }}
        >
          <TitleStyled
            sx={{
              padding: "1rem",
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {messageHome}
          </TitleStyled>
          <Card
            sx={{
              justifyContent: "center",
              display: "flex",
              height: "50vh",
              margin: "1rem",
            }}
          >
            <CardMedia
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              component="img"
              image={mainHome}
              alt="Bienvenida"
            />
          </Card>

        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;
