import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { site } from "@/lib/siteContent";

/** Legacy route — vision content now lives on About / Home. */
export default function ImpactRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/about");
  }, [router]);

  return (
    <>
      <Head>
        <title>Vision — {site.name}</title>
      </Head>
      <Box
        component="section"
        sx={{
          py: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <CircularProgress size={28} sx={{ color: "primary.main", mb: 2 }} />
          <Typography variant="body1">
            Redirecting to our vision…
          </Typography>
        </Container>
      </Box>
    </>
  );
}
