import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#fff",
      dark: "#091e45",
      main: "#0e2b63",
      light: "#3e5582",
    },
    secondary: {
      contrastText: "#fff",
      main: "#4a608a",
      dark: "#334360",
      light: "#6e7fa1",
    },
    buttons: {
      contrastText: "#fff",
      main: "#575757",
      light: "#a7a7a7",
    },
    text: {
      secondary: "#fff",
      disabled: "#554b4b",
      primary: "#000",
      grey: "#515151",
      link: "#0000FF",
      chatHour: "#9C9C9C",
    },
    background: {
      default: "#fefefe",
      paper: "#cfd4df",
      workspace: "#f3f4fb",
      grey: "#dedfe0",
    },
    success: {
      main: "rgba(0,0,150,0.9)",
    },
    info: {
      main: "#ffeb3b",
      red: "#923438",
      green: "#349238",
    },

    warning: {
      contrastText: "#fff",
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400],
    },
    error: {
      contrastText: "#fff",
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400],
    },
  },
});

export default theme;
