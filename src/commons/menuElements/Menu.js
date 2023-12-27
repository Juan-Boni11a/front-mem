import React from "react";
import { Box, Paper, Divider, Typography } from "@mui/material";
import { ButtonStyled, HeaderLogo } from "../../utils/StyledComponents";
import MenuItems from "./MenuItems";
import { DownloadOutlined } from "@mui/icons-material";

export default function Menu(props) {
  const logoFooter = sessionStorage.getItem("logo-footer");
  const { open } = props;
  

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        height: "90vh",
        borderRadius: "0px",
      }}
    >
      <Box
        sx={{
          paddingX: "1rem",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <Typography variant="overline">Bienvenid@</Typography>
        <Typography variant="subtitle2">
          {/* User information goes here */}
        </Typography>
      </Box>

      <Box sx={{ height: "60vh", maxHeight: "45vh", overflowY: "auto" }}>
        <MenuItems
          open={open}
          menu={props.menu}
          userPermissions={props.userPermissions}
        />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          height: "25vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <a href="/manual/ManualUsuario.pdf" target="_blank" rel="noopener noreferrer">
          <ButtonStyled startIcon={<DownloadOutlined />}>
            Manual de Usuario
          </ButtonStyled>
        </a>

        <Divider
          sx={{ backgroundColor: (theme) => theme.palette.buttons.light }}
        />
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "center",
            display: "inline-grid",
          }}
        >
          <ButtonStyled
            sx={{
              backgroundColor: (theme) => theme.palette.buttons.main,
            }}
            onClick={() => {
              // Handle logout or session closure
            }}
          >
            Cerrar Sesion
          </ButtonStyled>
        </Box>
      </Box>

      <Box
        sx={{
          justifyContent: "center",
          textAlign: "center",
          height: "10vh",
        }}
      >
        <HeaderLogo sx={{ mr: 1 }} src={logoFooter} />
      </Box>
    </Paper>
  );
}
