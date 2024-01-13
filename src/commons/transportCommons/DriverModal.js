import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";

function DriverModal({ driverList, onSelectDriver, onClose }) {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverSelection = (driver) => {
    setSelectedDriver(driver);
    onSelectDriver(driver);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, // Ajusta el ancho según tus necesidades
          maxHeight: 500, // Ajusta la altura máxima según tus necesidades
          overflowY: "auto", // Agrega scroll vertical si es necesario
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Select a Driver
        </Typography>
        <List>
          {driverList.map((driver) => (
            <ListItem
              key={driver.cedula}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderBottom: 1,
                borderColor: "divider",
                paddingBottom: 1,
                marginBottom: 1,
              }}
            >
              <div>
                <Typography variant="subtitle1">{driver.nombre}</Typography>
                <Typography>Cédula: {driver.cedula}</Typography>
                <Typography>Caducidad: {driver.caducidad}</Typography>
                <Typography>Disponible: {driver.disponible}</Typography>
                <Typography>Teléfono: {driver.telefono}</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleDriverSelection(driver)}
                sx={{ marginLeft: "auto" }}
              >
                Select
              </Button>
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default DriverModal;
