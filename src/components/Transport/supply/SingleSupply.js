import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleSupply(props) {

    const [fechaAbastecimiento, setFechaAbastecimiento] = useState("");
    const [hora, setHora] = useState("");
    const [conductor, setConductor] = useState("");
    const [vehiculo, setVehiculo] = useState("");
    const [detalle, setDetalle] = useState("");
    const [observacion, setObservacion] = useState("");
    const [comentario, setComentario] = useState("");
    const [personaAutorizada, setPersonaAutorizada] = useState("");


    const { submitAction, buttonName, supply, edit } = props;

    useEffect(() => {
        if (supply) {

            setFechaAbastecimiento(supply.fechaAbastecimiento);
            setHora(supply.hora);
            setConductor(supply.conductor);
            setVehiculo(supply.vehiculo);
            setDetalle(supply.detalle);
            setObservacion(supply.observacion);
            setComentario(supply.comentario);
            setPersonaAutorizada(supply.personaAutorizada);
        }
    }, [supply]);

    const buildSupply = () => {
        return {fechaAbastecimiento, hora, conductor, vehiculo, detalle, observacion, comentario, personaAutorizada};


    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const supply = buildSupply();
            submitAction(supply);
        }}>


<ModalTextField
    size="small"
    label={"Fecha de Abastecimiento"}
    type="date"
    value={fechaAbastecimiento}
    required
    disabled={!edit}
    onChange={(e) => setFechaAbastecimiento(e.target.value)}
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

<ModalFormControl>
    <InputLabelGreyStyled id="vehiculo">Vehiculo</InputLabelGreyStyled>
    <Select
        size="small"
        labelId="vehiculo"
        value={vehiculo}
        disabled={!edit}
        label="Vehiculo"
        onChange={(e) => {
            setVehiculo(e.target.value);
        }}
    >
        <MenuItem value={"Vehiculo1"}>Vehiculo 1</MenuItem>
        <MenuItem value={"Vehiculo2"}>Vehiculo 2</MenuItem>
        {/* Otros valores para vehiculo */}
    </Select>
</ModalFormControl>

<ModalTextField
    size="small"
    label={"Detalle"}
    value={detalle}
    required
    disabled={!edit}
    onChange={(e) => setDetalle(e.target.value)}
    InputLabelProps={{
        style: {
            color: "#1b365d",
            fontWeight: 900,
        },
    }}
/>

<ModalTextField
    size="small"
    label={"Observación"}
    value={observacion}
    required
    disabled={!edit}
    onChange={(e) => setObservacion(e.target.value)}
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
        labelId="personaAutorizada"
        value={personaAutorizada}
        disabled={!edit}
        label="Persona Autorizada"
        onChange={(e) => {
            setPersonaAutorizada(e.target.value);
        }}
    >
        <MenuItem value={"Autorizada1"}>Persona Autorizada 1</MenuItem>
        <MenuItem value={"Autorizada2"}>Persona Autorizada 2</MenuItem>
        {/* Otros valores para persona autorizada */}
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

export default SingleSupply;