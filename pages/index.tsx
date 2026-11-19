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
import TextAnimation from "@/components/ui/staggerText";
import HoverCta from "@/components/HoverCta";
import { assets, plans, site } from "@/lib/siteContent";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{site.fullName}</title>
        <meta
          name="description"
          content="Developing a 3D Wellness Hub at St. Paul Downtown — America's first comprehensive Wellness City."
        />
      </Head>

      {/* Hero */}
      <Box
        component="section"
        sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 11 } }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="headlineDisplay"
                component="h1"
                sx={{
                  fontSize: { xs: "36px", sm: "52px", md: "65px", lg: "78px" },
                  lineHeight: {
                    xs: "42px",
                    sm: "58px",
                    md: "72px",
                    lg: "82px",
                  },
                  mb: 2,
                  maxWidth: 580,
                }}
              >
                <TextAnimation>Developing a 3D Wellness Hub</TextAnimation>
              </Typography>
              <Typography
                variant="headlineSm"
                component="p"
                sx={{
                  mb: 3,
                  fontWeight: 300,
                  fontSize: { xs: "22px", md: "28px" },
                  lineHeight: { xs: "30px", md: "36px" },
                }}
              >
                at St. Paul Downtown
              </Typography>
              <ScrollReveal delay={0.1}>
                <Typography
                  variant="bodyLg"
                  sx={{
                    mb: 5,
                    maxWidth: 500,
                    fontSize: { xs: "16px", md: "20px" },
                    lineHeight: { xs: "24px", md: "30px" },
                  }}
                >
                  America&apos;s first comprehensive Wellness City — where
                  health, healing, and human flourishing are embedded into urban
                  life.
                </Typography>
              </ScrollReveal>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <HoverCta href="#plans">Explore our plans</HoverCta>
                <Button
                  component={Link}
                  href="#about"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: { xs: "100%", sm: 276 } }}
                >
                  Learn about 3DWE
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <ScrollReveal delay={0.15} y={24}>
                <ParallaxMedia
                  className="relative h-[320px] w-full overflow-hidden rounded-lg sm:h-[420px] md:h-[560px]"
                  speed={0.1}
                >
                  <Image
                    src={assets.hero}
                    alt="AI, AR, and VR wellness training at 3D Wellness Endowment"
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

      {/* Who Are We */}
      <Box
        id="about"
        component="section"
        sx={{ py: { xs: 8, md: 11 }, bgcolor: "muted.main" }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <ScrollReveal>
                <Typography
                  variant="labelSm"
                  sx={{
                    textTransform: "uppercase",
                    mb: 2,
                    display: "block",
                  }}
                >
                  About
                </Typography>
                <Typography
                  variant="headlineLg"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "36px", sm: "48px", md: "65px" },
                    lineHeight: { xs: "42px", sm: "56px", md: "78px" },
                  }}
                >
                  Who Are We?
                </Typography>
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={7}>
              <ScrollReveal delay={0.08}>
                <Typography
                  variant="bodyLg"
                  sx={{ mb: 2, fontWeight: 600, fontSize: { xs: "18px", md: "22px" } }}
                >
                  {site.fullName}
                </Typography>
                <Typography variant="bodyLg" sx={{ maxWidth: 640 }}>
                  A community-serving non-profit dedicated to &quot;
                  <strong>{site.missionShort}</strong>
                  .&quot; We believe in the power of multimedia technology to
                  transform lives and uplift the disadvantaged.
                </Typography>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Vision / Why Now */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <ScrollReveal>
                <ParallaxMedia className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[460px]">
                  <Image
                    src={assets.training}
                    alt="Immersive technology training for wellness"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </ParallaxMedia>
              </ScrollReveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollReveal delay={0.08}>
                <Typography variant="labelSm" sx={{ mb: 2, display: "block" }}>
                  The Vision · Why Now?
                </Typography>
                <Typography
                  variant="headlineMd"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "28px", md: "42px" },
                    lineHeight: { xs: "36px", md: "50px" },
                  }}
                >
                  St. Paul as America&apos;s first Wellness City
                </Typography>
                <Typography variant="bodyLg">
                  We envision St. Paul, Minnesota as America&apos;s first
                  comprehensive <strong>Wellness City</strong> — where health,
                  healing, and human flourishing are embedded into urban life. At
                  the heart of this transformation, the 3D Wellness Endowment can
                  serve as a <strong>catalytic hub</strong> that integrates
                  immersive experiences, holistic care, and technology-enabled
                  learning to drive equitable economic growth, downtown
                  revitalization, and community resilience.
                </Typography>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Plans */}
      <Box
        id="plans"
        component="section"
        sx={{ py: { xs: 8, md: 11 }, bgcolor: "muted.main" }}
      >
        <Container maxWidth="xl">
          <ScrollReveal>
            <Typography
              variant="headlineLg"
              component="h2"
              sx={{
                mb: 1,
                fontSize: { xs: "36px", sm: "48px", md: "65px" },
                lineHeight: { xs: "42px", sm: "56px", md: "78px" },
              }}
            >
              Our Plans
            </Typography>
            <Typography variant="bodyLg" sx={{ mb: 6, maxWidth: 560 }}>
              Four interconnected spaces that make the 3D Wellness Hub real in
              downtown St. Paul.
            </Typography>
          </ScrollReveal>

          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid item xs={12} md={6} key={plan.title}>
                <ScrollReveal delay={index * 0.06} y={32}>
                  <Box
                    sx={{
                      height: "100%",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      overflow: "hidden",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 220, md: 280 },
                      }}
                    >
                      <Image
                        src={plan.image}
                        alt={plan.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 900px) 100vw, 50vw"
                      />
                    </Box>
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography
                        variant="headlineSm"
                        component="h3"
                        sx={{
                          mb: 2,
                          fontSize: { xs: "22px", md: "28px" },
                          lineHeight: { xs: "28px", md: "36px" },
                        }}
                      >
                        {plan.title}
                      </Typography>
                      <Typography variant="body1">{plan.description}</Typography>
                    </Box>
                  </Box>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>

          <Box mt={5}>
            <Button component={Link} href="/programs" variant="text">
              View all plans →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Dream. Design. Dignity. */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 11 },
          bgcolor: "inverse.main",
          color: "common.white",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="headlineLg"
                component="h2"
                sx={{
                  color: "common.white",
                  mb: 3,
                  whiteSpace: { md: "pre-line" },
                  fontSize: { xs: "36px", sm: "48px", md: "65px" },
                  lineHeight: { xs: "42px", sm: "56px", md: "78px" },
                }}
              >
                Dream.
                <br />
                Design.
                <br />
                Dignity.
              </Typography>
              <Typography
                variant="bodyLg"
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  mb: 4,
                  maxWidth: 520,
                  fontSize: { xs: "16px", md: "20px" },
                }}
              >
                The 3D Wellness Endowment advances human wellbeing by{" "}
                <strong>dreaming</strong> boldly, <strong>designing</strong>{" "}
                innovative wellness technologies, and expanding equitable access
                to transformative health and wealth experiences — so that every
                community can thrive with <strong>dignity</strong>.
              </Typography>
              <HoverCta href="/about">Learn about 3DWE</HoverCta>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="labelSm"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    mb: 2,
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  Connect With Us
                </Typography>
                <Typography variant="bodyLg" sx={{ color: "common.white", mb: 1 }}>
                  {site.address}
                </Typography>
                <Typography
                  component="a"
                  href={`mailto:${site.email}`}
                  variant="bodyLg"
                  sx={{
                    color: "primary.main",
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                  }}
                >
                  {site.email}
                </Typography>
                <Typography
                  component="a"
                  href={site.phoneHref}
                  variant="bodyLg"
                  sx={{ color: "common.white", textDecoration: "none" }}
                >
                  {site.phone}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
