import { SxProps, Theme } from "@mui/material/styles";

/** Quiet surface for interactive lists and forms — not a heavy card. */
export const panelSx: SxProps<Theme> = {
  bgcolor: "background.default",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 0,
  maxWidth: "100%",
  minWidth: 0,
  boxSizing: "border-box",
};

export const listPanelSx: SxProps<Theme> = {
  ...panelSx,
  py: 0,
  listStyle: "none",
  m: 0,
};

export const rowDividerSx: SxProps<Theme> = {
  borderBottom: "1px solid",
  borderColor: "divider",
  "&:last-child": { borderBottom: 0 },
};

export const btnMotionSx: SxProps<Theme> = {
  transition: "transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
  "&:hover": { transform: "translateY(-2px)" },
  "&:active": { transform: "translateY(1px)" },
};
