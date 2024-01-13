import React from 'react';
import Menu from "./menuElements/Menu";
import MenuHeader from "./menuElements/MenuHeader";
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


import { Box, Drawer } from '@mui/material';

const drawerWidth = 240;

const menuElements = [

  //GESTION DE TRANSPORTE

  {
    id: 1,
    name: "Mantenimiento",
    path: "/maintenance",
    allowedRoles: ["admin"],
    icon: <EngineeringIcon />,
  },
  {
    id: 2,
    name: "Movilización",
    path: "/movilization",
    allowedRoles: ["user","admin"],
    icon: <EmojiTransportationIcon />,
  },
  {
    id: 3,
    name: "Inbox Solicitud Movilizacion",
    path: "/movilization/inbox",
    allowedRoles: ["admin"],
    icon: <EmailIcon />,
  },
  {
    id: 4,
    name: "Inbox Solicitud Mantenimiento",
    path: "/maintenance/inbox",
    allowedRoles: ["xxx"],
    icon: <EmailIcon />,
  },

   { 
    id: 5,
    name: "users",
    path: "/transportation/users",
    allowedRoles: ["admin"],
    icon: <PersonIcon />,
  }
  ,
   { 
    id: 6,
    name: "vehicles",
    path: "/transportation/vehicles",
    allowedRoles: ["admin"],
    icon: <DirectionsCarIcon />,
  }
  ,
   { 
    id: 7,
    name: "drivers",
    path: "/transportation/drivers",
    allowedRoles: ["admin"],
    icon: <PersonIcon />,
  }


  
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
      </Box>
    );
  }
  
  export default LeftMenu;