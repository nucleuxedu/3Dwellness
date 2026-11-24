import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BrandMark from "@/components/BrandMark";

/** Dummy practitioner credentials for local demo. */
const DEMO_EMAIL = "maya@example.com";
const DEMO_PASSWORD = "wellness123";

export default function CentersLoginPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const next: typeof errors = {};
    if (!email.includes("@")) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setErrors({ form: "Email or password is wrong. Use the demo credentials below." });
      return;
    }

    setSubmitting(true);
    try {
      sessionStorage.setItem(
        "3dwellness.auth",
        JSON.stringify({ email: DEMO_EMAIL, name: "Maya Lindqvist", at: Date.now() })
      );
    } catch {
      /* ignore storage failures in private mode */
    }
    router.push("/PractitionerPortal");
  }

  return (
    <>
      <Head>
        <title>Centers login · 3D Wellness Endowment</title>
        <meta name="description" content="Sign in to access 3D Wellness centers." />
      </Head>

      <Box
        component="header"
        sx={{
          px: { xs: 2.5, md: 4 },
          py: 2.5,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Button
          href="/"
          color="inherit"
          startIcon={<BrandMark />}
          sx={{ fontWeight: 500, px: 0, minWidth: 0, "&:hover": { bgcolor: "transparent", color: "primary.main" } }}
        >
          3D Wellness
        </Button>
      </Box>

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 73px)",
          display: "grid",
          placeItems: "center",
          py: { xs: 6, md: 8 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="sm">
          <Box
            component={motion.div}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              bgcolor: "background.default",
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack spacing={0.5} sx={{ mb: 3 }}>
              <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 32, md: 40 } }}>
                Sign in
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your email and password to open the practitioner portal.
              </Typography>
            </Stack>

            <Box component="form" noValidate onSubmit={onSubmit} sx={{ display: "grid", gap: 2 }}>
              <TextField
                name="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                defaultValue={DEMO_EMAIL}
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email || " "}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                defaultValue={DEMO_PASSWORD}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password || " "}
              />
              {errors.form ? (
                <Alert severity="error" sx={{ borderRadius: 0 }} role="alert">
                  {errors.form}
                </Alert>
              ) : null}
              <Button type="submit" variant="contained" size="large" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
