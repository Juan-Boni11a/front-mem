import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";
import { getAdminUsers, getAllUsers } from "../../../state/services/transportServices/userServices";

function SingleMovilization(props) {

    //Declaración de Variables
    const [tipoMovilizacion, setTipoMovilizacion] = useState("");
    const [para, setPara] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [mailSolicitante, setMailSolicitante] = useState("");
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
            setTipoMovilizacion(movilization.tipoMovilizacion);
            setPara(movilization.para);
            setSolicitante(sessionStorage.getItem("userName") || "");
            setMailSolicitante(sessionStorage.getItem("userMail") || "");
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
            tipoMovilizacion,
            para,
            solicitante: sessionStorage.getItem("userName") || "",
            mailSolicitante: sessionStorage.getItem("userMail") || "",
            vigencia,
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
 //Obtener lista de jefes de transporte
 const [adminUsers, setAdminUsers] = useState([]);
    useEffect(() => {

        async function fetchNombres() {
          try {
            const usersData = await getAdminUsers();
            // Extraer los nombres
            const usersNombres = usersData.map((user) => user.username);
            setAdminUsers(usersNombres);
          } catch (error) {
            console.error('Error al cargar los Nombres:', error);
            // Manejar el error según tus necesidades
          }
        }
    
        fetchNombres();
      }, []);

      const [errorFechaEmision, setErrorFechaEmision] = useState('');
  const [errorFechaCaducidad, setErrorFechaCaducidad] = useState('');

      const handleFechaEmisionChange = (e) => {
        const selectedDate = e.target.value;
        // Asegúrate de que la fecha seleccionada sea mayor o igual a la fecha actual
        if (selectedDate >= getFechaActual()) {
            setErrorFechaEmision("");
          setFechaEmision(selectedDate);
        } else {
          // Puedes mostrar un mensaje de error o tomar otra acción
          setErrorFechaEmision('Selecciona una fecha de emisión válida a partir de hoy');
        }
      };
      const handleFechaCaducidadChange = (e) => {
        const selectedDate = e.target.value;
        // Asegúrate de que la fecha seleccionada sea mayor o igual a la fecha de emisión
        if (selectedDate >= fechaEmision) {
            setErrorFechaCaducidad("");
          setFechaCaducidad(selectedDate);
        } else {
            setErrorFechaCaducidad('Selecciona una fecha de caducidad válida a partir de la fecha de emisión');
        }
      };
    
      const getFechaActual = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    return (


        <form onSubmit={(e) => {
            e.preventDefault();
            const movilization = buildMovilization();
            submitAction(movilization);
        }}>
            

<ModalFormControl>
                <InputLabelGreyStyled id="tipoMov">Tipo de Movilización</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="tipoMovilizacion"
                    value={tipoMovilizacion}
                    disabled={!edit}
                    label="Tipo de Movilización"
                    onChange={(e) => {
                        setTipoMovilizacion(e.target.value);
                    }}
                >
                    <MenuItem value={"Autoridad"}>Autoridad</MenuItem>
                    <MenuItem value={"Patio"}>Patio</MenuItem>

                    {/* Otros valores para conductor */}
                </Select>
            </ModalFormControl>
            <ModalFormControl>
                <InputLabelGreyStyled id="Para">Para</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="para"
                    value={para}
                    disabled={!edit}
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
<ModalFormControl>
                <InputLabelGreyStyled id="vigencia">Vigencia</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="vigencia"
                    value={vigencia}
                    disabled={!edit}
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
            <ModalTextField
                size="small"
                label={"Lugar de Emisión"}
                value={lugarEmision}
                required
                disabled={!edit}
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
                disabled={!edit}
                onChange={handleFechaEmisionChange}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
             {errorFechaEmision && <div style={{ color: 'red' }}>{errorFechaEmision}</div>}
            <ModalTextField
                size="small"
                label={"Hora de Emisión"}
                type="time"
                value={horaEmision}
                required
                disabled={!edit}
                onChange={(e) => setHoraEmision(e.target.value)}
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
                label={"Lugar de Caducidad"}
                value={lugarCaducidad}
                required
                disabled={!edit}
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
                disabled={!edit}
                onChange={handleFechaCaducidadChange}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            {errorFechaCaducidad && <div style={{ color: 'red' }}>{errorFechaCaducidad}</div>}
            <ModalTextField
                size="small"
                label={"Hora de Caducidad"}
                type="time"
                value={horaCaducidad}
                required
                disabled={!edit}
                onChange={(e) => setHoraCaducidad(e.target.value)}
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
                label={"Motivo"}
                value={motivo}
                required
                disabled={!edit}
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
                disabled={!edit}
                onChange={(e) => setComentario(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

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