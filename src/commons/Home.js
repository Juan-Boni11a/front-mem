import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow, TitleStyled } from "../utils/StyledComponents";
import MainLayout from "./MainLayout";
import WorkspaceHeader from "./WorkspaceHeader";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { getAllAvailable, getAllBusy } from "../state/services/transportServices/vehicleServices";

import { getAllMovilization } from "../state/services/transportServices/movilizationServices";
import { allMovilizationAtom } from "../state/atoms/movilizationAtoms";
import { useRecoilState } from "recoil";
import { Edit } from "@mui/icons-material";

function Home() {

  const [actualMovilizationList, setActualMovilizationList] = useRecoilState(allMovilizationAtom);

  useEffect(() => {
    getMovilization();
  });

  const getMovilization = () => {
    getAllMovilization().then((data) => {
      setActualMovilizationList(data);
    });
  };




  const mainHome = sessionStorage.getItem("main-home");

  const [autosDisponibles, setAutosDisponibles] = useState(0);
  const [autosOcupados, setAutosOcupados] = useState(0);

  // Datos de ejemplo para el gráfico de pastel
  const data = [
    { name: "Autos Disponibles", value: autosDisponibles },
    { name: "Autos Ocupados", value: autosOcupados },
  ];



  const handleActualizarClick = async () => {
    try {
      // Hacer la llamada al servicio de vehículos disponibles
      const responseAvailable = await getAllAvailable();

      // Actualizar el estado con los valores obtenidos de vehículos disponibles
      setAutosDisponibles(responseAvailable);

      // Hacer la llamada al servicio de vehículos ocupados
      const responseBusy = await getAllBusy();

      // Actualizar el estado con los valores obtenidos de vehículos ocupados
      setAutosOcupados(responseBusy);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Hacer la llamada a los servicios cuando el componente se monte
    const fetchData = async () => {
      try {
        const responseAvailable = await getAllAvailable();
        setAutosDisponibles(responseAvailable);

        const responseBusy = await getAllBusy();
        setAutosOcupados(responseBusy);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente


  // Colores para las secciones del gráfico de pastel
  const colors = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <MainLayout>
      <WorkspaceHeader title="Inicio" showSearch={false} onSearch={null} />
      <Box sx={{ width: "100%", height: "70vh" }}>
        <Divider />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            padding: 1,
            height: "100%",
          }}
        >
          <TitleStyled
            sx={{
              padding: "1rem",
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {"Sistema Gestión de Transporte"}
          </TitleStyled>

          {/* Agregar controles para ingresar valores */}
          <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>

            <Button variant="contained" onClick={handleActualizarClick}>
              Actualizar
            </Button>
          </Box>

          {/* Agregar encabezado */}
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Disponibilidad de Vehículos
          </Typography>

          {/* Agregar gráfico de pastel */}
          <Card
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column", // Ajustar la dirección del gráfico
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>


 {/* Agregar encabezado */}
 <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Ordenes de Movilización en Curso
          </Typography>
            <Box sx={{ width: '100%', marginTop: '2vh', maxHeight: '70%', overflowY: 'auto' }}>
              <TableContainer component={Paper} sx={{ borderRadius: '10px', height: '100%' }}>
                <Table sx={{ minWidth: 700, height: '100%' }}>
                  <TableHead>
                    <TableRow>

                      <StyledTableCell> Conductor </StyledTableCell>
                      <StyledTableCell> Vehiculo </StyledTableCell>
                      <StyledTableCell> Número de Orden </StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {actualMovilizationList?.map((cat, index) => {
                      const dotColor = cat.estado === 'Aprobado' ? 'green' : (cat.estado === 'Pendiente' ? 'orange' : 'red');


                      return (
                        <StyledTableRow key={cat.id}>


                          <StyledTableCell> {cat.conductor} </StyledTableCell>
                          <StyledTableCell> {cat.vehiculo} </StyledTableCell>
                          <StyledTableCell> {cat.nOrden} </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>




            <CardMedia
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              component="img"
              image={mainHome}
              alt="Bienvenida"
            />
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;