import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function PageTitle({ title, children }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h2" component="h1" sx={{ fontSize: { xs: "1.75rem", md: "2rem" }, fontWeight: 500 }}>
        {title}
      </Typography>
      {children ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, maxWidth: 560 }}>
          {children}
        </Typography>
      ) : null}
    </Box>
  );
}
