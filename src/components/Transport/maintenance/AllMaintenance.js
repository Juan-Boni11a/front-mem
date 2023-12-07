import { useRecoilState } from "recoil";
import { allMaintenanceAtom } from "../../../state/atoms/maintenanceAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../utils/StyledComponents";
import MainLayout from "../../../commons/MainLayout";
import WorkspaceHeader from "../../../commons/WorkspaceHeader";
import { getAllMaintenance } from "../../../state/services/transportServices/maintenanceServices";
import AddMaintenance from "./AddMaintenance";
import {  Edit } from "@mui/icons-material";
import ManageMaintenance from "./ManageMaintenance";

function AllMaintenance() {

    const [actualMaintenanceList, setActualMaintenanceList] = useRecoilState(allMaintenanceAtom);
    const [openMaintenanceForm, setOpenMaintenanceForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [maintenanceToShow, setMaintenanceToShow] = useState(null);

    useEffect(() => {
        getMaintenance();
    }, []);

    const getMaintenance = () => {
        getAllMaintenance().then((data) => {
            setActualMaintenanceList(data)
            
        })
    }

    const callOpenMaintenanceForm = () => {
        setOpenMaintenanceForm(true);
    }

    const callOpenManageForm = (el) => {
        setMaintenanceToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenMaintenanceForm(false);
        setOpenManageForm(false);
        getMaintenance();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Solicitud de Mantenimiento"
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

                                <StyledTableCell> Vehiculo </StyledTableCell>

                                <StyledTableCell> Fecha </StyledTableCell>

                                <StyledTableCell> Hora </StyledTableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualMaintenanceList?.map((cat, index) => {
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
                                            <StyledTableCell>
                                            <StyledTableCell> {cat.vehiculo} </StyledTableCell>
                                            </StyledTableCell>
                                            <StyledTableCell> {cat.fecha} </StyledTableCell>
                                            <StyledTableCell> {cat.hora} </StyledTableCell>
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
                    onClick={callOpenMaintenanceForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openMaintenanceForm}>

                <ModalInputBox>

                    <AddMaintenance onClose={closeModals}>

                    </AddMaintenance>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageMaintenance maintenanceToShow={maintenanceToShow} onClose={closeModals}>

                    </ManageMaintenance>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllMaintenance;