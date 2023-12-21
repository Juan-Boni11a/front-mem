import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleDrivers(props) {

 
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [disponible, setDisponible] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipoLicencia, setTipoLicencia] = useState("");
    const [caducidad, setCaducidad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");
    const [tipo, setTipo] = useState("");

    const { submitAction, buttonName, driver, edit } = props;

    useEffect(() => {
        if (driver) {
            setCedula(driver.cedula);
            setNombre(driver.Nombre);
            setDisponible(driver.disponible);
            setDireccion(driver.Direccion);
            setTelefono(driver.Telefono);
            setTipoLicencia(driver.TipoLicencia);
            setCaducidad(driver.Caducidad);
            setDepartamento(driver.Departamento);
            setProvincia(driver.Provincia);
            setTipo(driver.Tipo);
        }
    }, [driver]);

    const buildDriver = () => {
        return {
            cedula,
            nombre,
            disponible,
            direccion,
            telefono,
            tipoLicencia,
            caducidad,
            departamento,
            provincia,
            tipo,
        };
    }


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const driver = buildDriver();
            submitAction(driver);
        }}>
            <ModalTextField
                size="small"
                label={"Cédula"}
                value={cedula}
                required
                disabled={!edit}
                onChange={(e) => setCedula(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            <ModalTextField
                size="small"
                label={"Nombre"}
                value={nombre}
                required
                disabled={!edit}
                onChange={(e) => setNombre(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            <ModalTextField
            size="small"
            label={"Disponible"}
            value={disponible}
            required
            disabled={!edit}
            onChange={(e) => setDisponible(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Dirección"}
            value={direccion}
            required
            disabled={!edit}
            onChange={(e) => setDireccion(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Teléfono"}
            value={telefono}
            required
            disabled={!edit}
            onChange={(e) => setTelefono(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Tipo de Licencia"}
            value={tipoLicencia}
            required
            disabled={!edit}
            onChange={(e) => setTipoLicencia(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Caducidad"}
            value={caducidad}
            required
            disabled={!edit}
            onChange={(e) => setCaducidad(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Departamento"}
            value={departamento}
            required
            disabled={!edit}
            onChange={(e) => setDepartamento(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Provincia"}
            value={provincia}
            required
            disabled={!edit}
            onChange={(e) => setProvincia(e.target.value)}
            InputLabelProps={{
                style: {
                    color: "#1b365d",
                    fontWeight: 900,
                },
            }}
        />
        <ModalTextField
            size="small"
            label={"Tipo"}
            value={tipo}
            required
            disabled={!edit}
            onChange={(e) => setTipo(e.target.value)}
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

export default SingleDrivers;