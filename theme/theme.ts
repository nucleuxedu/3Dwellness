import { createTheme } from "@mui/material/styles";

const ink = "#050505";
const gold = "#D4AF37";
const surface = "#0A0A0B";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: gold, contrastText: ink },
    secondary: { main: "#00E5FF", contrastText: ink },
    background: { default: ink, paper: surface },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)" },
    divider: "rgba(255,255,255,0.1)",
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      letterSpacing: "-0.04em",
      lineHeight: 0.95,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      letterSpacing: "-0.02em",
    },
    body1: { fontWeight: 300, lineHeight: 1.7 },
    body2: { fontWeight: 300, lineHeight: 1.7 },
    button: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      fontWeight: 400,
      letterSpacing: "0.22em",
      textTransform: "none",
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth", backgroundColor: ink },
        body: {
          backgroundColor: ink,
          color: "#fff",
          overflowX: "hidden",
        },
        "::selection": { background: gold, color: ink },
        "::-webkit-scrollbar": { width: 10 },
        "::-webkit-scrollbar-track": { background: ink },
        "::-webkit-scrollbar-thumb": {
          background: "rgba(212,175,55,0.35)",
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 999 },
      },
    },
  },
});

export default theme;
export { ink, gold, surface };
