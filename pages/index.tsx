import { FormEvent, useState } from "react";
import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BrandMark from "@/components/BrandMark";
import { Reveal, RevealImage } from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import { brand } from "@/theme/theme";

const plans = [
  {
    id: "healing",
    title: "Center for Wellness Technology (Healing Hub)",
    line: "Basement Level — Integrated preventive and restorative wellness center providing care through healing modalities such as infrared lighting therapy, and non-invasive practices like massage and sound.",
    image: "/images/image-3.png",
    alt: "A person receiving guided wellness therapy",
  },
  {
    id: "immersion",
    title: "5D Wellness Immersion Lab",
    line: "AI/AR/VR-powered experiential space featuring interactive wellness and cultural storytelling exhibits.",
    image: "/images/image-4.jpg",
    alt: "Visitors inside an immersive projected exhibit",
  },
  {
    id: "school",
    title: "Wellness Technology International School",
    line: "Education and workforce development hub offering training in emerging technology, with pathways for youth and adults into future-ready careers.",
    image: "/images/image-5.jpg",
    alt: "Students working together at computers",
  },
  {
    id: "commons",
    title: "Community Commons & Culinary Innovation",
    line: "Flexible event space for community gatherings, workshops, and wellness-centered programming. Will support a greenhouse, commercial kitchen and cafeteria.",
    image: "/images/image-6.jpg",
    alt: "Hands-on technology demonstration with a robotic arm",
  },
];

const sectionPy = { xs: 6, md: 8 } as const;

