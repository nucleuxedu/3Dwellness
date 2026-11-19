import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { gold } from "@/theme/theme";

const mono = '"JetBrains Mono", monospace';
const display = '"Playfair Display", serif';

const nav = [
  { href: "#vision", label: "Vision" },
  { href: "#projects", label: "Our Plans" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#contact", label: "Contact" },
];

const pillars = [
  {
    n: "01",
    word: "Dream",
    line: "We dream boldly — imagining what a community looks like when wellbeing is designed into everyday life.",
  },
  {
    n: "02",
    word: "Design",
    line: "We design innovative wellness technologies — multimedia tools that transform lives and uplift the disadvantaged.",
  },
  {
    n: "03",
    word: "Dignity",
    line: "We expand equitable access to transformative health and wealth experiences — so every community can thrive with dignity.",
  },
];

const wrap = {
  maxWidth: 1440,
  mx: "auto",
  px: { xs: 3, md: 6 },
  width: "100%",
};

const kicker = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: "0.28em",
  color: gold,
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    bgcolor: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontWeight: 300,
    fontSize: 14,
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
    "&.Mui-focused": { bgcolor: "rgba(255,255,255,0.05)" },
    "&.Mui-focused fieldset": { borderColor: "rgba(212,175,55,0.6)", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "rgba(255,255,255,0.35)", opacity: 1 },
};

function Logo({ size = 36 }: { size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      sx={{ width: size, height: size, display: "block" }}
    >
      <path d="M20 6 33 13.5v15L20 36 7 28.5v-15L20 6Z" stroke={gold} strokeWidth="1.8" />
      <path
        d="M20 6v14.5M20 20.5 7 13.5M20 20.5 33 13.5"
        stroke="#00E5FF"
        strokeWidth="1.3"
        opacity="0.9"
      />
      <circle cx="20" cy="20.5" r="2.4" fill={gold} />
    </Box>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.15)",
        bgcolor: "rgba(0,0,0,0.3)",
        px: 1.75,
        py: 0.75,
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
      }}
    >
      {label}
    </Box>
  );
}

