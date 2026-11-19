import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";
import ProgramCard from "@/components/ProgramCard";
import HoverCta from "@/components/HoverCta";
import ScrollReveal from "@/lib/animaster/ScrollReveal";
import ParallaxMedia from "@/lib/animaster/ParallaxMedia";
import TextAnimation from "@/components/ui/staggerText";
import StatsCounter from "@/components/ui/stats-counter";

const FlipFadeText = dynamic(() => import("@/components/ui/flip-fade-text"), {
  ssr: false,
});

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
  { value: 48000, label: "People reached yearly", suffix: "+", decimals: 0 },
  { value: 120, label: "Partner clinics", suffix: "", decimals: 0 },
  { value: 36, label: "Cities served", suffix: "", decimals: 0 },
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
                variant="labelSm"
                sx={{
                  textTransform: "uppercase",
                  mb: 2,
                  display: "block",
                  color: "text.secondary",
                }}
              >
                <FlipFadeText
                  words={["CALM CARE", "FUTURE READY", "OPEN ACCESS", "HUMAN FIRST"]}
                  interval={2800}
                  className="!min-h-0 justify-start"
                  textClassName="font-poppins text-[12px] font-normal tracking-[0.08em] text-[#333333]"
                />
              </Typography>
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
                <TextAnimation delay={0.1}>
                  Wellness with room to breathe.
                </TextAnimation>
              </Typography>
              <ScrollReveal delay={0.15}>
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
              </ScrollReveal>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <HoverCta href="/programs">Explore programs</HoverCta>
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
              <ScrollReveal delay={0.2} y={24}>
                <ParallaxMedia
                  className="relative h-[320px] w-full overflow-hidden rounded-lg sm:h-[420px] md:h-[560px]"
                  speed={0.12}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80"
                    alt="Person meditating in a calm blue-toned space"
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </ParallaxMedia>
              </ScrollReveal>
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
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Our Approach"
                  title="Editorial calm. Measurable care."
                  description="We design wellness systems that feel open and human—never crowded, never clinical for the sake of it."
                />
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={7}>
              <ScrollReveal delay={0.1}>
                <ParallaxMedia
                  className="relative h-[280px] w-full overflow-hidden rounded-lg md:h-[400px]"
                  speed={0.1}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
                    alt="Healthcare professional in a bright clinical setting"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                </ParallaxMedia>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Programs */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Programs"
              title="Pathways built for dignity."
              description="Each initiative pairs spacious design with practical support—so care feels aspirational and attainable."
            />
          </ScrollReveal>

          <Grid container spacing={3}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={4} key={program.title}>
                <ProgramCard {...program} delay={index * 0.08} />
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
              <ScrollReveal>
                <ParallaxMedia
                  className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[480px]"
                  speed={0.12}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80"
                    alt="Yoga practice in soft natural light"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </ParallaxMedia>
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Impact"
                  title="Quiet progress, lasting reach."
                  description="Our partners expand access without sacrificing the calm that makes healing possible."
                />
              </ScrollReveal>
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
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <StatsCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        className="font-poppins text-[inherit] font-semibold text-[#1A1A14]"
                      />
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
              <TextAnimation delay={0.05}>
                Support care that feels open.
              </TextAnimation>
            </Typography>
            <ScrollReveal>
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
            </ScrollReveal>
            <HoverCta href="/donate">Donate today</HoverCta>
          </Box>
        </Container>
      </Box>
    </>
  );
}
