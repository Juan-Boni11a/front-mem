import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Divider, TextField } from "@mui/material";

import { ButtonStyled, TitleStyled } from "../utils/StyledComponents";

import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";

function HelloTransport({ setUser }) {
  const navigate = useNavigate();

  const secondaryHome = sessionStorage.getItem("secondary-home");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/transportation/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
      setUser(user);
      console.log(user);
        // Autenticación exitosa, puedes manejar el resultado aquí
        sessionStorage.setItem("userRoles", JSON.stringify(user.roles));
        sessionStorage.setItem("userName", user.username);
        sessionStorage.setItem("userMail", user.mail);
        console.log(user.mail);

        console.log('Login exitoso');
        navigate("/transportation-home");
        
      } else {
        // Autenticación fallida, puedes mostrar un mensaje de error al usuario
        console.error('Credenciales inválidas');
        
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      
    }
  };


  return (
    


<Box sx={{ display: "flex" }}>
<CssBaseline />
<Header handleDrawerToggle={null} />
<Divider />
<Box
  sx={{
    p: "10vh 0 0 0 ",
    backgroundColor: (theme) => theme.palette.background.paper,
    height: "100vh",
    maxHeight: "100vh",
    width: "100%",
    overflowY: "auto",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
  }}
>
  <Box
    sx={{
      p: { xs: "1rem", sm: "3rem" },
      width: { xs: "100%", lg: "90%" },
      maxWidth: "1200px",
      textAlign: "center",
    }}
  >
    <TitleStyled
      sx={{
        padding: "1rem",
        fontWeight: 700,
        color: (theme) => theme.palette.primary.main,
      }}
    >
      Bienvenido al Sistema de Gestión de Transporte
    </TitleStyled>
    
    
    
     {/* Formulario de Inicio de Sesión */}
<form>
  <TextField
    label="Correo"
    variant="outlined"
    fullWidth
    margin="normal"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <TextField
    label="Contraseña"
    type="password"
    variant="outlined"
    fullWidth
    margin="normal"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
    
  
    <ButtonStyled
      sx={{
        backgroundColor: (theme) => theme.palette.buttons.main,
      }}
      onClick={handleLogin}
    >
      Ingresar
    </ButtonStyled>

    </form>
    <Card
      sx={{
        justifyContent: "center",
        display: "flex",
        height: "50vh",
        margin: "1rem",
      }}
    >
      <CardMedia
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        component="img"
        image={secondaryHome}
        alt="Gracias por visitarnos"
      />
    </Card>
  </Box>
</Box>
</Box>

  );
}

export default HelloTransport;
