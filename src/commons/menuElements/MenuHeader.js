import React from "react";
import { Box, Divider } from "@mui/material";
import { DrawerHeader, HeaderLogo } from "../../utils/StyledComponents";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function MenuHeader(props) {
  const { handleDrawerToggle } = props;

  const logoHeader = sessionStorage.getItem("logo-header");
  //console.log(logoHeader);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      <DrawerHeader
        sx={{
          height: "10vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <a href="/">
          {logoHeader ? (
            <HeaderLogo
              sx={{
                display: { xs: "flex" },
                mr: 1,
                width: "100%",
                maxWidth: "100%",
              }}
              src={logoHeader}
            />
          ) : (
            <HeaderLogo
              sx={{
                display: { xs: "flex" },
                mr: 1,
                width: "100%",
                maxWidth: "100%",
              }}
              src={"/gobiernoWhite.svg"}
            />
          )}
        </a>
        <IconButton
          onClick={() => {
            handleDrawerToggle();
          }}
          sx={{
            flexGrow: 1,
            display: { xs: "flex", sm: "none" },
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box
          sx={{
            height: "1vh",
            backgroundColor: (theme) => theme.palette.primary.contrastText,
          }}
        ></Box>
        <Divider
          sx={{
            height: "1vh",
            color: (theme) => theme.palette.primary.contrastText,
          }}
        />
      </DrawerHeader>
    </Box>
  );
}

export default MenuHeader;
