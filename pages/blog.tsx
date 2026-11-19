import Head from "next/head";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { site } from "@/lib/siteContent";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog — {site.name}</title>
      </Head>

      <Box
        component="section"
        sx={{
          pt: { xs: 8, md: 14 },
          pb: { xs: 10, md: 16 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="labelSm"
            sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
          >
            Blog
          </Typography>
          <Typography
            variant="headlineLg"
            component="h1"
            sx={{
              mb: 3,
              fontSize: { xs: "36px", sm: "48px", md: "65px" },
              lineHeight: { xs: "42px", sm: "56px", md: "78px" },
            }}
          >
            Stories from the Wellness Hub
          </Typography>
          <Typography variant="bodyLg" sx={{ mb: 5, maxWidth: 520, mx: "auto" }}>
            Updates on Dream. Design. Dignity. — immersive wellness, downtown
            St. Paul revitalization, and connecting the disconnected — are
            coming soon.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            sx={{ width: { xs: "100%", sm: 276 } }}
          >
            Back to home
          </Button>
        </Container>
      </Box>
    </>
  );
}
