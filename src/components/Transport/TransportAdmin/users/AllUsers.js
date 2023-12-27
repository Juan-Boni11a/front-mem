import { useRecoilState } from "recoil";
import { allUsersAtom } from "../../../../state/atoms/userAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../../utils/StyledComponents";
import MainLayout from "../../../../commons/MainLayout";
import WorkspaceHeader from "../../../../commons/WorkspaceHeader";
import { getAllUsers } from "../../../../state/services/transportServices/userServices";
import AddUsers from "./AddUsers";
import {  Edit } from "@mui/icons-material";
import ManageUsers from "./ManageUsers";

function AllUsers() {

    const [actualUserList, setActualUserList] = useRecoilState(allUsersAtom);
    const [openUserForm, setOpenUserForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [userToShow, setUserToShow] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        getAllUsers().then((data) => {
            setActualUserList(data)
            
        })
    }

    const callOpenUserForm = () => {
        setOpenUserForm(true);
    }

    const callOpenManageForm = (el) => {
        setUserToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenUserForm(false);
        setOpenManageForm(false);
        getUser();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Administrador de Usuarios"
                showSearch={false}
                onSearch={() => { }}
            />

            <Box sx={{ width: "100%", marginTop: "2vh", maxHeight: "70%", overflowY: "auto", }}>

                <TableContainer component={Paper} sx={{ borderRadius: "10px", height: "100%" }}>

                    <Table sx={{ minWidth: 700, height: "100%" }}>

                        <TableHead>

                            <TableRow>

                                <StyledTableCell>
                                    {" "}
                                    <Box />
                                </StyledTableCell>

                                <StyledTableCell> Nombre </StyledTableCell>

                                <StyledTableCell> Rol Asignado </StyledTableCell>

                                

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualUserList?.map((cat, index) => {
                                    return (
                                        <StyledTableRow key={cat.id}>
                                            <StyledTableCell>
                                                {""}
                                                <IconButton
                                                    size="small"
                                                    sx={{ marginX: "auto" }}
                                                    onClick={() => {
                                                        callOpenManageForm(cat)
                                                        console.log(cat);
                                                        
                                                    }}

                                                >
                                                    <Edit></Edit>

                                                </IconButton>
                                            </StyledTableCell>
                                           
                                            <StyledTableCell> {cat.username} </StyledTableCell>
                                            
                                            <StyledTableCell> {cat.roles} </StyledTableCell>
                                          
                                        </StyledTableRow>
                                    )

                                })
                            }

                        </TableBody>

                    </Table>

                </TableContainer>


            </Box>

            <Box
                sx={{
                    textAlign: "center",
                }}
            >
                <ButtonStyled
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.light,
                        margin: 1,
                        width: "30%",
                    }}
                    onClick={callOpenUserForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openUserForm}>

                <ModalInputBox>

                    <AddUsers onClose={closeModals}>

                    </AddUsers>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageUsers userToShow={userToShow} onClose={closeModals}>

                    </ManageUsers>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllUsers;