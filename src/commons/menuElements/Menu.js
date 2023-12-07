import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Divider, Typography } from "@mui/material";

import {
  ButtonStyled,
  HeaderLogo,
} from "../../utils/StyledComponents";
import MenuItems from "./MenuItems";
import { currentUserAtom } from "../../state/atoms/generalAtom";
import { useRecoilState } from "recoil";
import { DownloadOutlined } from "@mui/icons-material";
import { asyncCloseSession } from "../../state/services/authServices/usersServices";

export default function Menu(props) {
  const logoFooter = sessionStorage.getItem("logo-footer");

  const { open } = props;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const closeSession = () => {
    asyncCloseSession();
    sessionStorage.setItem("token", "");
    axios.defaults.headers.common["Authorization"] = "";
    setCurrentUser(null);
    navigate("/logout");
  };

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
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.buttons.light }}
        >
          {`${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`}
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
        <a href="/manual/ManualUsuario.pdf" target="_blank">
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
              closeSession();
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
