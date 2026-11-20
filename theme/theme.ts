import { createTheme } from "@mui/material/styles";

const ink = "#1c244b";
const brand = "#b5c94d";
const paper = "#ffffff";
const surface = "#f7f6f1";
const muted = "#324a6d";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: ink, contrastText: paper },
    secondary: { main: brand, contrastText: "#111111" },
    background: { default: paper, paper: surface },
    text: { primary: ink, secondary: muted },
    divider: "#e4e1d8",
  },
  typography: {
    fontFamily: '"Schibsted Grotesk", system-ui, sans-serif',
    h1: { fontWeight: 400, letterSpacing: "-0.035em", fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 },
    h2: { fontWeight: 400, letterSpacing: "-0.03em", fontSize: "clamp(32px, 3vw, 44px)", lineHeight: 1.1 },
    h3: { fontWeight: 500, fontSize: "1.05rem", letterSpacing: "-0.01em" },
    body1: { fontSize: "1.0625rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18, minHeight: 44 },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { paddingLeft: 20, paddingRight: 20 },
      },
    },
  },
});

export default theme;
export { ink, brand, paper, surface, muted };
