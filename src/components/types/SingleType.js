import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { typeSelectedAtom } from "../../state/atoms/typeAtoms";

function SingleType(props){
    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [status, setStatus] = useState(0);
    const [parentId, setParentId] = useState(null);
    const typeSelected = useRecoilValue(typeSelectedAtom);
    const {submitAction, buttonName, type, edit} = props;
    
    useEffect(() => {
        if(type){
            setId(type.id);
            setName(type.name);
            setValue(type.value);
            setStatus(type.status);
            setParentId(typeSelected?typeSelected.id:type.parentId);
        }
    }, [type] );

    const buildType = () =>{
        return ({id, name, value, status, parentId: typeSelected?typeSelected.id:null});
    }

    return(
        <form onSubmit={(e) =>{
            e.preventDefault();
            const type = buildType();
            submitAction(type);
        }}>
             <ModalTextField
                    size="small"
                    label={"Nombre"}
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

            <ModalTextField
                    size="small"
                    label={"Valor"}
                    value={value}
                    required
                    disabled={!edit}
                    onChange={(e) => setValue(e.target.value)}
                    InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                    }}
            />


            <ModalFormControl>
                <InputLabelGreyStyled id="status">Estado</InputLabelGreyStyled>
                <Select
                size="small"
                labelId="status"
                value={status}
                disabled={!edit}
                label="Estado"
                onChange={(e) => {
                    setStatus(e.target.value);
                }}
                >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
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

export default SingleType;