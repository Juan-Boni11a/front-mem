import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function MenuItems(props) {
  const { open } = props;
  let navigate = useNavigate();

  const navigateTo = (nextPage) => {
    navigate(nextPage);
  };

  return (
    <Box>
      <List>
        {props.menu.map((mE) => (
          <ListItem key={mE.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                navigateTo(mE.path);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: (theme) => theme.palette.primary.contrastText,
                }}
              >
                {mE.icon}
              </ListItemIcon>
              <ListItemText primary={mE.name} sx={{ marginLeft: 4 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
    </Box>
  );
}

export default MenuItems;
