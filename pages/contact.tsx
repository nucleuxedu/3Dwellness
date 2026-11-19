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
import SectionHeading from "@/components/SectionHeading";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact — 3D Wellness</title>
      </Head>

      <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 10 }}>
            <Grid item xs={12} md={5}>
              <SectionHeading
                eyebrow="Contact"
                title="Let's build calmer care together."
                description="Reach out about partnerships, volunteering, press, or bringing a program to your community."
              />
              <Stack spacing={2} mt={2}>
                <Box>
                  <Typography variant="labelSm" sx={{ mb: 0.5, display: "block" }}>
                    Email
                  </Typography>
                  <Typography variant="bodyLg">hello@3dwellness.org</Typography>
                </Box>
                <Box>
                  <Typography variant="labelSm" sx={{ mb: 0.5, display: "block" }}>
                    Location
                  </Typography>
                  <Typography variant="bodyLg">San Francisco, CA</Typography>
                </Box>
                <Box>
                  <Typography variant="labelSm" sx={{ mb: 0.5, display: "block" }}>
                    Hours
                  </Typography>
                  <Typography variant="bodyLg">Mon–Fri, 9am–5pm PT</Typography>
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
                      Thank you. We will respond within two business days.
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: { xs: "100%", sm: 276 }, alignSelf: "flex-start" }}
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
