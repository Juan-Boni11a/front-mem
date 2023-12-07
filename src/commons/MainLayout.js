import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  errorMessageAtom,
  isLoadingAllPageAtom,
  isLoadingGeneralAtom,
} from "../state/atoms/generalAtom";

import { Box, IconButton, Snackbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Loading from "./Loading";
import { Close } from "@mui/icons-material";

function MainLayout(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const isLoading = useRecoilValue(isLoadingGeneralAtom);
  const isLoadingAllPage = useRecoilValue(isLoadingAllPageAtom);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    if (errorMessage !== "") {
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
    }
  }, [errorMessage]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <LeftMenu
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <Box
        sx={{
          flexGrow: 1,
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
        {isLoading || isLoadingAllPage ? (
          <Loading />
        ) : (
          <Box
            sx={{
              p: { xs: "1rem", sm: "3rem" },
              width: { xs: "100%", lg: "90%" },
            }}
          >
            {props.children}
          </Box>
        )}
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default MainLayout;
