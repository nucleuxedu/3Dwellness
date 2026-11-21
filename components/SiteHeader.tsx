import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BrandMark from "@/components/BrandMark";

const nav = [
  { href: "#about", label: "Who we are" },
  { href: "#vision", label: "Vision" },
  { href: "#plans", label: "Our plans" },
  { href: "#connect", label: "Connect" },
  { href: "/center", label: "Center for wellness technology" },
];

export default function SiteHeader() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Button href="/" color="inherit" startIcon={<BrandMark />} sx={{ fontWeight: 500, px: 0, minWidth: 0 }}>
              3D Wellness
            </Button>
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" }, mx: "auto" }}>
              {nav.map((item) => (
                <Button key={item.href} href={item.href} color="inherit">
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Button href="#plans" variant="contained" sx={{ display: { xs: "none", md: "inline-flex" }, ml: "auto" }}>
              Explore our plans
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
          <Button href="#plans" variant="contained" fullWidth onClick={() => setMenu(false)}>
            Explore our plans
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
