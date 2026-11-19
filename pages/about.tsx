import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";

const values = [
  {
    title: "Dignity first",
    body: "Every space, program, and message is designed to honor the people we serve.",
  },
  {
    title: "Evidence with empathy",
    body: "Research guides our work, but human experience shapes how care is delivered.",
  },
  {
    title: "Calm as infrastructure",
    body: "Quiet environments are not a luxury—they are essential to lasting wellness.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — 3D Wellness</title>
      </Head>

      <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="labelSm"
                sx={{
                  textTransform: "uppercase",
                  mb: 2,
                  display: "block",
                }}
              >
                About us
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
                A nonprofit for modern wellness equity.
              </Typography>
              <Typography
                variant="bodyLg"
                sx={{
                  maxWidth: 520,
                  fontSize: { xs: "16px", md: "20px" },
                  lineHeight: { xs: "24px", md: "30px" },
                }}
              >
                3D Wellness exists to make restorative care feel open,
                aspirational, and within reach—pairing clinical rigor with an
                editorial sense of calm.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, md: 480 },
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80"
                  alt="Group wellness session in a bright open room"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ py: { xs: 8, md: 11 }, bgcolor: "muted.main" }}
      >
        <Container maxWidth="xl">
          <SectionHeading
            eyebrow="Values"
            title="What guides our work."
            description="We stay restrained in palette and generous in space—because clarity builds trust."
          />
          <Grid container spacing={3}>
            {values.map((value) => (
              <Grid item xs={12} md={4} key={value.title}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="headlineSm" component="h3" sx={{ mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1">{value.body}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="md">
          <Typography
            variant="headlineMd"
            component="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "28px", md: "42px" },
              lineHeight: { xs: "36px", md: "50px" },
            }}
          >
            From clinics to communities.
          </Typography>
          <Typography variant="bodyLg" sx={{ mb: 3 }}>
            Founded by clinicians, designers, and public-health advocates, 3D
            Wellness reimagines how nonprofit care can look and feel. Our
            programs span mental health, preventive access, and applied research—
            always with white space, soft contrast, and a single lime accent to
            mark the next step forward.
          </Typography>
          <Typography variant="body1" sx={{ mb: 5 }}>
            Today we partner with clinics, universities, and civic groups across
            dozens of cities. Tomorrow we keep expanding the quiet infrastructure
            that lets people heal without hurry.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              href="/programs"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Explore programs
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="secondary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Partner with us
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
