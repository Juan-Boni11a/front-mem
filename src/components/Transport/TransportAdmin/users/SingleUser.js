import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";

function SingleUser(props) {

 
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rolId, setRolId] = useState("");
    const [roles, setRoles] = useState("");

    const { submitAction, buttonName, user, edit } = props;

    useEffect(() => {
        if (user) {
            setUserName(user.username);

            setPassword(user.password);

            setRoles(user.roles);

            setRolId(user.rolId);
        }
    }, [user]);

    const buildUser = () => {
        return {
            username,
            password,
            rolId,
            roles,
        };


    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const user = buildUser();
            submitAction(user);
        }}>


            <ModalTextField
                size="small"
                label={"Nombre de Usuario"}
                value={username}
                required
                disabled={!edit}
                onChange={(e) => setUserName(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

            <ModalTextField
                size="small"
                label={"Password"}
                value={password}
                required
                disabled={!edit}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: "#1b365d",
                        fontWeight: 900,
                    },
                }}
            />

<ModalFormControl>
                <InputLabelGreyStyled id="roles">Rol</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="role"
                    value={roles}
                    disabled={!edit}
                    label="Role"
                    onChange={(e) => {
                        setRolId(e.target.value);
                    }}
                >
                    <MenuItem value={"user"}>Usuario</MenuItem>
                    <MenuItem value={"admin"}>Administrador</MenuItem>
                </Select>
            </ModalFormControl>

            <ModalFormControl>
                <InputLabelGreyStyled id="roles">Rol</InputLabelGreyStyled>
                <Select
                    size="small"
                    labelId="role"
                    value={roles}
                    disabled={!edit}
                    label="Role"
                    onChange={(e) => {
                        setRoles(e.target.value);
                    }}
                >
                    <MenuItem value={"Hemeroteca User"}>Usuario</MenuItem>
                    <MenuItem value={"Hemeroteca Admin"}>Administrador</MenuItem>
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

export default SingleUser;