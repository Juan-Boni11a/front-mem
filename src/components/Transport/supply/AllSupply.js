import { useRecoilState } from "recoil";
import { allSupplyAtom } from "../../../state/atoms/supplyAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../utils/StyledComponents";
import MainLayout from "../../../commons/MainLayout";
import WorkspaceHeader from "../../../commons/WorkspaceHeader";
import { getAllSupply } from "../../../state/services/transportServices/supplyServices";
import AddSupply from "./AddSupply";
import {  Edit } from "@mui/icons-material";
import ManageSupply from "./ManageSupply";

function AllSupply() {

    const [actualSupplyList, setActualSupplyList] = useRecoilState(allSupplyAtom);
    const [openSupplyForm, setOpenSupplyForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [supplyToShow, setSupplyToShow] = useState(null);

    useEffect(() => {
        getSupply();
    }, []);

    const getSupply = () => {
        getAllSupply().then((data) => {
            setActualSupplyList(data)
            
        })
    }

    const callOpenSupplyForm = () => {
        setOpenSupplyForm(true);
    }

    const callOpenManageForm = (el) => {
        setSupplyToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenSupplyForm(false);
        setOpenManageForm(false);
        getSupply();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Solicitud de Abastecimiento de Combustible"
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

                                <StyledTableCell> Fecha de Abastecimiento </StyledTableCell>

                                <StyledTableCell> Vehiculo </StyledTableCell>

                                <StyledTableCell> Conductor </StyledTableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualSupplyList?.map((cat, index) => {
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
                                            <StyledTableCell> {cat.fechaAbastecimiento} </StyledTableCell>
                                            </StyledTableCell>
                                            <StyledTableCell> {cat.vehiculo} </StyledTableCell>
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
                    onClick={callOpenSupplyForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openSupplyForm}>

                <ModalInputBox>

                    <AddSupply onClose={closeModals}>

                    </AddSupply>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageSupply supplyToShow={supplyToShow} onClose={closeModals}>

                    </ManageSupply>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllSupply;