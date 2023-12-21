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
          width: 300,
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
            <ListItem key={vehicle.nplaca}>
              {vehicle.modelo}
              {vehicle.nplaca}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onSelectVehicle(vehicle)}
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
