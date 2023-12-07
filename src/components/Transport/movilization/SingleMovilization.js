import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleMovilization(props) {

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

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const movilization = buildMovilization();
            submitAction(movilization);
        }}>


            <ModalTextField
                size="small"
                label={"Tipo de Movilización"}
                value={tipoMovilizacion}
                required
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                    disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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

export default SingleMovilization;