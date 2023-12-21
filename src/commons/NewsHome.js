import React from "react";
import { Box, Card, CardMedia, Divider } from "@mui/material";
import { TitleStyled } from "../utils/StyledComponents";
import SecondLayout from "./SecondLayout";
import WorkspaceHeader from "./WorkspaceHeader";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function NewsHome() {
  const messageNewsHome = sessionStorage.getItem("message-Home");
  const mainNewsHome = sessionStorage.getItem("main-Home");

  // Datos de ejemplo para el gráfico de pastel
  const data = [
    { name: "Estado 1", value: 30 },
    { name: "Estado 2", value: 45 },
    { name: "Estado 3", value: 25 },
  ];

  // Colores para las secciones del gráfico de pastel
  const colors = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <SecondLayout>
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
            {messageNewsHome}
          </TitleStyled>

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
              image={mainNewsHome}
              alt="Bienvenida"
            />
          </Card>
        </Box>
      </Box>
    </SecondLayout>
  );
}

export default NewsHome;
