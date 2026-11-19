import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/lib/animaster/ScrollReveal";
import ParallaxMedia from "@/lib/animaster/ParallaxMedia";
import StatsCounter from "@/components/ui/stats-counter";
import TextAnimation from "@/components/ui/staggerText";
import HoverCta from "@/components/HoverCta";

const stats = [
  { value: 48000, label: "Individuals reached each year", suffix: "+" },
  { value: 120, label: "Clinic and school partners", suffix: "" },
  { value: 92, label: "Participants reporting improved calm", suffix: "%" },
  { value: 36, label: "Cities with active programs", suffix: "" },
];

const stories = [
  {
    title: "A clinic that feels like breathing room",
    body: "In Oakland, Community Care Labs redesigned a waiting area into a soft, daylight-filled lounge—reducing no-shows by nearly a third.",
  },
  {
    title: "Research that stays close to people",
    body: "Blue Horizon published frameworks now used by university partners to evaluate wellness tech without losing the human story.",
  },
  {
    title: "Youth finding language for care",
    body: "Resilience Circle cohorts in three cities helped teens build peer support habits that continue after the program ends.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <Head>
        <title>Impact — 3D Wellness</title>
      </Head>

      <Box component="section" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Impact"
                  title="Quiet progress you can measure."
                  description="We track outcomes with the same restraint we bring to design—clear numbers, honest stories, no noise."
                />
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollReveal delay={0.1}>
                <ParallaxMedia className="relative h-[280px] w-full overflow-hidden rounded-lg md:h-[420px]">
                  <Image
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80"
                    alt="People stretching together outdoors"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </ParallaxMedia>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ py: { xs: 8, md: 11 }, bgcolor: "muted.main" }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Typography
                  variant="headlineMd"
                  component="p"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "32px", md: "42px" },
                    lineHeight: { xs: "40px", md: "50px" },
                    color: "primary.dark",
                  }}
                >
                  <StatsCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-poppins text-[inherit] font-semibold text-[#1A1A14]"
                  />
                </Typography>
                <Typography variant="labelMd">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Stories"
              title="Where calm becomes change."
            />
          </ScrollReveal>
          <Stack spacing={4}>
            {stories.map((story, i) => (
              <ScrollReveal key={story.title} delay={i * 0.05}>
                <Box
                  sx={{
                    pb: 4,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="headlineSm" component="h3" sx={{ mb: 1.5 }}>
                    <TextAnimation>{story.title}</TextAnimation>
                  </Typography>
                  <Typography variant="bodyLg" sx={{ maxWidth: 720 }}>
                    {story.body}
                  </Typography>
                </Box>
              </ScrollReveal>
            ))}
          </Stack>
          <Box mt={6}>
            <HoverCta href="/donate">Fuel this impact</HoverCta>
          </Box>
        </Container>
      </Box>
    </>
  );
}
