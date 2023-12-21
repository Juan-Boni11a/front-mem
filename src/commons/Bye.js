import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Divider } from "@mui/material";

import { ButtonStyled, TitleStyled } from "../utils/StyledComponents";

import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";

function Bye() {
  const navigate = useNavigate();

  const secondaryHome = sessionStorage.getItem("secondary-home");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={null} />
      <Divider />
      <Box
        sx={{
          p: "10vh 0 0 0 ",
          backgroundColor: (theme) => theme.palette.background.paper,
          height: "100vh",
          maxHeight: "100vh",
          width: "100%",
          overflowY: "auto",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            p: { xs: "1rem", sm: "3rem" },
            width: { xs: "100%", lg: "90%" },
            maxWidth: "1200px",
            textAlign: "center",
          }}
        >
          <TitleStyled
            sx={{
              padding: "1rem",
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Gracias por visitar la Plataforma de Procesos Licitatorios
          </TitleStyled>
          <ButtonStyled
            sx={{
              backgroundColor: (theme) => theme.palette.buttons.main,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Volver a ingresar
          </ButtonStyled>
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
              image={secondaryHome}
              alt="Gracias por visitarnos"
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Bye;
