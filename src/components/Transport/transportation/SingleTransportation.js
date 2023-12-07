import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleTransportation(props) {

    const [fechaSalida, setFechaSalida] = useState("");
    const [fechaRetorno, setFechaRetorno] = useState("");
    const [horaSalida, setHoraSalida] = useState("");
    const [horaRetorno, setHoraRetorno] = useState("");
    const [funcionario, setFuncionario] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [numeroAcompanantes, setNumeroAcompanantes] = useState(0);
    const [destino, setDestino] = useState("");
    const [duracionAproximada, setDuracionAproximada] = useState("");
    const [actividad, setActividad] = useState("");
    const [tiempoOcupacion, setTiempoOcupacion] = useState("");
    const [comentario, setComentario] = useState("");
    const [personaAutorizada, setPersonaAutorizada] = useState("");




    const { submitAction, buttonName, transportation, edit } = props;

    useEffect(() => {
        if (transportation) {

            setFechaSalida(transportation.fechaSalida);
            setFechaRetorno(transportation.fechaRetorno);
            setHoraSalida(transportation.horaSalida);
            setHoraRetorno(transportation.horaRetorno);
            setFuncionario(transportation.funcionario);
            setDepartamento(transportation.departamento);
            setNumeroAcompanantes(transportation.numeroAcompanantes);
            setDestino(transportation.destino);
            setDuracionAproximada(transportation.duracionAproximada);
            setActividad(transportation.actividad);
            setTiempoOcupacion(transportation.tiempoOcupacion);
            setComentario(transportation.comentario);
            setPersonaAutorizada(transportation.personaAutorizada);

        }
    }, [transportation]);

    const buildTransportation = () => {
        return {
            fechaSalida,
            fechaRetorno,
            horaSalida,
            horaRetorno,
            funcionario,
            departamento,
            numeroAcompanantes,
            destino,
            duracionAproximada,
            actividad,
            tiempoOcupacion,
            comentario,
            personaAutorizada,
        };



    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const Transportation = buildTransportation();
            submitAction(Transportation);
        }}>


            <ModalTextField
                size="small"
                label={"Fecha de Salida"}
                type="date"
                value={fechaSalida}
                required
                disabled={!edit}
                onChange={(e) => setFechaSalida(e.target.value)}
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
                label={"Fecha de Retorno"}
                type="date"
                value={fechaRetorno}
                required
                disabled={!edit}
                onChange={(e) => setFechaRetorno(e.target.value)}
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
                label={"Hora de Salida"}
                value={horaSalida}
                required
                disabled={!edit}
                onChange={(e) => setHoraSalida(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Hora de Retorno"}
                value={horaRetorno}
                required
                disabled={!edit}
                onChange={(e) => setHoraRetorno(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Funcionario"}
                value={funcionario}
                required
                disabled={!edit}
                onChange={(e) => setFuncionario(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalFormControl>
                <InputLabelGreyStyled id="departamento">Departamento</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="departamento"
                    value={departamento}
                    disabled={!edit}
                    label="Departamento"
                    onChange={(e) => {
                        setDepartamento(e.target.value);
                    }}
                >
                    <MenuItem value={"Departamento1"}>Departamento 1</MenuItem>
                    <MenuItem value={"Departamento2"}>Departamento 2</MenuItem>
                    {/* Otros valores para departamento */}
                </Select>
            </ModalFormControl>

            <ModalTextField
                size="small"
                label={"Número de Acompañantes"}
                type="number"
                value={numeroAcompanantes}
                required
                disabled={!edit}
                onChange={(e) => setNumeroAcompanantes(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Destino"}
                value={destino}
                required
                disabled={!edit}
                onChange={(e) => setDestino(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Duración Aproximada"}
                value={duracionAproximada}
                required
                disabled={!edit}
                onChange={(e) => setDuracionAproximada(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Actividad"}
                value={actividad}
                required
                disabled={!edit}
                onChange={(e) => setActividad(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Tiempo de Ocupación"}
                value={tiempoOcupacion}
                required
                disabled={!edit}
                onChange={(e) => setTiempoOcupacion(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />




            <ModalTextField
                size="small"
                label={"Funcionario"}
                value={funcionario}
                required
                disabled={!edit}
                onChange={(e) => setFuncionario(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalFormControl>
                <InputLabelGreyStyled id="departamento">Departamento</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="departamento"
                    value={departamento}
                    disabled={!edit}
                    label="Departamento"
                    onChange={(e) => {
                        setDepartamento(e.target.value);
                    }}
                >
                    <MenuItem value={"Departamento1"}>Departamento 1</MenuItem>
                    <MenuItem value={"Departamento2"}>Departamento 2</MenuItem>
                    {/* Otros valores para departamento */}
                </Select>
            </ModalFormControl>

            <ModalTextField
                size="small"
                label={"Actividad"}
                value={actividad}
                required
                disabled={!edit}
                onChange={(e) => setActividad(e.target.value)}
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

            <ModalTextField
                size="small"
                label={"Persona Autorizada"}
                value={personaAutorizada}
                required
                disabled={!edit}
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

export default SingleTransportation;