import { useRecoilState } from "recoil";
import { allVehiclesAtom } from "../../../../state/atoms/vehicleAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../../utils/StyledComponents";
import MainLayout from "../../../../commons/MainLayout";
import WorkspaceHeader from "../../../../commons/WorkspaceHeader";
import { getAllVehicles } from "../../../../state/services/transportServices/vehicleServices"; 
import AddVehicles from "./AddVehicles";
import {  Edit } from "@mui/icons-material";
import ManageVehicles from "./ManageVehicles";

function AllVehicles() {

    const [actualDriversList, setActualDriversList] = useRecoilState(allVehiclesAtom);
    const [openDriversForm, setOpenDriversForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [driversToShow, setDriversToShow] = useState(null);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = () => {
        getAllVehicles().then((data) => {
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
                title="Administrador de Vehiculos"
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

                                

                                <StyledTableCell> NPlaca </StyledTableCell>

                                <StyledTableCell>Marca</StyledTableCell>

                                <StyledTableCell> Modelo </StyledTableCell>

                                <StyledTableCell> Estado </StyledTableCell>

                                

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualDriversList?.map((cat, index) => {
                                    return (
                                        <StyledTableRow key={cat.nplaca}>
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
                                           
                                            <StyledTableCell> {cat.nplaca} </StyledTableCell>
                                            
                                            <StyledTableCell> {cat.marca} </StyledTableCell>

                                            <StyledTableCell> {cat.modelo} </StyledTableCell>

                                            <StyledTableCell> {cat.estado} </StyledTableCell>
                                          
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

                    <AddVehicles onClose={closeModals}>

                    </AddVehicles>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageVehicles driversToShow={driversToShow} onClose={closeModals}>

                    </ManageVehicles>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllVehicles;