import React from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";

function VehicleModal({ vehicleList, onSelectVehicle, onClose }) {
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
          Select a Vehicle
        </Typography>
        <List>
          {vehicleList.map((vehicle) => (
            <ListItem
              key={vehicle.nplaca}
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
                <Typography variant="subtitle1">{vehicle.nplaca}</Typography>
                <Typography>Marca: {vehicle.marca}</Typography>
                <Typography>Modelo: {vehicle.modelo}</Typography>
                <Typography>Motor: {vehicle.motor}</Typography>
                <Typography>Serie: {vehicle.serie}</Typography>
                <Typography>Color: {vehicle.color}</Typography>
                <Typography>
                  Kilometraje Actual: {vehicle.kilometrajeActual}
                </Typography>
                <Typography>Estado: {vehicle.estado}</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onSelectVehicle(vehicle)}
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

export default VehicleModal;
