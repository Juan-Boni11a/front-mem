import React from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";

function DriverModal({ driverList, onSelectDriver, onClose }) {
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
          Select a Driver
        </Typography>
        <List>
          {driverList.map((driver) => (
            <ListItem key={driver.cedula}>
              {driver.nombre}
              {driver.telefono}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onSelectDriver(driver)}
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
