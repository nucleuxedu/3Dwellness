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

const stats = [
  { value: "48,000+", label: "Individuals reached each year" },
  { value: "120", label: "Clinic and school partners" },
  { value: "92%", label: "Participants reporting improved calm" },
  { value: "36", label: "Cities with active programs" },
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
              <SectionHeading
                eyebrow="Impact"
                title="Quiet progress you can measure."
                description="We track outcomes with the same restraint we bring to design—clear numbers, honest stories, no noise."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 280, md: 420 },
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80"
                  alt="People stretching together outdoors"
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
                  {stat.value}
                </Typography>
                <Typography variant="labelMd">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <SectionHeading
            eyebrow="Stories"
            title="Where calm becomes change."
          />
          <Stack spacing={4}>
            {stories.map((story) => (
              <Box
                key={story.title}
                sx={{
                  pb: 4,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="headlineSm" component="h3" sx={{ mb: 1.5 }}>
                  {story.title}
                </Typography>
                <Typography variant="bodyLg" sx={{ maxWidth: 720 }}>
                  {story.body}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box mt={6}>
            <Button
              component={Link}
              href="/donate"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Fuel this impact
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
