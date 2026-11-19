import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";

const programs = [
  {
    title: "Mindful Futures",
    description:
      "Guided recovery spaces that blend clinical insight with calm, restorative environments.",
    tag: "Mental Health",
  },
  {
    title: "Community Care Labs",
    description:
      "Neighborhood clinics reimagined as open, welcoming hubs for preventive wellness.",
    tag: "Access",
  },
  {
    title: "Blue Horizon Research",
    description:
      "Applied studies connecting futuristic health tools with human-centered outcomes.",
    tag: "Research",
  },
];

const impactStats = [
  { value: "48K", label: "People reached yearly" },
  { value: "120", label: "Partner clinics" },
  { value: "36", label: "Cities served" },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>3D Wellness — Calm, Future-Ready Care</title>
      </Head>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          pt: { xs: 6, md: 11 },
          pb: { xs: 8, md: 11 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="headlineDisplay"
                component="h1"
                sx={{
                  fontSize: { xs: "42px", sm: "58px", md: "72px", lg: "85px" },
                  lineHeight: {
                    xs: "48px",
                    sm: "64px",
                    md: "76px",
                    lg: "85px",
                  },
                  mb: 3,
                  maxWidth: 560,
                }}
              >
                Wellness with room to breathe.
              </Typography>
              <Typography
                variant="bodyLg"
                sx={{
                  mb: 5,
                  maxWidth: 480,
                  fontSize: { xs: "16px", md: "20px" },
                  lineHeight: { xs: "24px", md: "30px" },
                }}
              >
                3D Wellness is a nonprofit building calm, dignified pathways to
                health—where research, community, and care meet with clarity.
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
                  href="/about"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: { xs: "100%", sm: 276 } }}
                >
                  Our mission
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 320, sm: 420, md: 560 },
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80"
                  alt="Person meditating in a calm blue-toned space"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission strip */}
      <Box
        component="section"
        sx={{
          bgcolor: "muted.main",
          py: { xs: 8, md: 11 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <SectionHeading
                eyebrow="Our Approach"
                title="Editorial calm. Measurable care."
                description="We design wellness systems that feel open and human—never crowded, never clinical for the sake of it."
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 280, md: 400 },
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
                  alt="Healthcare professional in a bright clinical setting"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Programs */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <SectionHeading
            eyebrow="Programs"
            title="Pathways built for dignity."
            description="Each initiative pairs spacious design with practical support—so care feels aspirational and attainable."
          />

          <Grid container spacing={3}>
            {programs.map((program) => (
              <Grid item xs={12} md={4} key={program.title}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                    <Chip label={program.tag} sx={{ mb: 3 }} />
                    <Typography variant="headlineSm" component="h3" sx={{ mb: 2 }}>
                      {program.title}
                    </Typography>
                    <Typography variant="body1">{program.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={5}>
            <Button component={Link} href="/programs" variant="text">
              View all programs →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Impact */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 11 },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
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
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80"
                  alt="Yoga practice in soft natural light"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionHeading
                eyebrow="Impact"
                title="Quiet progress, lasting reach."
                description="Our partners expand access without sacrificing the calm that makes healing possible."
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 5 }}
                mt={2}
              >
                {impactStats.map((stat) => (
                  <Box key={stat.label}>
                    <Typography
                      variant="headlineMd"
                      component="p"
                      sx={{
                        fontSize: { xs: "32px", md: "42px" },
                        lineHeight: { xs: "40px", md: "50px" },
                        color: "primary.dark",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="labelMd">{stat.label}</Typography>
                  </Box>
                ))}
              </Stack>
              <Box mt={4}>
                <Button
                  component={Link}
                  href="/impact"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: { xs: "100%", sm: 276 } }}
                >
                  See our impact
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 11 },
          bgcolor: "inverse.main",
          color: "common.white",
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography
              variant="headlineLg"
              component="h2"
              sx={{
                color: "common.white",
                mb: 3,
                fontSize: { xs: "36px", sm: "48px", md: "65px" },
                lineHeight: { xs: "42px", sm: "56px", md: "78px" },
              }}
            >
              Support care that feels open.
            </Typography>
            <Typography
              variant="bodyLg"
              sx={{
                color: "rgba(255,255,255,0.8)",
                mb: 5,
                maxWidth: 520,
                mx: "auto",
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              Your gift funds clinics, research, and community programs rooted
              in dignity and design.
            </Typography>
            <Button
              component={Link}
              href="/donate"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Donate today
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
