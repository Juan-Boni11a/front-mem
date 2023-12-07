import React from "react";

import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ModalTitle } from "../../utils/StyledComponents";

function SkeletonModal(props) {
  const { title, closeAction } = props;
  return (
    <Box sx={{ position: "relative", height: "90%" }}>
      <IconButton
        onClick={closeAction}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
      >
        <CloseIcon />
      </IconButton>
      <ModalTitle align="center" sx={{width: "80%", paddingLeft: "10%", fontWeight:400}}>{title}</ModalTitle>
      <Box
        sx={{
          textAlign: "center",
          height: "90%",
          maxHeight: { xs: "80%", sm: "90%" },
          overflowY: "auto",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default SkeletonModal;
