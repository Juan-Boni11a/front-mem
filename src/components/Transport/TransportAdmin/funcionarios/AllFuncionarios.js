import { useRecoilState } from "recoil";
import { allFuncionariosAtom } from "../../../../state/atoms/funcionarioAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody,
    IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../../../utils/StyledComponents";
import MainLayout from "../../../../commons/MainLayout";
import WorkspaceHeader from "../../../../commons/WorkspaceHeader";
import { getAllFuncionarios } from "../../../../state/services/transportServices/funcionarioServices";
import AddFuncionario from "./AddFuncionario";
import {  Edit } from "@mui/icons-material";
import ManageFuncionarios from "./ManageFuncionarios";

function AllFuncionarios() {

    const [actualFuncionarioList, setActualFuncionarioList] = useRecoilState(allFuncionariosAtom);
    const [openFuncionarioForm, setOpenFuncionarioForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [funcionarioToShow, setFuncionarioToShow] = useState(null);

    useEffect(() => {
        getFuncionario();
    }, []);

    const getFuncionario = () => {
        getAllFuncionarios().then((data) => {
            setActualFuncionarioList(data)
            
        })
    }

    const callOpenFuncionarioForm = () => {
        setOpenFuncionarioForm(true);
    }

    const callOpenManageForm = (el) => {
        setFuncionarioToShow(el);
        setOpenManageForm(true);
    }

    const closeModals = () => {

        setOpenFuncionarioForm(false);
        setOpenManageForm(false);
        getFuncionario();

    }


    return (

        <MainLayout>
            <WorkspaceHeader
                title="Administrador de Funcionarios"
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

                                <StyledTableCell> id </StyledTableCell>

                                <StyledTableCell> Nombre </StyledTableCell>

                                

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {
                                actualFuncionarioList?.map((cat, index) => {
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
                                           
                                            <StyledTableCell> {cat.id} </StyledTableCell>
                                            
                                            <StyledTableCell> {cat.name} </StyledTableCell>
                                          
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
                    onClick={callOpenFuncionarioForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openFuncionarioForm}>

                <ModalInputBox>

                    <AddFuncionario onClose={closeModals}>

                    </AddFuncionario>

                </ModalInputBox>

            </ModalContainer>

            <ModalContainer open={openManageForm}>

                <ModalInputBox>

                    <ManageFuncionarios funcionarioToShow={funcionarioToShow} onClose={closeModals}>

                    </ManageFuncionarios>

                </ModalInputBox>

            </ModalContainer>

        </MainLayout>
    )

}

export default AllFuncionarios;