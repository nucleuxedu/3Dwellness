import Link from "next/link";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
      { label: "Volunteer", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "muted.main",
        pt: { xs: 8, md: 11 },
        pb: { xs: 4, md: 5 },
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="headlineSm" component="p" sx={{ mb: 2 }}>
              3D Wellness
            </Typography>
            <Typography variant="bodyLg" sx={{ maxWidth: 420 }}>
              Advancing calm, accessible wellness through research-backed care,
              community programs, and a future-minded approach to health.
            </Typography>
          </Grid>

          {footerLinks.map((group) => (
            <Grid item xs={6} md={3} key={group.title}>
              <Typography variant="labelSm" sx={{ mb: 2.5, display: "block" }}>
                {group.title}
              </Typography>
              <Stack spacing={1.5}>
                {group.links.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body1"
                    sx={{
                      "&:hover": { color: "primary.dark" },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}

          <Grid item xs={12} md={4}>
            <Typography variant="labelSm" sx={{ mb: 2.5, display: "block" }}>
              Connect
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              hello@3dwellness.org
            </Typography>
            <Typography variant="body1">San Francisco, CA</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: "divider" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} 3D Wellness. All rights reserved.
          </Typography>
          <Typography variant="body2">
            A nonprofit for modern wellness equity.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
