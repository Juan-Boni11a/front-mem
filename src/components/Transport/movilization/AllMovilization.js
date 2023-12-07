import { useRecoilState } from "recoil";
import { allMovilizationAtom } from "../../../state/atoms/movilizationAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../utils/StyledComponents";
import MainLayout from "../../../commons/MainLayout";
import WorkspaceHeader from "../../../commons/WorkspaceHeader";
import { getAllMovilization } from "../../../state/services/transportServices/movilizationServices";
import AddMovilization from "./AddMovilization";
import {  Edit } from "@mui/icons-material";
import ManageMovilization from "./ManageMovilization";

function AllMovilization() {

    const [actualMovilizationList, setActualMovilizationList] = useRecoilState(allMovilizationAtom);
    const [openMovilizationForm, setOpenMovilizationForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [movilizationToShow, setMovilizationToShow] = useState(null);

    useEffect(() => {
        getMovilization();
    }, []);

    const getMovilization = () => {
        getAllMovilization().then((data) => {
            setActualMovilizationList(data)
            
        })
    }

    const callOpenMovilizationForm = () => {
        setOpenMovilizationForm(true);
    }

    const callOpenManageForm = (el) => {
        setMovilizationToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenMovilizationForm(false);
        setOpenManageForm(false);
        getMovilization();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Solicitud de Movilización"
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

                                <StyledTableCell> Tipo </StyledTableCell>

                                <StyledTableCell> Para </StyledTableCell>

                                <StyledTableCell> Conductor </StyledTableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualMovilizationList?.map((cat, index) => {
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
                                            <StyledTableCell> {cat.tipoMovilizacion} </StyledTableCell>
                                            </StyledTableCell>
                                            <StyledTableCell> {cat.para} </StyledTableCell>
                                            <StyledTableCell> {cat.conductor} </StyledTableCell>
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
                    onClick={callOpenMovilizationForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openMovilizationForm}>

                <ModalInputBox>

                    <AddMovilization onClose={closeModals}>

                    </AddMovilization>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageMovilization movilizationToShow={movilizationToShow} onClose={closeModals}>

                    </ManageMovilization>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllMovilization;