import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";

const amounts = [25, 50, 100, 250];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <>
      <Head>
        <title>Donate — 3D Wellness</title>
      </Head>

      <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 10 }}>
            <Grid item xs={12} md={6}>
              <SectionHeading
                eyebrow="Donate"
                title="Support open, dignified wellness."
                description="Your gift funds clinics, youth circles, and research that keep care calm, accessible, and future-ready."
              />
              <Stack spacing={2} mt={1}>
                {[
                  "Expand Community Care Labs in underserved neighborhoods",
                  "Fund Mindful Futures cohorts for adults in recovery",
                  "Advance Blue Horizon research on equitable wellness tools",
                ].map((item) => (
                  <Typography key={item} variant="body1">
                    — {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="headlineSm" component="h2" sx={{ mb: 3 }}>
                  Choose an amount
                </Typography>
                <Grid container spacing={2} mb={3}>
                  {amounts.map((amount) => (
                    <Grid item xs={6} sm={3} key={amount}>
                      <Button
                        fullWidth
                        variant={selected === amount ? "contained" : "outlined"}
                        color={selected === amount ? "primary" : "secondary"}
                        onClick={() => setSelected(amount)}
                        sx={{
                          minWidth: 0,
                          px: 2,
                          width: "100%",
                        }}
                      >
                        ${amount}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  fullWidth
                  variant={selected === "custom" ? "contained" : "outlined"}
                  color={selected === "custom" ? "primary" : "secondary"}
                  onClick={() => setSelected("custom")}
                  sx={{ mb: 2, width: "100%", minWidth: 0 }}
                >
                  Custom amount
                </Button>

                {selected === "custom" && (
                  <TextField
                    label="Amount (USD)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    fullWidth
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                )}

                <TextField
                  label="Email for receipt"
                  type="email"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ width: "100%", minWidth: 0 }}
                >
                  Continue to give
                </Button>
                <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                  3D Wellness is a nonprofit. Contributions may be tax-deductible.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
