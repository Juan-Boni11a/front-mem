import { useRecoilState } from "recoil";
import { allNewsAtom } from "../../state/atoms/newsAtoms";
import { useState, useEffect } from "react";
import {
    Box, TableContainer, Paper, Table, TableHead, TableRow,
    TableBody, TablePagination, IconButton, Avatar
} from "@mui/material";
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from "../../utils/StyledComponents";
import MainLayout from "../../commons/MainLayout";
import WorkspaceHeader from "../../commons/WorkspaceHeader";
import { getAllNews } from "../../state/services/catalogServices/newsServices";
import AddNews from "./AddNews";
import { Edit } from "@mui/icons-material";
import ManageNews from "./ManageNews";

function AllNews() {
    const [actualNewsList, setActualNewsList] = useRecoilState(allNewsAtom);
    const [openNewsForm, setOpenNewsForm] = useState(false);
    const [openManageForm, setOpenManageForm] = useState(false);
    const [newsToShow, setNewsToShow] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust the number of rows per page as needed

    useEffect(() => {
        getNews();
    }, []);

    const getNews = () => {
        getAllNews().then((data) => {
            setActualNewsList(data);
        });
    };

    const callOpenNewsForm = () => {
        setOpenNewsForm(true);
    };

    const callOpenManageForm = (el) => {
        setNewsToShow(el);
        setOpenManageForm(true);
    };

    const closeModals = () => {
        setOpenNewsForm(false);
        setOpenManageForm(false);
        getNews();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MainLayout>
            <WorkspaceHeader title="Noticias" showSearch={false} onSearch={() => {}} />

            <Box sx={{ width: "100%", marginTop: "2vh", maxHeight: "70%", overflowY: "auto" }}>
                
                <TableContainer component={Paper} sx={{ borderRadius: "10px", height: "100%" }}>
                    <Table sx={{ minWidth: 700, height: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell> </StyledTableCell>
                                <StyledTableCell> Imagen </StyledTableCell>
                                <StyledTableCell> Resumen </StyledTableCell>
                                <StyledTableCell> Fecha </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? actualNewsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : actualNewsList
                            ).map((cat, index) => {
                                return (
                                    <StyledTableRow key={cat.id}>
                                        <StyledTableCell>
                                            {""}
                                            <IconButton
                                                size="small"
                                                sx={{ marginX: "auto" }}
                                                onClick={() => {
                                                    callOpenManageForm(cat);
                                                    console.log(cat);
                                                }}
                                            >
                                                <Edit></Edit>
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <img
                                                src={`data:image/jpeg;base64,${cat.imagen}`}
                                                alt="Imagen de la noticia"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell> {cat.resumen} </StyledTableCell>
                                        <StyledTableCell> {cat.fechaNoticia} </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={actualNewsList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
                    onClick={callOpenNewsForm}
                >
                    Nuevo
                </ButtonStyled>
            </Box>

            <ModalContainer open={openNewsForm}>
                <ModalInputBox>
                    <AddNews onClose={closeModals}></AddNews>
                </ModalInputBox>
            </ModalContainer>

            <ModalContainer open={openManageForm}>
                <ModalInputBox>
                    <ManageNews newsToShow={newsToShow} onClose={closeModals}></ManageNews>
                </ModalInputBox>
            </ModalContainer>
        </MainLayout>
    );
}

export default AllNews;
