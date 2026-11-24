import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function PageTitle({ title, children }: Props) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: 640 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: { xs: "1.85rem", md: "2.35rem" },
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
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
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, fontSize: "0.98rem", lineHeight: 1.55 }}>
          {children}
        </Typography>
      ) : null}
    </Box>
  );
}
