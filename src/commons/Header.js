import React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { HeaderTypography } from "../utils/StyledComponents";
import { Toolbar } from "@mui/material";

import AppBar from "@mui/material/AppBar";
function Header(props) {
  const platformName = sessionStorage.getItem("platform-name");

  const { handleDrawerToggle } = props;
  return (
    <AppBar
      position="fixed"
      sx={{
        height: "10vh",
        padding: "0 ",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Toolbar sx={{}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
            marginRight: 5,
            display: { sm: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "end",
            overflow: "hidden", textOverflow: "ellipsis", height: "10vh", width: "90%"
          }}
        >
          <HeaderTypography align="right" sx={{ width: "65%" }} >{platformName}</HeaderTypography>


        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
