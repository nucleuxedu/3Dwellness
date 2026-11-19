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
import ScrollReveal from "@/lib/animaster/ScrollReveal";
import ParallaxMedia from "@/lib/animaster/ParallaxMedia";
import { assets, site } from "@/lib/siteContent";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — {site.name}</title>
      </Head>

      <Box
        component="section"
        sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 6, md: 8 } }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="labelSm"
                sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
              >
                Who Are We?
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
                {site.fullName}
              </Typography>
              <Typography
                variant="bodyLg"
                sx={{
                  maxWidth: 520,
                  fontSize: { xs: "16px", md: "20px" },
                  lineHeight: { xs: "24px", md: "30px" },
                }}
              >
                A community-serving non-profit dedicated to &quot;
                <strong>{site.missionShort}</strong>
                .&quot; We believe in the power of multimedia technology to
                transform lives and uplift the disadvantaged.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollReveal>
                <ParallaxMedia className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[480px]">
                  <Image
                    src={assets.hero}
                    alt="3D Wellness Endowment immersive training"
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
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={6}>
              <ScrollReveal>
                <Typography
                  variant="headlineMd"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "28px", md: "42px" },
                    lineHeight: { xs: "36px", md: "50px" },
                  }}
                >
                  The Vision
                </Typography>
                <Typography variant="bodyLg">
                  We envision St. Paul, Minnesota as America&apos;s first
                  comprehensive <strong>Wellness City</strong> — where health,
                  healing, and human flourishing are embedded into urban life.
                </Typography>
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollReveal delay={0.08}>
                <Typography
                  variant="headlineMd"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "28px", md: "42px" },
                    lineHeight: { xs: "36px", md: "50px" },
                  }}
                >
                  Why Now?
                </Typography>
                <Typography variant="bodyLg">
                  At the heart of this transformation, the 3D Wellness Endowment
                  can serve as a <strong>catalytic hub</strong> that integrates
                  immersive experiences, holistic care, and technology-enabled
                  learning to drive equitable economic growth, downtown
                  revitalization, and community resilience.
                </Typography>
              </ScrollReveal>
            </Grid>
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
            Dream. Design. Dignity.
          </Typography>
          <Typography variant="bodyLg" sx={{ mb: 5 }}>
            The 3D Wellness Endowment advances human wellbeing by{" "}
            <strong>dreaming</strong> boldly, <strong>designing</strong>{" "}
            innovative wellness technologies, and expanding equitable access to
            transformative health and wealth experiences — so that every
            community can thrive with <strong>dignity</strong>.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              href="/programs"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Explore our plans
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="secondary"
              sx={{ width: { xs: "100%", sm: 276 } }}
            >
              Connect with us
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