function PhotoCard({
  n,
  kicker: eye,
  title,
  body,
  tags,
  src,
  alt,
  span,
}: {
  n: string;
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  src: string;
  alt: string;
  span: number;
}) {
  return (
    <Box sx={{ gridColumn: { md: `span ${span}` } }}>
      <Box
        component="article"
        className="card-glow"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: { xs: 440, md: 560 },
          height: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          "&:hover img": { transform: "scale(1.1)" },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 1600ms ease-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #050505, rgba(5,5,5,0.45), rgba(5,5,5,0.1))",
          }}
        />
        <Typography
          sx={{
            position: "absolute",
            top: 24,
            right: 24,
            zIndex: 1,
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {n}
        </Typography>
        <Box sx={{ position: "relative", zIndex: 1, p: { xs: 4, md: 5 } }}>
          <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.3em", color: "#00E5FF" }}>
            {eye}
          </Typography>
          <Typography component="h3" sx={{ mt: 1.5, fontFamily: display, fontSize: { xs: 30, md: 36 }, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 512, fontSize: { xs: 14, md: 16 }, fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            {body}
          </Typography>
          <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Box sx={{ bgcolor: "#050505", color: "#fff", minHeight: "100vh" }}>
      <Box
        component="header"
        sx={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 50,
          height: 72,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          bgcolor: "rgba(5,5,5,0.5)",
          backdropFilter: "blur(24px)",
        }}
      >
        <Box sx={{ ...wrap, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="#top" underline="none" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Logo />
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", lineHeight: 1 }}>
              <Typography sx={{ fontFamily: mono, fontSize: 14, letterSpacing: "0.28em" }}>3DWE</Typography>
              <Typography sx={{ mt: 0.5, fontFamily: mono, fontSize: 9, letterSpacing: "0.24em", color: "rgba(255,255,255,0.45)" }}>
                WELLNESS ENDOWMENT
              </Typography>
            </Box>
          </Link>
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4.5 }}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                underline="none"
                sx={{
                  position: "relative",
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.6)",
                  "&:hover": { color: "#fff" },
                  "&:hover span": { width: "100%" },
                }}
              >
                {item.label.toUpperCase()}
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    height: "1px",
                    width: 0,
                    bgcolor: gold,
                    transition: "width 0.5s",
                  }}
                />
              </Link>
            ))}
          </Box>
          <Button
            href="#contact"
            sx={{
              border: "1px solid rgba(212,175,55,0.6)",
              bgcolor: "rgba(212,175,55,0.14)",
              color: gold,
              px: 2.5,
              py: 1.25,
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: "0.22em",
              "&:hover": { bgcolor: gold, color: "#050505" },
            }}
          >
            CONNECT
          </Button>
        </Box>
      </Box>

      <Box component="main">
        <Box
          id="top"
          component="section"
          sx={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0, transform: "scale(1.05)" }}>
            <Box
              component="img"
              src="/images/hero.jpg"
              alt="Abstract infrared light art"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.4)" }} />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #050505, rgba(5,5,5,0.35), rgba(5,5,5,0.7))",
              }}
            />
          </Box>
          <Box sx={{ ...wrap, position: "relative", zIndex: 1, pt: 20, pb: { xs: 8, md: 12 } }}>
            <Typography sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2, fontFamily: mono, fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.6)" }}>
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#00E5FF",
                  boxShadow: "0 0 12px 2px rgba(0,229,255,0.7)",
                }}
              />
              3D WELLNESS ENDOWMENT — ST. PAUL, MINNESOTA
            </Typography>
            <Typography component="h1" sx={{ fontFamily: display, fontWeight: 500, fontSize: "clamp(3.4rem, 11vw, 10rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
              <Box component="span" sx={{ display: "block" }}>Dream.</Box>
              <Box component="span" className="text-outline" sx={{ display: "block" }}>Design.</Box>
              <Box component="span" sx={{ display: "block", fontStyle: "italic", color: gold }}>Dignity.</Box>
            </Typography>
            <Box sx={{ mt: 5, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "flex-end" }, justifyContent: "space-between", gap: 5 }}>
              <Typography sx={{ maxWidth: 576, fontWeight: 300, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                Developing the 3D Wellness Hub — America’s first comprehensive Wellness City, where health, healing, and human flourishing are embedded into urban life.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  href="#projects"
                  endIcon={<ArrowDownwardIcon sx={{ fontSize: 16, transition: "transform 0.5s", ".MuiButton-root:hover &": { transform: "translateY(4px)" } }} />}
                  sx={{
                    bgcolor: gold,
                    color: "#050505",
                    px: 3.5,
                    py: 2,
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    "&:hover": { bgcolor: gold, boxShadow: "0 0 40px rgba(212,175,55,0.4)" },
                  }}
                >
                  EXPLORE OUR PLANS
                </Button>
                <Button
                  href="#contact"
                  sx={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    px: 3.5,
                    py: 2,
                    backdropFilter: "blur(8px)",
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    "&:hover": { borderColor: "rgba(255,255,255,0.6)", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  CONNECT WITH US
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", bottom: 0, right: { xs: 24, md: 48 }, zIndex: 1, display: { xs: "none", md: "block" }, height: 56 }}>
            <Box sx={{ position: "relative", display: "block", height: 56, width: "1px", overflow: "hidden", bgcolor: "rgba(255,255,255,0.15)" }}>
              <Box className="scroll-dot" sx={{ position: "absolute", left: 0, top: 0, height: 16, width: "1px", bgcolor: gold }} />
            </Box>
          </Box>
        </Box>

        <Box component="section" sx={{ py: { xs: 14, md: 20 } }}>
          <Box sx={wrap}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: 6 }}>
              <Typography sx={{ ...kicker, gridColumn: { md: "span 3" } }}>01 — WHO WE ARE</Typography>
              <Box sx={{ gridColumn: { md: "span 9" } }}>
                <Typography component="h2" sx={{ fontFamily: display, fontWeight: 500, fontSize: { xs: 36, sm: 48, md: 60 }, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                  Connecting the <Box component="span" sx={{ fontStyle: "italic", color: gold }}>Disconnected</Box>.
                </Typography>
                <Typography sx={{ mt: 4, maxWidth: 672, fontWeight: 300, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                  3D Wellness Endowment is a community-serving non-profit dedicated to connecting the disconnected. We believe in the power of multimedia technology to transform lives — bringing wellness, learning, and opportunity to the people and places the world leaves behind.
                </Typography>
                <Box
                  sx={{
                    mt: 8,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: "1px",
                    overflow: "hidden",
                    borderRadius: "16px",
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {pillars.map((pillar) => (
                    <Box
                      key={pillar.n}
                      sx={{
                        bgcolor: "#0A0A0B",
                        p: 4,
                        height: "100%",
                        transition: "background-color 0.5s",
                        "&:hover": { bgcolor: "#101012" },
                        "&:hover h3": { color: gold },
                      }}
                    >
                      <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)" }}>
                        {pillar.n}
                      </Typography>
                      <Typography component="h3" sx={{ mt: 2, fontFamily: display, fontStyle: "italic", fontSize: { xs: 24, md: 30 }, transition: "color 0.5s" }}>
                        {pillar.word}.
                      </Typography>
                      <Typography sx={{ mt: 2, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
                        {pillar.line}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box id="vision" component="section" sx={{ py: { xs: 14, md: 20 } }}>
          <Box sx={wrap}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: 8, alignItems: "center" }}>
              <Box sx={{ order: { xs: 2, md: 1 }, gridColumn: { md: "span 6" } }}>
                <Typography sx={kicker}>02 — THE VISION</Typography>
                <Typography component="h2" sx={{ mt: 3, fontFamily: display, fontWeight: 500, fontSize: { xs: 36, sm: 48, md: "3.4rem" }, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                  St. Paul as America’s first <Box component="span" sx={{ fontStyle: "italic", color: gold }}>Wellness City</Box>.
                </Typography>
                <Typography sx={{ mt: 4, maxWidth: 576, fontWeight: 300, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                  We envision St. Paul, Minnesota as America’s first comprehensive Wellness City — where health, healing, and human flourishing are embedded into urban life.
                </Typography>
                <Box sx={{ mt: 6, borderLeft: "2px solid rgba(212,175,55,0.6)", pl: 3 }}>
                  <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}>
                    WHY NOW?
                  </Typography>
                  <Typography sx={{ mt: 2, maxWidth: 576, fontWeight: 300, fontSize: { xs: 14, md: 16 }, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                    At the heart of this transformation, the 3D Wellness Endowment can serve as a catalytic hub — integrating immersive experiences, holistic care, and technology-enabled learning to drive equitable economic growth, downtown revitalization, and community resilience.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ order: { xs: 1, md: 2 }, gridColumn: { md: "span 6" } }}>
                <Box sx={{ position: "relative", maxWidth: { xs: 448, md: "none" }, mx: "auto" }}>
                  <Box sx={{ position: "absolute", inset: -16, borderRadius: "999px 999px 0 0", border: "1px solid rgba(212,175,55,0.25)" }} />
                  <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "999px 999px 0 0", "&:hover img": { transform: "scale(1.05)" } }}>
                    <Box
                      component="img"
                      src="/images/vision.jpg"
                      alt="Urban evening skyline at dusk"
                      sx={{ aspectRatio: "4 / 5", width: "100%", objectFit: "cover", display: "block", transition: "transform 1400ms ease-out" }}
                    />
                    <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.6), transparent)" }} />
                  </Box>
                  <Typography sx={{ mt: 3, textAlign: "center", fontFamily: mono, fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                    DOWNTOWN ST. PAUL — MINNESOTA, USA
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box id="projects" component="section" sx={{ py: { xs: 14, md: 20 } }}>
          <Box sx={wrap}>
            <Box sx={{ mb: 8, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: 5, alignItems: "flex-end" }}>
              <Box sx={{ gridColumn: { md: "span 7" } }}>
                <Typography sx={kicker}>03 — OUR PLANS</Typography>
                <Typography component="h2" sx={{ mt: 3, fontFamily: display, fontWeight: 500, fontSize: { xs: 36, sm: 48, md: 60 }, lineHeight: 1.05 }}>
                  Four projects. <Box component="span" sx={{ fontStyle: "italic", color: gold }}>One Hub.</Box>
                </Typography>
              </Box>
              <Typography sx={{ gridColumn: { md: "span 5" }, maxWidth: 448, fontWeight: 300, fontSize: { xs: 14, md: 16 }, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
                Four envisioned developments of the 3D Wellness Hub — planned facilities that bring wellness, immersive technology, education, and community together under one roof.
              </Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: { xs: 3, md: 4 } }}>
              <PhotoCard
                span={7}
                n="01 / PLANNED"
                kicker="CENTER FOR WELLNESS TECHNOLOGY"
                title="The Healing Hub"
                body="An integrated preventive and restorative wellness center providing care through healing modalities such as infrared light therapy, and non-invasive practices like massage and sound-based experiences."
                tags={["INFRARED LIGHT THERAPY", "MASSAGE", "SOUND-BASED EXPERIENCES"]}
                src="/images/healing.jpg"
                alt="Advanced light therapy in a dark room"
              />
              <PhotoCard
                span={5}
                n="02 / PLANNED"
                kicker="5D WELLNESS IMMERSION LAB"
                title="The Immersion Lab"
                body="An AI / AR / VR-powered experiential space featuring interactive wellness and cultural storytelling exhibits."
                tags={["AI", "AR", "VR", "IMMERSIVE EXHIBITS"]}
                src="/images/immersion.jpg"
                alt="Futuristic VR headset in neon light"
              />
              <Box sx={{ gridColumn: { md: "span 5" } }}>
                <Box
                  component="article"
                  className="card-glow"
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: { xs: 440, md: 480 },
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    bgcolor: "#0A0A0B",
                    p: { xs: 4, md: 5 },
                  }}
                >
                  <Box
                    sx={{
                      pointerEvents: "none",
                      position: "absolute",
                      right: -96,
                      top: -96,
                      width: 288,
                      height: 288,
                      borderRadius: "50%",
                      opacity: 0.4,
                      filter: "blur(48px)",
                      background: "radial-gradient(circle, rgba(0,229,255,0.35), transparent 65%)",
                    }}
                  />
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                      <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.3em", color: "#00E5FF" }}>
                        WELLNESS TECHNOLOGY INTERNATIONAL SCHOOL
                      </Typography>
                      <Typography sx={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
                        03 / PLANNED
                      </Typography>
                    </Box>
                    <Typography component="h3" sx={{ mt: 4, fontFamily: display, fontWeight: 500, fontSize: { xs: 30, md: 36 }, lineHeight: 1.15 }}>
                      A school for <Box component="span" sx={{ fontStyle: "italic", color: gold }}>future-ready</Box> careers.
                    </Typography>
                  </Box>
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography sx={{ fontWeight: 300, fontSize: { xs: 14, md: 16 }, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                      An education and workforce development hub offering training in emerging technology, with pathways for youth and adults into future-ready careers.
                    </Typography>
                    <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {["EDUCATION", "TECHNOLOGY TRAINING", "WORKFORCE DEVELOPMENT"].map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <PhotoCard
                span={7}
                n="04 / PLANNED"
                kicker="COMMUNITY COMMONS & CULINARY INNOVATION CENTRE"
                title="The Community Commons"
                body="Flexible event space for community gatherings, workshops, and wellness-centered programming — supporting a greenhouse, commercial kitchen, cafeteria, and food-related innovation."
                tags={["GREENHOUSE", "COMMERCIAL KITCHEN", "CAFETERIA", "WORKSHOPS"]}
                src="/images/commons.jpg"
                alt="Modern greenhouse interior"
              />
            </Box>
          </Box>
        </Box>

        <Box
          id="manifesto"
          component="section"
          className="marquee"
          aria-label="Manifesto"
          sx={{
            position: "relative",
            overflow: "hidden",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "#0A0A0B",
            py: { xs: 8, md: 12 },
          }}
        >
          <Box className="marquee-track">
            {[0, 1].map((copy) => (
              <Box
                key={copy}
                component="span"
                aria-hidden={copy === 1 ? true : undefined}
                sx={{ display: "flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}
              >
                <Box component="span" sx={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.8rem, 5vw, 4.5rem)", lineHeight: 1, color: "rgba(255,255,255,0.85)" }}>
                  Dreaming boldly. Designing wellness technology. Expanding access — so every community can thrive with&nbsp;
                </Box>
                <Box component="span" sx={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.8rem, 5vw, 4.5rem)", lineHeight: 1, color: gold }}>
                  dignity.
                </Box>
                <Box component="span" sx={{ mx: { xs: 4, md: 6 }, width: 12, height: 12, transform: "rotate(45deg)", bgcolor: "rgba(212,175,55,0.7)", display: "inline-block" }} />
              </Box>
            ))}
          </Box>
          <Typography sx={{ ...wrap, mt: 6, fontFamily: mono, fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
            THE 3DWE MANIFESTO
          </Typography>
        </Box>

        <Box id="contact" component="section" sx={{ py: { xs: 14, md: 20 } }}>
          <Box sx={wrap}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: 8 }}>
              <Box sx={{ gridColumn: { md: "span 7" } }}>
                <Typography sx={kicker}>04 — CONNECT</Typography>
                <Typography component="h2" sx={{ mt: 3, fontFamily: display, fontWeight: 500, fontSize: { xs: 36, sm: 48, md: 60 }, lineHeight: 1.05 }}>
                  Let’s build the Hub, <Box component="span" sx={{ fontStyle: "italic", color: gold }}>together</Box>.
                </Typography>
                <Typography sx={{ mt: 3, maxWidth: 512, fontWeight: 300, fontSize: { xs: 14, md: 16 }, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
                  Questions, partnerships, or a wish to get involved — send us a note and we will respond.
                </Typography>
                {sent ? (
                  <Typography sx={{ mt: 6, maxWidth: 512, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                    This page does not send the note. Write admin@3dwellness.org and we will respond.
                  </Typography>
                ) : (
                  <Box component="form" onSubmit={onSubmit} sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
                      <Box>
                        <Typography component="label" htmlFor="contact-name" sx={{ mb: 1, display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>
                          NAME
                        </Typography>
                        <TextField id="contact-name" name="name" required fullWidth placeholder="Your name" hiddenLabel inputProps={{ minLength: 2, maxLength: 120 }} sx={fieldSx} />
                      </Box>
                      <Box>
                        <Typography component="label" htmlFor="contact-email" sx={{ mb: 1, display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>
                          EMAIL
                        </Typography>
                        <TextField id="contact-email" name="email" type="email" required fullWidth placeholder="you@example.com" hiddenLabel inputProps={{ maxLength: 200 }} sx={fieldSx} />
                      </Box>
                    </Box>
                    <Box>
                      <Typography component="label" htmlFor="contact-message" sx={{ mb: 1, display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>
                        MESSAGE
                      </Typography>
                      <TextField id="contact-message" name="message" required fullWidth multiline rows={6} placeholder="Tell us what's on your mind..." hiddenLabel inputProps={{ minLength: 2, maxLength: 5000 }} sx={fieldSx} />
                    </Box>
                    <Box>
                      <Button
                        type="submit"
                        endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          bgcolor: gold,
                          color: "#050505",
                          px: 4,
                          py: 2,
                          fontFamily: mono,
                          fontSize: 11,
                          letterSpacing: "0.22em",
                          "&:hover": { bgcolor: gold, boxShadow: "0 0 40px rgba(212,175,55,0.4)" },
                        }}
                      >
                        SEND MESSAGE
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box sx={{ gridColumn: { md: "span 5" } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1px", overflow: "hidden", borderRadius: "16px", bgcolor: "rgba(255,255,255,0.1)" }}>
                  {[
                    { href: "#contact", label: "VISIT", value: "19 Exchange E., St. Paul, MN 55101", icon: <PlaceOutlinedIcon sx={{ fontSize: 16, color: gold }} /> },
                    { href: "mailto:admin@3dwellness.org", label: "WRITE", value: "admin@3dwellness.org", icon: <MailOutlineIcon sx={{ fontSize: 16, color: gold }} /> },
                    { href: "tel:+16514688024", label: "CALL", value: "+1 (651) 468-8024", icon: <PhoneOutlinedIcon sx={{ fontSize: 16, color: gold }} /> },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      underline="none"
                      color="inherit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                        bgcolor: "#0A0A0B",
                        p: 3.5,
                        transition: "background-color 0.5s",
                        "&:hover": { bgcolor: "#101012" },
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "1px solid rgba(212,175,55,0.4)",
                          bgcolor: "rgba(212,175,55,0.14)",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontWeight: 300, fontSize: { xs: 14, md: 16 } }}>{item.value}</Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
                <Typography sx={{ mt: 4, borderLeft: "2px solid rgba(255,255,255,0.15)", pl: 2.5, fontSize: 12, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
                  The facilities described on this site are planned developments of the 3D Wellness Hub. Reach out to learn more or get involved in bringing them to life.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box component="footer" sx={{ pt: { xs: 12, md: 16 }, overflow: "hidden" }}>
        <Box sx={wrap}>
          <Link href="#top" underline="none" color="inherit" sx={{ "&:hover .dream": { color: gold } }}>
            <Typography sx={{ fontFamily: display, fontWeight: 500, fontSize: "clamp(2.6rem, 9vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
              <Box component="span" className="dream" sx={{ color: "#fff", transition: "color 0.5s" }}>Dream.</Box>{" "}
              <Box component="span" className="text-outline">Design.</Box>{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: gold }}>Dignity.</Box>
            </Typography>
          </Link>
          <Box
            sx={{
              mt: 8,
              py: 5,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "center" },
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Logo size={32} />
              <Box>
                <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.24em", color: "rgba(255,255,255,0.7)" }}>
                  3D WELLNESS ENDOWMENT
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                  A community-serving non-profit — St. Paul, Minnesota, USA
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", alignItems: { md: "flex-end" } }}>
              <span>© {new Date().getFullYear()} 3D WELLNESS ENDOWMENT</span>
              <span>19 EXCHANGE E., ST. PAUL, MN 55101</span>
              <span>ADMIN@3DWELLNESS.ORG · +1 (651) 468-8024</span>
            </Box>
          </Box>
          <Typography sx={{ pb: 5, textAlign: "center", fontSize: 10, fontWeight: 300, letterSpacing: "0.04em", color: "rgba(255,255,255,0.25)" }}>
            Facilities described are planned developments of the 3D Wellness Hub.
          </Typography>
        </Box>
      </Box>
      <Box className="grain" aria-hidden />
    </Box>
  );
}
