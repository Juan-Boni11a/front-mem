import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleFuncionario(props) {

 
    const [name, setName] = useState("");
    

    const { submitAction, buttonName, funcionario, edit } = props;

    useEffect(() => {
        if (funcionario) {
            setName(funcionario.name);
        }
    }, [funcionario]);

    const buildUser = () => {
        return {
            name,
        };


    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const funcionario = buildUser();
            submitAction(funcionario);
        }}>


            <ModalTextField
                size="small"
                label={"Nombre Funcionario"}
                value={name}
                required
                disabled={!edit}
                onChange={(e) => setName(e.target.value)}
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

export default SingleFuncionario;