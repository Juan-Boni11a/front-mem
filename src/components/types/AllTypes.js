import { useRecoilState, useRecoilValue } from "recoil";
import {
  allTypesAtom,
  allTypesByLevelAtom,
  typeSelectedAtom,
  typesTreeAtom,
} from "../../state/atoms/typeAtoms";
import { useState, useEffect } from "react";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Link,
  Breadcrumbs,
} from "@mui/material";
import {
  ModalContainer,
  StyledTableCell,
  StyledTableRow,
  ModalInputBox,
  ButtonStyled,
} from "../../utils/StyledComponents";
import MainLayout from "../../commons/MainLayout";
import WorkspaceHeader from "../../commons/WorkspaceHeader";
import AddType from "../types/AddType";
import { Edit } from "@mui/icons-material";
import ManageType from "../types/ManageType";
import { useType } from "../../state/hooks/useTypes";

function AllTypes() {
  const _ = useType();
  const types = useRecoilValue(allTypesByLevelAtom);
  const typesTree = useRecoilValue(typesTreeAtom);
  const [typeSelected, setTypeSelected] = useRecoilState(typeSelectedAtom);

  const [whereIAm, setWhereIAm] = useState([]);
  const [actualTypeList, setActualTypeList] = useState([]);
  const [openTypeForm, setOpenTypeForm] = useState(false);
  const [openManageForm, setOpenManageForm] = useState(false);
  const [typeToShow, setTypeToShow] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let tree = [
      <Link
        key={"level0"}
        onClick={() => {
          setTypeSelected(null);
        }}
      >
        {" "}
        Catálogos principales
      </Link>,
    ];

    if (typesTree) {
      typesTree.forEach((type) => {
        tree.push(
          <Link
            underline="hover"
            key={type.id}
            color="inherit"
            onClick={() => {
              setTypeSelected(type);
            }}
          >
            {type.name}
          </Link>
        );
      });
    }

    setWhereIAm(tree);
  }, [typesTree]);

  useEffect(() => {
    setActualTypeList(types);
    setFilter("");
  }, [types]);

  const callOpenTypeForm = () => {
    setOpenTypeForm(true);
  };

  const callOpenManageForm = (el) => {
    setTypeToShow(el);
    setOpenManageForm(true);
  };

  const closeModals = () => {
    setOpenTypeForm(false);
    setOpenManageForm(false);
  };

  const onSearch = () => {
    if(filter !== ""){
      const aux = actualTypeList.slice();
      let filtered = aux.filter((t) => 
        t.name.toUpperCase().includes(filter.toUpperCase()));
      setActualTypeList(filtered);
    }else{
      setActualTypeList(types);
    }
  }

  const changeFilter = (filter) => {
    setFilter(filter);
    if(filter !== ""){
      const aux = actualTypeList.slice();
      let filtered = aux.filter((t) => 
        t.name.toUpperCase().includes(filter.toUpperCase()));
      setActualTypeList(filtered);
    }else{
      setActualTypeList(types);
    }
  }

  return (
    <MainLayout>
      <WorkspaceHeader
        title="Catálogos"
        showSearch={true}
        searchFilter={filter}
        setSearchFilter={changeFilter}
        onSearch={onSearch}
        />

      <Box
        sx={{
          width: "100%",
          marginTop: "2vh",
          maxHeight: "70%",
          overflowY: "auto",
        }}
      >
        <Breadcrumbs separator="›" color="primary" sx={{ margin: "1rem" }}>
          {whereIAm}
        </Breadcrumbs>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: "10px", height: "100%" }}
        >
          <Table sx={{ minWidth: 700, height: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  {" "}
                  <Box />
                </StyledTableCell>

                <StyledTableCell> Código </StyledTableCell>

                <StyledTableCell> Nombre </StyledTableCell>

                <StyledTableCell> Valor </StyledTableCell>

                <StyledTableCell> Estado </StyledTableCell>

                <StyledTableCell> idPadre </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {actualTypeList?.map((typ, index) => {
                return (
                  <StyledTableRow key={typ.id}>
                    <StyledTableCell>
                      {""}
                      <IconButton
                        size="small"
                        sx={{ marginX: "auto" }}
                        onClick={() => {
                          callOpenManageForm(typ);
                        }}
                      >
                        <Edit></Edit>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setTypeSelected(typ);
                      }}
                    >
                      {typ.id}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setTypeSelected(typ);
                      }}
                    >
                      {typ.name}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setTypeSelected(typ);
                      }}
                    >
                      {typ.value}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setTypeSelected(typ);
                      }}
                    >
                      {typ.status === 0 ? "Inactivo" : "Activo"}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setTypeSelected(typ);
                      }}
                    >
                      {typ.parentId}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
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
          onClick={callOpenTypeForm}
        >
          Nuevo
        </ButtonStyled>
      </Box>

      <ModalContainer open={openTypeForm}>
        <ModalInputBox>
          <AddType onClose={closeModals}></AddType>
        </ModalInputBox>
      </ModalContainer>

      <ModalContainer open={openManageForm}>
        <ModalInputBox>
          <ManageType
            typeToShow={typeToShow}
            onClose={closeModals}
          ></ManageType>
        </ModalInputBox>
      </ModalContainer>
    </MainLayout>
  );
}

export default AllTypes;
