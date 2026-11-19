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
import { site } from "@/lib/siteContent";

const amounts = [25, 50, 100, 250];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <>
      <Head>
        <title>Support — {site.name}</title>
      </Head>

      <Box
        component="section"
        sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 11 } }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 10 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="labelSm"
                sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
              >
                Support the Hub
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
                Dream. Design. Dignity.
              </Typography>
              <Typography variant="bodyLg" sx={{ mb: 3, maxWidth: 480 }}>
                Your gift helps {site.name} develop the 3D Wellness Hub at St.
                Paul Downtown — connecting the disconnected through multimedia
                technology, healing, and community.
              </Typography>
              <Stack spacing={2}>
                {[
                  "Center for Wellness Technology (Healing Hub)",
                  "5D Wellness Immersion Lab",
                  "Wellness Technology International School",
                  "Community Commons & Culinary Innovation",
                ].map((item) => (
                  <Typography key={item} variant="body1">
                    — {item}
                  </Typography>
                ))}
              </Stack>
              <Typography variant="body2" sx={{ mt: 3 }}>
                Questions? {site.email} · {site.phone}
              </Typography>
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
                        sx={{ minWidth: 0, px: 2, width: "100%" }}
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
                  {site.name} is a community-serving non-profit.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
