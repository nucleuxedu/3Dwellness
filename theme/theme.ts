import { createTheme } from "@mui/material/styles";

const ink = "#1c244b";
const brand = "#b5c94d";
const paper = "#ffffff";
const surface = "#f7f6f1";
const muted = "#324a6d";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: brand, contrastText: "#111111" },
    secondary: { main: ink, contrastText: paper },
    background: { default: paper, paper: surface },
    text: { primary: ink, secondary: muted },
    divider: "#d9d6cc",
  },
  typography: {
    fontFamily: '"Schibsted Grotesk", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
});

export default theme;
export { ink, brand, paper, surface, muted };
