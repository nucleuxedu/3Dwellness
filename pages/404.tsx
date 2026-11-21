import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { brand } from "@/theme/theme";

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <>
      <Head>
        <title>Page not found · 3D Wellness Endowment</title>
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          bgcolor: "background.default",
          py: 8,
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Box
            component={motion.div}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography
              component={motion.p}
              variant="h1"
              sx={{ fontSize: { xs: 96, md: 128 }, lineHeight: 0.9, letterSpacing: "-0.06em", mb: 2 }}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              404
            </Typography>
            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: 28, md: 36 }, mb: 1.5 }}>
              This page is not on the plan
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 4 }}>
              The path you opened is not part of the 3D Wellness Hub. Head back to the homepage to explore the plans.
            </Typography>
            <Box
              component={motion.div}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              sx={{ display: "inline-block" }}
            >
              <Button href="/" variant="contained">
                Back to home
              </Button>
            </Box>
            <Box
              component={motion.div}
              aria-hidden
              sx={{
                mt: 6,
                mx: "auto",
                width: 64,
                height: 6,
                borderRadius: 999,
                bgcolor: brand,
              }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
