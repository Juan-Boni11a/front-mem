import { useRecoilState } from "recoil";
import { allTransportationAtom } from "../../../state/atoms/transportationAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../utils/StyledComponents";
import MainLayout from "../../../commons/MainLayout";
import WorkspaceHeader from "../../../commons/WorkspaceHeader";
import { getAllTransportation } from "../../../state/services/transportServices/transportationServices";
import AddTransportation from "./AddTransportation";
import {  Edit } from "@mui/icons-material";
import ManageTransportation from "./ManageTransportation";

function AllTransportation() {

    const [actualTransportationList, setActualTransportationList] = useRecoilState(allTransportationAtom);
    const [openTransportationForm, setOpenTransportationForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [transportationToShow, setTransportationToShow] = useState(null);

    useEffect(() => {
        getTransportation();
    }, []);

    const getTransportation = () => {
        getAllTransportation().then((data) => {
            setActualTransportationList(data)
            
        })
    }

    const callOpenTransportationForm = () => {
        setOpenTransportationForm(true);
    }

    const callOpenManageForm = (el) => {
        setTransportationToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenTransportationForm(false);
        setOpenManageForm(false);
        getTransportation();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Solicitud de Transporte"
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

                                <StyledTableCell> Funcionario </StyledTableCell>

                                <StyledTableCell> Fecha Salida </StyledTableCell>

                                <StyledTableCell> Destino </StyledTableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualTransportationList?.map((cat, index) => {
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
                                            <StyledTableCell> {cat.funcionario} </StyledTableCell>
                                            </StyledTableCell>
                                            <StyledTableCell> {cat.fechaSalida} </StyledTableCell>
                                            <StyledTableCell> {cat.destino} </StyledTableCell>
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
                    onClick={callOpenTransportationForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openTransportationForm}>

                <ModalInputBox>

                    <AddTransportation onClose={closeModals}>

                    </AddTransportation>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageTransportation transportationToShow={transportationToShow} onClose={closeModals}>

                    </ManageTransportation>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllTransportation;