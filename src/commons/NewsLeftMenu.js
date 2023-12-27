import React, { useEffect, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  currentUserAtom,
  isLoadingAllPageAtom,
} from "../state/atoms/generalAtom";

import Menu from "./menuElements/Menu";
import MenuHeader from "./menuElements/MenuHeader";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import { Box, Drawer } from '@mui/material';

const drawerWidth = 240;

const menuElements = [

  //GESTION DE TRANSPORTE

 
 { 
    id: 1,
    name: "hemeroteca",
    path: "/hemeroteca",
    allowedRoles: ["Hemeroteca User","Hemeroteca Admin"],
    icon: <NewspaperIcon />,
  },
  { 
    id: 2,
    name: "usuarios",
    path: "/hemeroteca/users",
    allowedRoles: ["Hemeroteca Admin"],
    icon: <PersonIcon />,
  },
  


  
];

function LeftMenu(props) {
  // Obtén la información sobre los roles del usuario
  const userRoles = JSON.parse(sessionStorage.getItem("userRoles")) || [];

  // Filtra los elementos de menú según los roles del usuario
  const filteredMenu = menuElements.filter(menuItem =>
    menuItem.allowedRoles.some(role => userRoles.includes(role))
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          border: "none",
        }}
        open
      >
        <MenuHeader />
        <Menu menu={filteredMenu} />
      </Drawer>
      {/* Resto del código... */}
    </Box>
  );
}

export default LeftMenu