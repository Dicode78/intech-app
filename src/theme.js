import { createTheme } from "@mui/material/styles";

// Définir les couleurs personnalisées
const theme = createTheme({
  palette: {
    primary: {
      main: "#E56B01", // Orange middle
    },
    secondary: {
      main: "#B41A08", // Orange dark
    },
    warning: {
      main: "#EF7D00", // Orange clair
    },
    grey: {
      light: "#F1F1F1", // Gris clair
      dark: "#373638", // Noir
    },
    common: {
      white: "#FFFFFF", // Blanc
    },
  },
  typography: {
    fontFamily: "Neo Sans Std, Arial, sans-serif",
    bold: {
      fontFamily: "Neo Sans Std Bold, Arial, sans-serif",
    },
    medium: {
      fontFamily: "Neo Sans Std Medium, Arial, sans-serif",
    },
    italic: {
      fontFamily: "Neo Sans Std Italic, Arial, sans-serif",
    },
    black: {
      fontFamily: "Neo Sans Std Black, Arial, sans-serif",
    },
  },
});

export default theme;
