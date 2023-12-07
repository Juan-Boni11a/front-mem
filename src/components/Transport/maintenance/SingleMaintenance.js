import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleMaintenance(props) {

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [estacion, setEstacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [comentario, setComentario] = useState("");
  


    const { submitAction, buttonName, maintenance, edit } = props;

    useEffect(() => {
        if (maintenance) {
            setFecha(maintenance.fecha);
            setHora(maintenance.hora);
            setVehiculo(maintenance.vehiculo);
            setEstacion(maintenance.estacion);
            setObservaciones(maintenance.observaciones);
            setComentario(maintenance.comentario);

        }
    }, [maintenance]);

    const buildMaintenance = () => {
        return { fecha, hora, vehiculo, estacion, observaciones, comentario };

    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const maintenance = buildMaintenance();
            submitAction(maintenance);
        }}>
      
          
      <ModalTextField
    size="small"
    label={"Fecha"}
    type="date"
    value={fecha}
    required
    disabled={!edit}
    onChange={(e) => setFecha(e.target.value)}
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
    label={"Hora"}
    type="time"
    value={hora}
    required
    disabled={!edit}
    onChange={(e) => setHora(e.target.value)}
    InputLabelProps={{
        shrink: true,
        style: {
            color: "#1b365d",
            fontWeight: 900,
        },
    }}
/>


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

<ModalFormControl>
    <InputLabelGreyStyled id="estacion">Estacion</InputLabelGreyStyled>
    <Select
        size="small"
        labelId="estacion"
        value={estacion}
        disabled={!edit}
        label="Estacion"
        onChange={(e) => {
            setEstacion(e.target.value);
        }}
    >
        <MenuItem value={"Estacion1"}>Estacion 1</MenuItem>
        <MenuItem value={"Estacion2"}>Estacion 2</MenuItem>
        {/* Otros valores para estacion */}
    </Select>
</ModalFormControl>

      
            

<ModalTextField
  size="small"
  label={"Comentario"}
  multiline
  rows={4}
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

export default SingleMaintenance;