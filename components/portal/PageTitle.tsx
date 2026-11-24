import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function PageTitle({ title, children }: Props) {
  return (
    <Box sx={{ mb: { xs: 2.5, md: 4 }, maxWidth: { xs: "100%", md: 640 }, minWidth: 0 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: { xs: "1.65rem", md: "2.35rem" },
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          wordBreak: "break-word",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          mt: 1.25,
          width: 48,
          height: 3,
          bgcolor: "secondary.main",
          borderRadius: 1,
        }}
      />
      {children ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1.5, fontSize: { xs: "0.92rem", md: "0.98rem" }, lineHeight: 1.55 }}
        >
          {children}
        </Typography>
      ) : null}
    </Box>
  );
}
