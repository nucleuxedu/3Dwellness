import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";

const programs = [
  {
    title: "Mindful Futures",
    tag: "Mental Health",
    description:
      "Trauma-informed group care in light-filled rooms designed for restoration, not rush.",
    detail:
      "Weekly cohorts, clinician facilitation, and digital follow-ups that respect attention and privacy.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Community Care Labs",
    tag: "Access",
    description:
      "Neighborhood wellness hubs offering preventive screenings and open drop-in support.",
    detail:
      "Built with local partners so care feels familiar, bilingual, and free of clinical intimidation.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Blue Horizon Research",
    tag: "Research",
    description:
      "Studies that connect emerging health technology with equitable, human-centered outcomes.",
    detail:
      "Published findings guide our programs and equip partners with practical, ethical frameworks.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Youth Resilience Circle",
    tag: "Youth",
    description:
      "After-school spaces where young people practice emotional literacy and peer support.",
    detail:
      "Mentors and counselors co-lead sessions that blend reflection, movement, and creative expression.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <Head>
        <title>Programs — 3D Wellness</title>
      </Head>

      <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <SectionHeading
            eyebrow="Programs"
            title="Care shaped by space and science."
            description="Our initiatives are image-led, evidence-backed, and intentionally uncrowded—so people can arrive as they are."
            maxWidth={700}
          />
        </Container>
      </Box>

      <Box component="section" sx={{ pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {programs.map((program) => (
              <Grid item xs={12} key={program.title}>
                <Card sx={{ p: 0, overflow: "hidden" }}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: { xs: 240, md: "100%" },
                          minHeight: { md: 320 },
                        }}
                      >
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 900px) 100vw, 40vw"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent
                        sx={{
                          p: { xs: 3, md: 5 },
                          "&:last-child": { pb: { xs: 3, md: 5 } },
                        }}
                      >
                        <Chip label={program.tag} sx={{ mb: 2.5 }} />
                        <Typography
                          variant="headlineSm"
                          component="h2"
                          sx={{ mb: 2 }}
                        >
                          {program.title}
                        </Typography>
                        <Typography variant="bodyLg" sx={{ mb: 2 }}>
                          {program.description}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          {program.detail}
                        </Typography>
                        <Button
                          component={Link}
                          href="/contact"
                          variant="text"
                        >
                          Inquire about this program →
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 11 },
          bgcolor: "muted.main",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="headlineMd"
            component="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "28px", md: "42px" },
              lineHeight: { xs: "36px", md: "50px" },
            }}
          >
            Bring a program to your community.
          </Typography>
          <Typography variant="bodyLg" sx={{ mb: 4 }}>
            We collaborate with clinics, schools, and civic partners ready to
            expand calm, accessible care.
          </Typography>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            color="primary"
            sx={{ width: { xs: "100%", sm: 276 } }}
          >
            Start a conversation
          </Button>
        </Container>
      </Box>
    </>
  );
}
