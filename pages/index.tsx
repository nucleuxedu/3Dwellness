import { FormEvent, useState } from "react";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { brand } from "@/theme/theme";

const rooms = [
  { id: "care", name: "Healing Hub", line: "Infrared light, massage and sound.", value: "Care" },
  { id: "lab", name: "Immersion Lab", line: "Headset exhibits you walk through.", value: "Lab" },
  { id: "school", name: "Technology school", line: "Training for youth and adults.", value: "School" },
  { id: "meals", name: "Community commons", line: "A greenhouse, a kitchen and a cafeteria.", value: "Meals" },
];

const nav = [
  { href: "#spaces", label: "Rooms" },
  { href: "#hub", label: "The plan" },
  { href: "#school", label: "School" },
  { href: "#care", label: "Care" },
];

function Mark() {
  return (
    <Box component="svg" viewBox="0 0 40 40" width={28} height={28} aria-hidden sx={{ display: "block" }}>
      <path d="M20 6 33 13.5v15L20 36 7 28.5v-15L20 6Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 6v14.5M20 20.5 7 13.5M20 20.5 33 13.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="20" cy="20.5" r="2.4" fill="currentColor" />
    </Box>
  );
}

const sectionPy = { xs: 5, md: 6 } as const;

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

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
    if (Object.keys(next).length) event.preventDefault();
  }

  return (
    <>
      <Head>
        <title>3D Wellness Endowment: a wellness center for St. Paul</title>
      </Head>

      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Button href="#top" color="inherit" startIcon={<Mark />} sx={{ fontWeight: 500, px: 0, minWidth: 0 }}>
              3D Wellness
            </Button>
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" }, mx: "auto" }}>
              {nav.map((item) => (
                <Button key={item.href} href={item.href} color="inherit">
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Button href="#visit" variant="contained" sx={{ display: { xs: "none", md: "inline-flex" }, ml: "auto" }}>
              Send a message
            </Button>
            <IconButton
              aria-label={menu ? "Close menu" : "Menu"}
              aria-expanded={menu}
              onClick={() => setMenu(true)}
              sx={{ display: { md: "none" }, ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={menu} onClose={() => setMenu(false)}>
        <Box sx={{ width: 280, p: 2 }} role="navigation" aria-label="Main">
          <IconButton aria-label="Close menu" onClick={() => setMenu(false)} sx={{ mb: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            {nav.map((item) => (
              <ListItemButton key={item.href} href={item.href} component="a" onClick={() => setMenu(false)}>
                {item.label}
              </ListItemButton>
            ))}
          </List>
          <Button href="#visit" variant="contained" fullWidth onClick={() => setMenu(false)}>
            Send a message
          </Button>
        </Box>
      </Drawer>

      <Box component="main" id="top">
        <Box
          component="section"
          aria-labelledby="hero-h"
          sx={{
            position: "relative",
            minHeight: { xs: 520, md: 620 },
            display: "flex",
            alignItems: "center",
            color: "common.white",
          }}
        >
          <Box
            component="img"
            src="/images/immersion-1600.jpg"
            srcSet="/images/immersion-800.jpg 800w, /images/immersion-1600.jpg 1600w"
            sizes="100vw"
            alt="A person wearing a headset in blue light"
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% 40%" }}
          />
          <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 5, md: 6 } }}>
            <Box sx={{ maxWidth: 460, bgcolor: "background.default", color: "text.primary", borderRadius: 3, p: { xs: 3, md: 4 } }}>
              <Typography id="hero-h" variant="h1" component="h1">
                Wellness center in St. Paul
              </Typography>
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                3D Wellness Endowment is planning four rooms for care, training and meals in downtown St. Paul. None is open yet.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
                <Button href="#visit" variant="contained">Send a message</Button>
                <Button href="#spaces" variant="outlined" color="primary">See the rooms</Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Box component="section" id="spaces" aria-labelledby="spaces-h" sx={{ py: sectionPy }}>
          <Container maxWidth="lg">
            <Typography id="spaces-h" variant="h2" component="h2">Rooms</Typography>
            <Typography sx={{ mt: 1, mb: 3, color: "text.secondary" }}>
              Care, a lab, a school and shared meals. None has a price yet.
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 3, md: 5 }, alignItems: "center" }}>
              <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                {rooms.map((room) => (
                  <Box key={room.id} id={room.id} component="li" sx={{ py: 1.5, borderTop: 1, borderColor: "divider", "&:last-child": { borderBottom: 1 } }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
                      <Typography component="span" sx={{ fontWeight: 500 }}>{room.name}</Typography>
                      <Typography component="span" sx={{ color: "text.secondary" }}>{room.value}</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>{room.line}</Typography>
                  </Box>
                ))}
              </Box>
              <Box
                component="img"
                src="/images/healing.jpg"
                alt="A therapy lamp in a dark room"
                width={867}
                height={1300}
                loading="lazy"
                sx={{ width: "100%", height: { xs: 280, md: 420 }, objectFit: "cover", borderRadius: 3, display: "block" }}
              />
            </Box>
          </Container>
        </Box>

        <Box component="section" id="hub" aria-label="The plan" sx={{ py: sectionPy, bgcolor: "background.paper" }}>
          <Container maxWidth="lg">
            <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.08em" }}>The plan</Typography>
            <Typography variant="h2" component="p" sx={{ mt: 1, maxWidth: 820 }}>
              The greenhouse sits under a glass roof beside the kitchen, and the care room is kept dark so the tools can use{" "}
              <Box component="span" sx={{ color: brand }}>light</Box>.
            </Typography>
          </Container>
        </Box>

        <Box component="section" id="visit" aria-labelledby="visit-h" sx={{ py: sectionPy }}>
          <Container maxWidth="lg">
            <Typography id="visit-h" variant="h2" component="h2">Contact</Typography>
            <Typography sx={{ mt: 1, mb: 3, color: "text.secondary" }}>Write about the hub.</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 3, md: 5 }, alignItems: "start" }}>
              <Box>
                <Typography component="address" sx={{ fontStyle: "normal", mb: 1 }}>
                  Exchange E.<br />
                  downtown St. Paul
                </Typography>
                <Link href="https://www.openstreetmap.org/search?query=Exchange+E.+downtown+St.+Paul" underline="hover" color="inherit">
                  Get directions
                </Link>
                <Box
                  component="form"
                  action="mailto:hello@3dwellness.example"
                  method="post"
                  encType="text/plain"
                  noValidate
                  onSubmit={onSubmit}
                  sx={{ mt: 2, display: "grid", gap: 2 }}
                >
                  <TextField name="name" label="Name" required autoComplete="name" error={Boolean(errors.name)} helperText={errors.name || " "} />
                  <TextField name="email" label="Email" type="email" required autoComplete="email" error={Boolean(errors.email)} helperText={errors.email || " "} />
                  <TextField name="message" label="Message" required autoComplete="off" error={Boolean(errors.message)} helperText={errors.message || " "} />
                  <Button type="submit" variant="contained" sx={{ justifySelf: "start" }}>Send a message</Button>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>There is no published reply time.</Typography>
                </Box>
              </Box>
              <Box
                component="img"
                src="/images/vision.jpg"
                alt="Downtown buildings at dusk"
                width={1880}
                height={1253}
                loading="lazy"
                sx={{ width: "100%", height: { xs: 240, md: 460 }, objectFit: "cover", borderRadius: 3, display: "block" }}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Box component="footer" sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 4 }}>
            <Box>
              <Typography variant="h2" component="h2" sx={{ color: "inherit", fontSize: { xs: 28, md: 36 } }}>
                Send a message about the hub
              </Typography>
              <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.72)" }}>None of the four rooms is open.</Typography>
            </Box>
            <Button href="#visit" variant="contained" color="secondary">Send a message</Button>
          </Stack>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "2fr repeat(4, 1fr)" }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "inherit", mb: 1 }}>
                <Mark />
                <Typography sx={{ fontWeight: 500 }}>3D Wellness</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>A non-profit in downtown St. Paul.</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)", mt: 1 }}>Exchange E., downtown St. Paul</Typography>
            </Box>
            {[
              ["Rooms", [{ href: "#spaces", label: "Rooms" }, { href: "#meals", label: "Community commons" }]],
              ["The plan", [{ href: "#hub", label: "The plan" }]],
              ["School", [{ href: "#school", label: "Technology school" }]],
              ["Care", [{ href: "#care", label: "Healing Hub" }]],
            ].map(([title, links]) => (
              <Box key={title as string}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>{title as string}</Typography>
                {(links as { href: string; label: string }[]).map((item) => (
                  <Link key={item.href} href={item.href} color="inherit" underline="hover" display="block" variant="body2" sx={{ py: 0.5, color: "rgba(255,255,255,0.72)" }}>
                    {item.label}
                  </Link>
                ))}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mt: 4, color: "rgba(255,255,255,0.72)" }}>
            © {new Date().getFullYear()} 3D Wellness Endowment
          </Typography>
        </Container>
      </Box>
    </>
  );
}
