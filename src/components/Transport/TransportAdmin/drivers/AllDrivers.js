import { useRecoilState } from "recoil";
import { allDriversAtom } from "../../../../state/atoms/driversAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../../utils/StyledComponents";
import MainLayout from "../../../../commons/MainLayout";
import WorkspaceHeader from "../../../../commons/WorkspaceHeader";
import { getAllDrivers } from "../../../../state/services/transportServices/driverServices";
import AddDrivers from "./AddDrivers";
import {  Edit } from "@mui/icons-material";
import ManageDriverss from "./ManageDrivers";

function AllDrivers() {

    const [actualDriversList, setActualDriversList] = useRecoilState(allDriversAtom);
    const [openDriversForm, setOpenDriversForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [driversToShow, setDriversToShow] = useState(null);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = () => {
        getAllDrivers().then((data) => {
            setActualDriversList(data)
            
        })
    }

    const callOpenDriversForm = () => {
        setOpenDriversForm(true);
    }

    const callOpenManageForm = (el) => {
        setDriversToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenDriversForm(false);
        setOpenManageForm(false);
        getDrivers();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Administrador de Conductores"
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

                                <StyledTableCell> Tipo Licencia </StyledTableCell>

                                <StyledTableCell> Telefono </StyledTableCell>

                                <StyledTableCell> Disponibilidad </StyledTableCell>

                                

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualDriversList?.map((cat, index) => {
                                    return (
                                        <StyledTableRow key={cat.cedula}>
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
                                           
                                            <StyledTableCell> {cat.nombre} </StyledTableCell>
                                            
                                            <StyledTableCell> {cat.tipoLicencia} </StyledTableCell>

                                            <StyledTableCell> {cat.telefono} </StyledTableCell>

                                            <StyledTableCell> {cat.disponible} </StyledTableCell>
                                          
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
                    onClick={callOpenDriversForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openDriversForm}>

                <ModalInputBox>

                    <AddDrivers onClose={closeModals}>

                    </AddDrivers>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageDriverss driversToShow={driversToShow} onClose={closeModals}>

                    </ManageDriverss>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllDrivers;