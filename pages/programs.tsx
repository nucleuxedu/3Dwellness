import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ScrollReveal from "@/lib/animaster/ScrollReveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { plans, site } from "@/lib/siteContent";

export default function ProgramsPage() {
  return (
    <>
      <Head>
        <title>Our Plans — {site.name}</title>
      </Head>

      <Box
        component="section"
        sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 4, md: 6 } }}
      >
        <Container maxWidth="xl">
          <ScrollReveal>
            <Typography
              variant="labelSm"
              sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
            >
              Our Plans
            </Typography>
            <Typography
              variant="headlineLg"
              component="h1"
              sx={{
                mb: 2,
                fontSize: { xs: "36px", sm: "48px", md: "65px" },
                lineHeight: { xs: "42px", sm: "56px", md: "78px" },
                maxWidth: 700,
              }}
            >
              The 3D Wellness Hub
            </Typography>
            <Typography variant="bodyLg" sx={{ maxWidth: 640 }}>
              Developing a catalytic hub at St. Paul Downtown — immersive care,
              technology-enabled learning, and community space for America&apos;s
              first comprehensive Wellness City.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      <Box component="section" sx={{ pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {plans.map((plan, index) => (
              <Grid item xs={12} key={plan.title}>
                <ScrollReveal delay={index * 0.05}>
                  <Card sx={{ p: 0, overflow: "hidden", position: "relative" }}>
                    <BorderBeam
                      size={200}
                      duration={14}
                      borderWidth={1.5}
                      colorFrom="#B5C94D"
                      colorTo="#1A1A14"
                      delay={index * 0.2}
                    />
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
                            src={plan.image}
                            alt={plan.alt}
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
                            position: "relative",
                            zIndex: 1,
                            "&:last-child": { pb: { xs: 3, md: 5 } },
                          }}
                        >
                          <Typography
                            variant="headlineSm"
                            component="h2"
                            sx={{ mb: 2 }}
                          >
                            {plan.title}
                          </Typography>
                          <Typography variant="bodyLg" sx={{ mb: 3 }}>
                            {plan.description}
                          </Typography>
                          <Button component={Link} href="/contact" variant="text">
                            Inquire about this plan →
                          </Button>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </ScrollReveal>
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
            Help build the Wellness City
          </Typography>
          <Typography variant="bodyLg" sx={{ mb: 4 }}>
            Partner with 3D Wellness Endowment to bring healing, immersion,
            education, and community commons to downtown St. Paul.
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
