import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import VehicleModal from "./VehicleModal";

import { getAllVehicles } from '../../../state/services/transportServices/vehicleServices';

function SingleMovilization(props) {

    const [estado, setEstado] = useState("Pendiente");

    // Tipo de Movilización
    const [tipoMovilizacion, setTipoMovilizacion] = useState("");

    // Para
    const [para, setPara] = useState("");

    // Vigencia
    const [vigencia, setVigencia] = useState("");

    // Conductor
    const [conductor, setConductor] = useState("");

    // Vehículo
    const [vehiculo, setVehiculo] = useState("");

    // Lugar de Emisión
    const [lugarEmision, setLugarEmision] = useState("");

    // Fecha de Emisión
    const [fechaEmision, setFechaEmision] = useState("");

    // Hora de Emisión
    const [horaEmision, setHoraEmision] = useState("");

    // Lugar de Caducidad
    const [lugarCaducidad, setLugarCaducidad] = useState("");

    // Fecha de Caducidad
    const [fechaCaducidad, setFechaCaducidad] = useState("");

    // Hora de Caducidad
    const [horaCaducidad, setHoraCaducidad] = useState("");

    // Motivo
    const [motivo, setMotivo] = useState("");

    // Comentario
    const [comentario, setComentario] = useState("");

    // Persona Autorizada
    const [personaAutorizada, setPersonaAutorizada] = useState("");




    const { submitAction, buttonName, movilization, edit } = props;

    useEffect(() => {
        if (movilization) {

            setEstado(movilization.estado);
            // Tipo de Movilización
            setTipoMovilizacion(movilization.tipoMovilizacion);

            // Para
            setPara(movilization.para);

            // Vigencia
            setVigencia(movilization.vigencia);

            // Conductor
            setConductor(movilization.conductor);

            // Vehículo
            setVehiculo(movilization.vehiculo);

            // Lugar de Emisión
            setLugarEmision(movilization.lugarEmision);

            // Fecha de Emisión
            setFechaEmision(movilization.fechaEmision);

            // Hora de Emisión
            setHoraEmision(movilization.horaEmision);

            // Lugar de Caducidad
            setLugarCaducidad(movilization.lugarCaducidad);

            // Fecha de Caducidad
            setFechaCaducidad(movilization.fechaCaducidad);

            // Hora de Caducidad
            setHoraCaducidad(movilization.horaCaducidad);

            // Motivo
            setMotivo(movilization.motivo);

            // Persona Autorizada
            setPersonaAutorizada(movilization.personaAutorizada);


        }
    }, [movilization]);

    const buildMovilization = () => {
        return {
            estado,
            tipoMovilizacion,
            para,
            vigencia,
            conductor,
            vehiculo,
            lugarEmision,
            fechaEmision,
            horaEmision,
            lugarCaducidad,
            fechaCaducidad,
            horaCaducidad,
            motivo,
            comentario,
            personaAutorizada,
        };


    }

    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicleList, setVehicleList] = useState([]);

    const openVehicleModal = () => {
        setShowVehicleModal(true);
      
        // Fetch the list of vehicles from your database using the imported function
        getAllVehicles()
          .then((data) => {
            // Assuming your API response has an array of vehicles
            const vehicles = data || [];
            setVehicleList(vehicles);
          })
          .catch((error) => {
            console.error("Error fetching vehicle list:", error);
            // Handle the error as needed (e.g., show an error message)
          });
      };
    
      const closeVehicleModal = () => {
        setShowVehicleModal(false);
      };
    
      const selectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setVehiculo(vehicle.modelo); // Update vehiculo state with the selected vehicle name or ID
        closeVehicleModal();
      };

       // Function to check if the current time is within the specified range
  const isTimeInRange = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)

    const isMorningRange = (currentHour >= 6 && currentHour < 9) ||
      (currentHour === 9 && currentMinutes === 0);

    const isAfternoonRange = (currentHour >= 16 && currentHour < 20) ||
      (currentHour === 20 && currentMinutes === 0);

    return isMorningRange || isAfternoonRange;
  };

  // Function to check if the current day corresponds to the selectedVehicle's nplaca
  const isDayMatching = () => {
    const lastDigit = selectedVehicle.nplaca.slice(-1);

    switch (new Date().getDay()) {
      case 1: // Monday
        return lastDigit === '1' || lastDigit === '2';
      case 2: // Tuesday
        return lastDigit === '3' || lastDigit === '4';
      case 3: // Wednesday
        return lastDigit === '5' || lastDigit === '6';
      case 4: // Thursday
        return lastDigit === '7' || lastDigit === '8';
      case 5: // Friday
        return lastDigit === '9' || lastDigit === '0';
      default:
        return false;
    }
  };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const movilization = buildMovilization();
            submitAction(movilization);
        }}>





