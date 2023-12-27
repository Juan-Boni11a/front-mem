import React, { useState } from "react";
import { Box, Button, Card, CardMedia, Divider, TextField } from "@mui/material";
import { TitleStyled } from "../utils/StyledComponents";
import MainLayout from "./MainLayout";
import WorkspaceHeader from "./WorkspaceHeader";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function Home() {
  const messageHome = sessionStorage.getItem("message-home");
  const mainHome = sessionStorage.getItem("main-home");

  const [autosDisponibles, setAutosDisponibles] = useState(30);
  const [autosOcupados, setAutosOcupados] = useState(70);

  // Datos de ejemplo para el gráfico de pastel
  const data = [
    { name: "Autos Disponibles", value: autosDisponibles },
    { name: "Autos Ocupados", value: autosOcupados },
  ];

  const handleAutosDisponiblesChange = (event) => {
    setAutosDisponibles(parseInt(event.target.value) || 0);
  };

  const handleAutosOcupadosChange = (event) => {
    setAutosOcupados(parseInt(event.target.value) || 0);
  };

  const handleActualizarClick = () => {
    // Puedes agregar lógica adicional si es necesario al actualizar los valores
  };

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
            {messageHome}
          </TitleStyled>

          {/* Agregar controles para ingresar valores */}
          <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
            <TextField
              label="Autos Disponibles"
              type="number"
              value={autosDisponibles}
              onChange={handleAutosDisponiblesChange}
            />
            <TextField
              label="Autos Ocupados"
              type="number"
              value={autosOcupados}
              onChange={handleAutosOcupadosChange}
            />
            <Button variant="contained" onClick={handleActualizarClick}>
              Actualizar
            </Button>
          </Box>

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