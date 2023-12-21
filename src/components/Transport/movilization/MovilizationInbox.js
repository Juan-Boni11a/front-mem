import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allMovilizationAtom } from '../../../state/atoms/movilizationAtoms';
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from '@mui/material';
import { ModalContainer, StyledTableCell, StyledTableRow, ModalInputBox, ButtonStyled } from '../../../utils/StyledComponents';
import MainLayout from '../../../commons/MainLayout';
import WorkspaceHeader from '../../../commons/WorkspaceHeader';
import { getAllMovilization } from '../../../state/services/transportServices/movilizationServices';
import AddMovilization from '../movilization/AddMovilization';
import { Edit } from '@mui/icons-material';
import Decide from './Decide';


function MovilizationInbox() {
  const [actualMovilizationList, setActualMovilizationList] = useRecoilState(allMovilizationAtom);
  const [openMovilizationForm, setOpenMovilizationForm] = useState(false);
  const [openManageForm, setOpenManageForm] = useState(false);
  const [movilizationToShow, setMovilizationToShow] = useState(null);

  useEffect(() => {
    getMovilization();
  }, []);

  const getMovilization = () => {
    getAllMovilization().then((data) => {
      setActualMovilizationList(data);
    });
  };

  const callOpenMovilizationForm = () => {
    setOpenMovilizationForm(true);
  };

  const callOpenManageForm = (el) => {
    setMovilizationToShow(el);
    setOpenManageForm(true);
  };

  const closeModals = () => {
    setOpenMovilizationForm(false);
    setOpenManageForm(false);
    getMovilization();
  };

  return (
    <MainLayout>
      <WorkspaceHeader title="Bandeja de Entrada/Solicitud de Movilizacion" showSearch={false} onSearch={() => { }} />

      <Box sx={{ width: '100%', marginTop: '2vh', maxHeight: '70%', overflowY: 'auto' }}>
        <TableContainer component={Paper} sx={{ borderRadius: '10px', height: '100%' }}>
          <Table sx={{ minWidth: 700, height: '100%' }}>
            <TableHead>
              <TableRow>
                <StyledTableCell> </StyledTableCell>
                <StyledTableCell> Número de Orden </StyledTableCell>
                <StyledTableCell> Para </StyledTableCell>
                <StyledTableCell> Vigencia </StyledTableCell>
                <StyledTableCell> Estado </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actualMovilizationList?.map((cat, index) => {
                const dotColor = cat.estado === 'Aprobado' ? 'green' : (cat.estado === 'Pendiente' ? 'orange' : 'red');


                return (
                  <StyledTableRow key={cat.id}>
                    <StyledTableCell>
                      {' '}
                      <IconButton
                        size="small"
                        sx={{ marginX: 'auto' }}
                        onClick={() => {
                          callOpenManageForm(cat);
                          console.log(cat);
                        }}
                      >
                        <Edit></Edit>
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell> {cat.nOrden} </StyledTableCell>

                    <StyledTableCell> {cat.para} </StyledTableCell>

                    <StyledTableCell> {cat.vigencia} </StyledTableCell>
                    <StyledTableCell>
                      {cat.estado}{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          backgroundColor: dotColor,
                          borderRadius: '50%',
                          marginLeft: '5px',
                        }}
                      ></span>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>



      <ModalContainer open={openMovilizationForm}>
        <ModalInputBox>
          <AddMovilization onClose={closeModals}></AddMovilization>
        </ModalInputBox>
      </ModalContainer>

      <ModalContainer open={openManageForm}>
        <ModalInputBox>
          <Decide
            movilizationToShow={movilizationToShow}
            onClose={closeModals}
          ></Decide>
        </ModalInputBox>
      </ModalContainer>
    </MainLayout>
  );
}

export default MovilizationInbox;