export default function Home() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState("");
  const reduce = useReducedMotion();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const next: typeof errors = {};
    if (!name) next.name = "Write your name.";
    if (!email.includes("@")) next.email = "Write an email address with an @.";
    if (!message) next.message = "Write what you want to ask.";
    setErrors(next);
    if (Object.keys(next).length) {
      event.preventDefault();
      setStatus("");
      return;
    }
    setStatus("Your mail app will open with this message.");
  }

  return (
    <>
      <Head>
        <title>3D Wellness Endowment: Dream. Design. Dignity</title>
        <meta
          name="description"
          content="Developing a 3D Wellness Hub at St. Paul Downtown — America's first comprehensive Wellness City."
        />
      </Head>

      <SiteHeader />

      <Box component="main" id="top">
        <Box
          component="section"
          aria-labelledby="hero-h"
          sx={{
            position: "relative",
            minHeight: { xs: 560, md: 680 },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            component={motion.div}
            initial={reduce ? false : { scale: 1.08, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            sx={{ position: "absolute", inset: 0 }}
          >
            <Box
              component="img"
              src="/images/image-1.jpg"
              alt="A person wearing a VR headset in blue light"
              sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "62% 30%", display: "block" }}
            />
          </Box>
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(28, 36, 75, 0.45)" }} />
          <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 6, md: 8 } }}>
            <Box
              component={motion.div}
              initial={reduce ? false : { opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              sx={{ maxWidth: 520, bgcolor: "background.default", borderRadius: 3, p: { xs: 3, md: 4 } }}
            >
              <Typography id="hero-h" variant="h1" component="h1">
                Developing a 3D Wellness Hub
              </Typography>
              <Typography
                component={motion.p}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                sx={{ mt: 1.5, fontWeight: 500 }}
              >
                at St. Paul Downtown
              </Typography>
              <Typography
                component={motion.p}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                sx={{ mt: 2, color: "text.secondary" }}
              >
                America’s first comprehensive Wellness City — where health, healing, and human flourishing are embedded into urban life.
              </Typography>
              <Stack
                component={motion.div}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 3 }}
              >
                <Button href="#plans" variant="contained">Explore our plans</Button>
                <Button href="#about" variant="outlined" color="primary">Learn about 3DWE</Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Box component="section" id="about" aria-labelledby="about-h" sx={{ py: sectionPy }}>
          <Container maxWidth="lg">
            <Reveal>
              <Typography id="about-h" variant="h2" component="h2">Who Are We?</Typography>
            </Reveal>
            <Reveal delay={0.08}>
              <Typography sx={{ mt: 2, fontWeight: 600 }}>3D Wellness Endowment: Dream. Design. Dignity</Typography>
            </Reveal>
            <Reveal delay={0.14}>
              <Typography sx={{ mt: 1.5, color: "text.secondary", maxWidth: 720 }}>
                A community-serving non-profit dedicated to “Connecting the Disconnected.” We believe in the power of multimedia technology to transform lives and uplift the disadvantaged.
              </Typography>
            </Reveal>
          </Container>
        </Box>

        <Box component="section" id="vision" aria-labelledby="vision-h" sx={{ py: sectionPy, bgcolor: "background.paper" }}>
          <Container maxWidth="lg">
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" }, gap: { xs: 3, md: 6 }, alignItems: "start" }}>
              <Box>
                <Reveal>
                  <Typography id="vision-h" variant="h2" component="h2">The Vision</Typography>
                </Reveal>
                <Reveal delay={0.1}>
                  <Typography variant="h3" component="p" sx={{ mt: 2, color: "text.secondary" }}>Why Now?</Typography>
                </Reveal>
              </Box>
              <Reveal delay={0.12} y={36}>
                <Typography sx={{ color: "text.secondary" }}>
                  We envision St. Paul, Minnesota as America’s first comprehensive <Box component="strong" sx={{ color: "text.primary", fontWeight: 600 }}>Wellness City</Box> — where health, healing, and human flourishing are embedded into urban life. At the heart of this transformation, the 3D Wellness Endowment can serve as a <Box component="strong" sx={{ color: "text.primary", fontWeight: 600 }}>catalytic hub</Box> that integrates immersive experiences, holistic care, and technology-enabled learning to drive equitable economic growth, downtown revitalization, and community resilience.
                </Typography>
              </Reveal>
            </Box>
          </Container>
        </Box>

        <Box component="section" id="plans" aria-labelledby="plans-h" sx={{ py: sectionPy }}>
          <Container maxWidth="lg">
            <Reveal>
              <Typography id="plans-h" variant="h2" component="h2">Our plans</Typography>
            </Reveal>
            <Box
              sx={{
                mt: 4,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 3, md: 4 },
              }}
            >
              {plans.map((plan, index) => (
                <Reveal key={plan.id} delay={0.06 * index} y={40}>
                  <Box
                    id={plan.id}
                    component={motion.article}
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ duration: 0.25 }}
                    sx={{
                      height: "100%",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 3,
                      overflow: "hidden",
                      bgcolor: "background.default",
                    }}
                  >
                    <Box sx={{ height: { xs: 200, md: 240 }, overflow: "hidden" }}>
                      <RevealImage src={plan.image} alt={plan.alt} delay={0.05 * index} sx={{ borderRadius: 0 }} />
                    </Box>
                    <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                      <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                        {plan.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {plan.line}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Container>
        </Box>

        <Box component="section" id="mission" aria-labelledby="mission-h" sx={{ py: sectionPy, bgcolor: "background.paper" }}>
          <Container maxWidth="lg">
            <Reveal x={-24}>
              <Typography
                id="mission-h"
                variant="h2"
                component="h2"
                sx={{ whiteSpace: { md: "pre-line" }, maxWidth: 420, fontSize: { xs: 36, md: 52 } }}
              >
                {"Dream.\nDesign.\nDignity."}
              </Typography>
            </Reveal>
            <Reveal delay={0.12}>
              <Typography sx={{ mt: 3, maxWidth: 720, color: "text.secondary" }}>
                The 3D Wellness Endowment advances human wellbeing by{" "}
                <Box component="strong" sx={{ color: "text.primary", fontWeight: 600 }}>dreaming</Box> boldly,{" "}
                <Box component="strong" sx={{ color: "text.primary", fontWeight: 600 }}>designing</Box> innovative wellness technologies, and expanding equitable access to transformative health and wealth experiences — so that every community can thrive with{" "}
                <Box component="strong" sx={{ color: brand, fontWeight: 600 }}>dignity</Box>.
              </Typography>
            </Reveal>
            <Reveal delay={0.2}>
              <Button href="#about" variant="contained" sx={{ mt: 3 }}>
                Learn about 3DWE
              </Button>
            </Reveal>
          </Container>
        </Box>

        <Box component="section" id="connect" aria-labelledby="connect-h" sx={{ py: sectionPy }}>
          <Container maxWidth="lg">
            <Reveal>
              <Typography id="connect-h" variant="h2" component="h2">Connect with us</Typography>
            </Reveal>
            <Box sx={{ mt: 3, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 3, md: 5 }, alignItems: "start" }}>
              <Reveal delay={0.08}>
                <Typography component="address" sx={{ fontStyle: "normal", mb: 1.5 }}>
                  19 Exchange E.<br />
                  St. Paul, MN 55101
                </Typography>
                <Typography sx={{ mb: 0.5 }}>
                  <Link href="mailto:admin@3dwellness.org" color="inherit" underline="hover">admin@3dwellness.org</Link>
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <Link href="tel:+16514688024" color="inherit" underline="hover">+1 (651) 468-8024</Link>
                </Typography>
                <Link href="https://www.openstreetmap.org/search?query=19+Exchange+E.+St.+Paul+MN+55101" underline="hover" color="inherit">
                  Get directions
                </Link>
                <Box
                  component="form"
                  action="mailto:admin@3dwellness.org"
            method="post"
            encType="text/plain"
            noValidate
                  onSubmit={onSubmit}
                  sx={{ mt: 3, display: "grid", gap: 2 }}
                >
                  <TextField name="name" label="Name" required autoComplete="name" error={Boolean(errors.name)} helperText={errors.name || " "} />
                  <TextField name="email" label="Email" type="email" required autoComplete="email" error={Boolean(errors.email)} helperText={errors.email || " "} />
                  <TextField name="message" label="Message" required autoComplete="off" error={Boolean(errors.message)} helperText={errors.message || " "} />
                  <Button type="submit" variant="contained" sx={{ justifySelf: "start" }}>Send a message</Button>
                  {status ? <Typography variant="body2" role="status">{status}</Typography> : null}
                </Box>
              </Reveal>
              <Reveal delay={0.14} y={40}>
                <Box sx={{ height: { xs: 260, md: 440 }, overflow: "hidden", borderRadius: 3 }}>
                  <RevealImage src="/images/image-1.jpg" alt="A person wearing a VR headset in blue light" sx={{ borderRadius: 3 }} />
                </Box>
              </Reveal>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box component="footer" sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 4 }}>
            <Box>
              <Typography variant="h2" component="p" sx={{ color: "inherit", fontSize: { xs: 28, md: 36 } }}>
                Dream. Design. Dignity.
              </Typography>
              <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.72)" }}>Connecting the Disconnected.</Typography>
            </Box>
            <Button href="#plans" variant="contained" color="secondary">Explore our plans</Button>
          </Stack>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "2fr repeat(3, 1fr)" }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
                <BrandMark />
                <Typography sx={{ fontWeight: 500 }}>3D Wellness Endowment</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>19 Exchange E., St. Paul, MN 55101</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)", mt: 0.5 }}>admin@3dwellness.org</Typography>
            </Box>
            {[
              ["About", [{ href: "#about", label: "Who we are" }, { href: "#vision", label: "Vision" }]],
              ["Plans", plans.map((p) => ({ href: `#${p.id}`, label: p.title.split("(")[0].trim() }))],
              ["Connect", [{ href: "#connect", label: "Contact" }, { href: "mailto:admin@3dwellness.org", label: "Email" }]],
            ].map(([title, links]) => (
              <Box key={title as string}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>{title as string}</Typography>
                {(links as { href: string; label: string }[]).map((item) => (
                  <Link key={item.href + item.label} href={item.href} color="inherit" underline="hover" display="block" variant="body2" sx={{ py: 0.5, color: "rgba(255,255,255,0.72)" }}>
                    {item.label}
                  </Link>
                ))}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mt: 4, color: "rgba(255,255,255,0.72)" }}>
            © {new Date().getFullYear()} All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
