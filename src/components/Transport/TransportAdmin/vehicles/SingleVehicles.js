import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleVehicles(props) {
    const [nplaca, setNPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [color, setColor] = useState("");
    // ... (otras variables de estado para cada campo)

    const { submitAction, buttonName, vehicle, edit } = props;

    useEffect(() => {
        if (vehicle) {
            setNPlaca(vehicle.nplaca);
            setMarca(vehicle.marca);
            setModelo(vehicle.modelo);
            setColor(vehicle.color);
            // ... (otros campos)
        }
    }, [vehicle]);

    const buildVehicle = () => {
        return {
            nplaca,
            marca,
            modelo,
            color,
            // ... (otros campos)
        };
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const vehicle = buildVehicle();
            submitAction(vehicle);
        }}>
            <ModalTextField
                size="small"
                label={"Número de Placa"}
                value={nplaca}
                required
                disabled={!edit}
                onChange={(e) => setNPlaca(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            <ModalTextField
                size="small"
                label={"Marca"}
                value={marca}
                required
                disabled={!edit}
                onChange={(e) => setMarca(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            <ModalTextField
                size="small"
                label={"Modelo"}
                value={modelo}
                required
                disabled={!edit}
                onChange={(e) => setModelo(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            <ModalTextField
                size="small"
                label={"Color"}
                value={color}
                required
                disabled={!edit}
                onChange={(e) => setColor(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />
            {/* ... (otros campos) */}
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

export default SingleVehicles;
