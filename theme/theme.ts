import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    muted: Palette["primary"];
    inverse: Palette["primary"];
    border: Palette["primary"];
  }
  interface PaletteOptions {
    muted?: PaletteOptions["primary"];
    inverse?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    headlineDisplay: React.CSSProperties;
    headlineLg: React.CSSProperties;
    headlineMd: React.CSSProperties;
    headlineSm: React.CSSProperties;
    bodyLg: React.CSSProperties;
    labelLg: React.CSSProperties;
    labelMd: React.CSSProperties;
    labelSm: React.CSSProperties;
    navLink: React.CSSProperties;
    buttonText: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    headlineDisplay?: React.CSSProperties;
    headlineLg?: React.CSSProperties;
    headlineMd?: React.CSSProperties;
    headlineSm?: React.CSSProperties;
    bodyLg?: React.CSSProperties;
    labelLg?: React.CSSProperties;
    labelMd?: React.CSSProperties;
    labelSm?: React.CSSProperties;
    navLink?: React.CSSProperties;
    buttonText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headlineDisplay: true;
    headlineLg: true;
    headlineMd: true;
    headlineSm: true;
    bodyLg: true;
    labelLg: true;
    labelMd: true;
    labelSm: true;
    navLink: true;
    buttonText: true;
  }
}

const colors = {
  primary: "#B5C94D",
  primaryDark: "#1A1A14",
  secondary: "#333333",
  tertiary: "#E5E7EB",
  neutral: "#FFFFFF",
  surface: "#FFFFFF",
  onSurface: "#333333",
  background: "#FFFFFF",
  text: "#333333",
  accent: "#B5C94D",
  border: "#E5E7EB",
  muted: "#F7F8F3",
  inverse: "#1A1A14",
  error: "#B00020",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.neutral,
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.secondary,
    },
    divider: colors.border,
    muted: {
      main: colors.muted,
      contrastText: colors.onSurface,
    },
    inverse: {
      main: colors.inverse,
      contrastText: colors.neutral,
    },
    border: {
      main: colors.border,
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "85px",
      fontWeight: 600,
      lineHeight: "85px",
      letterSpacing: 0,
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "65px",
      fontWeight: 600,
      lineHeight: "78px",
      letterSpacing: 0,
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "42px",
      fontWeight: 600,
      lineHeight: "50px",
      letterSpacing: 0,
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "40px",
      letterSpacing: 0,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "30px",
      letterSpacing: 0,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: 0,
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: "24px",
      letterSpacing: 0,
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "20px",
      letterSpacing: 0,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: 0,
      textTransform: "none",
    },
    headlineDisplay: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "85px",
      fontWeight: 600,
      lineHeight: "85px",
      letterSpacing: 0,
    },
    headlineLg: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "65px",
      fontWeight: 600,
      lineHeight: "78px",
      letterSpacing: 0,
    },
    headlineMd: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "42px",
      fontWeight: 600,
      lineHeight: "50px",
      letterSpacing: 0,
    },
    headlineSm: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "40px",
      letterSpacing: 0,
    },
    bodyLg: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "20px",
      fontWeight: 300,
      lineHeight: "30px",
      letterSpacing: 0,
    },
    labelLg: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "0.02em",
    },
    labelMd: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.02em",
    },
    labelSm: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: "0.08em",
    },
    navLink: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: 0,
    },
    buttonText: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
          color: colors.text,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 400,
          textTransform: "none",
          padding: "16px 60px",
          height: 50,
          minWidth: 180,
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: colors.primaryDark,
          "&:hover": {
            backgroundColor: "#A8BC42",
            boxShadow: "none",
          },
        },
        outlinedSecondary: {
          backgroundColor: "transparent",
          color: colors.secondary,
          borderColor: colors.secondary,
          "&:hover": {
            backgroundColor: colors.muted,
            borderColor: colors.secondary,
            boxShadow: "none",
          },
        },
        text: {
          padding: 0,
          minWidth: 0,
          height: 24,
          color: colors.secondary,
          "&:hover": {
            backgroundColor: "transparent",
            color: colors.primaryDark,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          color: colors.onSurface,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          boxShadow: "none",
          padding: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.surface,
            borderRadius: 4,
            fontFamily: '"Poppins", sans-serif',
            fontSize: "16px",
            fontWeight: 300,
            "& fieldset": {
              borderColor: colors.border,
            },
            "&:hover fieldset": {
              borderColor: colors.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
              borderWidth: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.muted,
          color: colors.onSurface,
          borderRadius: 9999,
          fontFamily: '"Poppins", sans-serif',
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "0.02em",
          height: "auto",
          padding: "8px 4px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 60,
          paddingRight: 60,
          "@media (max-width:900px)": {
            paddingLeft: 28,
            paddingRight: 28,
          },
          "@media (max-width:600px)": {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
  },
});

export default theme;
export { colors };