{/* Radio buttons */}
<FormControl component="fieldset" sx={{ marginTop: "1rem" }}>
            <RadioGroup
              row
              aria-label="estado"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <FormControlLabel
                value="Pendiente"
                control={<Radio />}
                label="Pendiente"
              />
              <FormControlLabel
                value="Aprobado"
                control={<Radio />}
                label="Aprobado"
              />
              <FormControlLabel
                value="Rechazado"
                control={<Radio />}
                label="Rechazado"
              />
            </RadioGroup>
          </FormControl>
<div>
          <ButtonStyled
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          paddingX: "1rem",
          width: "30%",
        }}
        type="button"
        onClick={openVehicleModal}
      >
        Asignar Vehículo
      </ButtonStyled>
      </div>

      {/* ... (existing code) */}

      {showVehicleModal && (
        <VehicleModal
          vehicleList={vehicleList}
          onSelectVehicle={selectVehicle}
          onClose={closeVehicleModal}
        />
      )}
{selectedVehicle && (
        <div>
          <h2>Información de Vehiculo Seleccionado:</h2>
          <p>NPlaca: {selectedVehicle.nplaca}</p>
          <p>Modelo: {selectedVehicle.modelo}</p>

          {/* Display message "No puede Circular" based on time and day conditions */}
          {isTimeInRange() && isDayMatching() && (
            <p style={{ color: 'red' }}>No puede Circular</p>
          )}

          {/* Add more details as needed */}
        </div>
        )}

            <ModalTextField
                size="small"
                label={"Tipo de Movilización"}
                value={tipoMovilizacion}
                required
                disabled={edit}
                onChange={(e) => setTipoMovilizacion(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Para"}
                value={para}
                required
                disabled={edit}
                onChange={(e) => setPara(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Vigencia"}
                type="date"
                value={vigencia}
                required
                disabled={edit}
                onChange={(e) => setVigencia(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalFormControl>
                <InputLabelGreyStyled id="conductor">Conductor</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="conductor"
                    value={conductor}
                    disabled={edit}
                    label="Conductor"
                    onChange={(e) => {
                        setConductor(e.target.value);
                    }}
                >
                    <MenuItem value={"Conductor1"}>Conductor 1</MenuItem>
                    <MenuItem value={"Conductor2"}>Conductor 2</MenuItem>
                    {/* Otros valores para conductor */}
                </Select>
            </ModalFormControl>

            <ModalTextField
                size="small"
                label={"Lugar de Emisión"}
                value={lugarEmision}
                required
                disabled={edit}
                onChange={(e) => setLugarEmision(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Fecha de Emisión"}
                type="date"
                value={fechaEmision}
                required
                disabled={edit}
                onChange={(e) => setFechaEmision(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Hora de Emisión"}
                value={horaEmision}
                required
                disabled={edit}
                onChange={(e) => setHoraEmision(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Lugar de Caducidad"}
                value={lugarCaducidad}
                required
                disabled={edit}
                onChange={(e) => setLugarCaducidad(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Fecha de Caducidad"}
                type="date"
                value={fechaCaducidad}
                required
                disabled={edit}
                onChange={(e) => setFechaCaducidad(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Hora de Caducidad"}
                value={horaCaducidad}
                required
                disabled={edit}
                onChange={(e) => setHoraCaducidad(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Motivo"}
                value={motivo}
                required
                disabled={edit}
                onChange={(e) => setMotivo(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Comentario"}
                value={comentario}
                required
                disabled={edit}
                onChange={(e) => setComentario(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Persona Autorizada"}
                value={personaAutorizada}
                required
                disabled={false}
                onChange={(e) => setPersonaAutorizada(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />





            {edit &&
                <Box
                    sx={{
                        height: "10%",
                        maxHeight: "10%",
                        textAlign: "center",
                        paddingTop: "2%",
                    }}
                >
                    <ButtonStyled
                        sx={{
                            backgroundColor: (theme) => theme.palette.primary.light,
                            paddingX: "1rem",
                            width: "30%",
                        }}
                        type="submit"
                        disabled={!edit}
                    >
                        {buttonName}
                    </ButtonStyled>
                </Box>
            }
        </form>
    );

}

export default SingleMovilization;