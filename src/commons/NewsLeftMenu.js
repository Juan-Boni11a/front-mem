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
    allowedRoles: ["test"],
    icon: <NewspaperIcon />,
  },
  { 
    id: 2,
    name: "usuarios",
    path: "/hemeroteca/users",
    allowedRoles: ["test"],
    icon: <PersonIcon />,
  },
  


  
];

function LeftMenu(props) {
  const { window, handleDrawerToggle, mobileOpen } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const currentUser = useRecoilValue(currentUserAtom);

  const setIsLoadingAllPage = useSetRecoilState(isLoadingAllPageAtom);

  const [userPermissions, setUserPermission] = useState([]);

  const [menu, setMenu] = useState([]);

  useEffect(() => {

    const loadInitialData = async () => {
      const permissions = currentUser.rolesPermissions;
      let permissionsToAdd = [];
      permissions.forEach((p) => {
        permissionsToAdd = [...permissionsToAdd, ...p.permissions];
      });

      const auxMenu = menuElements?.filter((me) => {
        for (let permission of me.allowedRoles) {
          if (permissionsToAdd.includes(permission)) return true;
        }
        return false;
      });
      
      setUserPermission(permissionsToAdd);
      setMenu(auxMenu);
    }


    if (currentUser) {
      setIsLoadingAllPage(true);

      loadInitialData()
        .then()
        .finally(_ => setIsLoadingAllPage(false));
    }
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
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
        <Menu menu={menu} userPermissions={userPermissions} />
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <MenuHeader handleDrawerToggle={handleDrawerToggle} />
        <Menu menu={menu} userPermissions={userPermissions} />
      </Drawer>
    </Box>
  )
}

export default LeftMenu