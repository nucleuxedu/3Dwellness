import { FormEvent, useState } from "react";
import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { site } from "@/lib/siteContent";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact — {site.name}</title>
      </Head>

      <Box
        component="section"
        sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 11 } }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 10 }}>
            <Grid item xs={12} md={5}>
              <Typography
                variant="labelSm"
                sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
              >
                Connect With Us
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
                Let&apos;s build the Wellness Hub together.
              </Typography>
              <Typography variant="bodyLg" sx={{ mb: 4, maxWidth: 420 }}>
                Reach out about partnerships, volunteering, or bringing the 3D
                Wellness Hub vision to life in downtown St. Paul.
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="labelSm"
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    Address
                  </Typography>
                  <Typography variant="bodyLg">{site.address}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="labelSm"
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    Email
                  </Typography>
                  <Typography
                    component="a"
                    href={`mailto:${site.email}`}
                    variant="bodyLg"
                    sx={{ color: "text.primary", textDecoration: "none" }}
                  >
                    {site.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="labelSm"
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    component="a"
                    href={site.phoneHref}
                    variant="bodyLg"
                    sx={{ color: "text.primary", textDecoration: "none" }}
                  >
                    {site.phone}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 3, md: 4 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    label="Full name"
                    name="name"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Organization (optional)"
                    name="organization"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="How can we help?"
                    name="message"
                    required
                    fullWidth
                    multiline
                    minRows={5}
                    InputLabelProps={{ shrink: true }}
                  />
                  {submitted && (
                    <Alert severity="success" sx={{ borderRadius: "4px" }}>
                      Thank you. We will respond at {site.email}.
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: { xs: "100%", sm: 276 },
                      alignSelf: "flex-start",
                    }}
                  >
                    Send message
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
