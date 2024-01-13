import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../../utils/StyledComponents";
import { MenuItem, Select, Box, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import VehicleModal from "../../../../commons/transportCommons/VehicleModal";

import { getAllVehicles } from '../../../../state/services/transportServices/vehicleServices';
import { getAllDrivers } from '../../../../state/services/transportServices/driverServices';

import { getAdminUsers } from '../../../../state/services/transportServices/userServices';

import DriverModal from "../../../../commons/transportCommons/DriverModal";

function SingleMovilization(props) {

  const [estado, setEstado] = useState("Pendiente");
  const [tipoMovilizacion, setTipoMovilizacion] = useState("");
  const [para, setPara] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [conductor, setConductor] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [lugarEmision, setLugarEmision] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [horaEmision, setHoraEmision] = useState("");
  const [lugarCaducidad, setLugarCaducidad] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");
  const [horaCaducidad, setHoraCaducidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [personaAutorizada, setPersonaAutorizada] = useState("");
  const { submitAction, buttonName, movilization, edit } = props;

  useEffect(() => {
    if (movilization) {
      setEstado(movilization.estado);
      setTipoMovilizacion(movilization.tipoMovilizacion);
      setPara(movilization.para);
      setVigencia(movilization.vigencia);
      setConductor(movilization.conductor);
      setVehiculo(movilization.vehiculo);
      setLugarEmision(movilization.lugarEmision);
      setFechaEmision(movilization.fechaEmision);
      setHoraEmision(movilization.horaEmision);
      setLugarCaducidad(movilization.lugarCaducidad);
      setFechaCaducidad(movilization.fechaCaducidad);
      setHoraCaducidad(movilization.horaCaducidad);
      setMotivo(movilization.motivo);
      setComentario(movilization.comentario);
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

  //MODAL ASIGNAR VEHICULO
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
    setVehiculo(vehicle.nplaca); // Update vehiculo state with the selected vehicle name or ID
    closeVehicleModal();
  };
  //MODAL ASIGNAR CONDUCTOR
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverList, setDriverList] = useState([]);
  const openDriverModal = () => {
    setShowDriverModal(true);
    // Fetch the list of vehicles from your database using the imported function
    getAllDrivers()
      .then((data) => {
        // Assuming your API response has an array of vehicles
        const drivers = data || [];
        setDriverList(drivers);
      })
      .catch((error) => {
        console.error("Error al obtener lista de CONDUCTORES:", error);
        // Handle the error as needed (e.g., show an error message)
      });
  };
  const closeDriverModal = () => {
    setShowDriverModal(false);

  };
  const selectDriver = (driver) => {
    setSelectedDriver(driver);
    setConductor(driver.nombre); // Update vehiculo state with the selected vehicle name or ID
    closeDriverModal();
  };

  //Obtener lista de jefes de transporte
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    // Cargar los medios al montar el componente
    async function fetchNombres() {
      try {
        const usersData = await getAdminUsers();
        // Extraer los nombres de los medios
        const usersNombres = usersData.map((user) => user.username);
        setAdminUsers(usersNombres);
      } catch (error) {
        console.error('Error al cargar los Nombres:', error);
        // Manejar el error según tus necesidades
      }
    }

    fetchNombres();
  }, []);
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const movilization = buildMovilization();
      submitAction(movilization);
    }}>
      {/* Radio buttons PARA APROBAR ORDEN */}
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
            control={<Radio sx={{ color: 'orange' }} />} // Color de fondo naranja
            label="Pendiente"

          />
          <FormControlLabel
            value="Aprobado"
            control={<Radio sx={{ color: 'green' }} />} // Color de fondo verde
            label="Aprobado"

          />
          <FormControlLabel
            value="Rechazado"
            control={<Radio sx={{ color: 'red' }} />} // Color de fondo rojo
            label="Rechazado"

          />
        </RadioGroup>
      </FormControl>
 {/* MODAL ASIGNAR VEHICULO */}
      <div>
        <ButtonStyled
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            paddingX: "1rem",
            width: "50%",
            marginBottom: "10px", // Agrega un margen inferior para el espacio
          }}
          type="button"
          onClick={openVehicleModal}
        >
          Asignar Vehículo
        </ButtonStyled>
      </div>
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
          <p>Marca: {selectedVehicle.marca}</p>
          <p>Modelo: {selectedVehicle.modelo}</p>
          <p>Color: {selectedVehicle.color}</p>
        </div>
      )}

       {/* MODAL ASIGNAR CONDUCTOR */}
      <div>
        <ButtonStyled
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            paddingX: "1rem",
            width: "50%",
            marginBottom: "10px",
          }}
          type="button"
          onClick={openDriverModal}
        >
          Asignar Conductor
        </ButtonStyled>
      </div>
      {showDriverModal && (
        <DriverModal
          driverList={driverList}
          onSelectDriver={selectDriver}
          onClose={closeDriverModal}
        />
      )}
      {selectedDriver && (
        <div>
          <h2>Información de Conductor Seleccionado:</h2>
          <p>Nombre: {selectedDriver.nombre}</p>
          <p>Cedula: {selectedDriver.cedula}</p>
          <p>Contacto: {selectedDriver.telefono}</p>
        </div>
      )}

 {/* TIPO MOVILIZACION */}
      <ModalFormControl>
        <InputLabelGreyStyled id="tipoMov">Tipo de Movilización</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="tipoMovilizacion"
          value={tipoMovilizacion}
          disabled={edit}
          label="Tipo de Movilización"
          onChange={(e) => {
            setTipoMovilizacion(e.target.value);
          }}
        >
          <MenuItem value={"Autoridad"}>Autoridad</MenuItem>
          <MenuItem value={"Patio"}>Patio</MenuItem>
        </Select>
      </ModalFormControl>
 {/* PARA */}
      <ModalFormControl>
        <InputLabelGreyStyled id="Para">Para</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="para"
          value={para}
          disabled={edit}
          label="Para"
          onChange={(e) => {
            setPara(e.target.value);
          }}
        >
          <MenuItem value={"Conductor"}>Conductor</MenuItem>
          <MenuItem value={"Funcionario"}>Funcionario</MenuItem>
          <MenuItem value={"Funcionario y Conductor"}>Funcionario y Conductor</MenuItem>
          {/* Otros valores para conductor */}
        </Select>
      </ModalFormControl>

       {/* VIGENCIA */}
      <ModalFormControl>
        <InputLabelGreyStyled id="vigencia">Vigencia</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="vigencia"
          value={vigencia}
          disabled={edit}
          label="Vigencia"
          onChange={(e) => {
            setVigencia(e.target.value);
          }}
        >
          <MenuItem value={"Lunes a Viernes"}>Lunes a Viernes</MenuItem>
          <MenuItem value={"Lunes a Domingo"}>Lunes a Domingo</MenuItem>

          {/* Otros valores para conductor */}
        </Select>
      </ModalFormControl>
       {/* LUGAR EMISION*/}
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

       {/* FECHA EMISION*/}
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

       {/* HORA EMISION */}
      <ModalTextField
        size="small"
        label={"Hora de Emisión"}
        type="time"
        value={horaEmision}
        required
        disabled={edit}
        onChange={(e) => setHoraEmision(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

       {/* LUGAR CADUCIDAD*/}
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
       {/* FECHA CADUCIDAD */}
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
       {/* HORA CADUCIDAD */}
      <ModalTextField
        size="small"
        label={"Hora de Caducidad"}
        type="time"
        value={horaCaducidad}
        required
        disabled={edit}
        onChange={(e) => setHoraCaducidad(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />
       {/* MOTIVO*/}
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
       {/* COMENTARIO */}
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
 {/* PERSONA AUTORIZADA */}
<ModalFormControl>
        <InputLabelGreyStyled id="personaAutorizada">Persona Autorizada</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="personaAutorizadalabel"
          value={personaAutorizada}
          disabled={!edit}
          label="Persona Autorizada"
          onChange={(e) => {
            setPersonaAutorizada(e.target.value);
          }}
        >
          {adminUsers.map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </ModalFormControl>


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