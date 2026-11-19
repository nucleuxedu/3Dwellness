import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 72, md: 88 },
            justifyContent: "space-between",
          }}
        >
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            3D Wellness
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.href}
                component={Link}
                href={link.href}
                variant="navLink"
                sx={{
                  color:
                    router.pathname === link.href
                      ? "primary.dark"
                      : "text.primary",
                  borderBottom:
                    router.pathname === link.href
                      ? "2px solid"
                      : "2px solid transparent",
                  borderColor:
                    router.pathname === link.href
                      ? "primary.main"
                      : "transparent",
                  pb: 0.5,
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
            <Button
              component={Link}
              href="/donate"
              variant="contained"
              color="primary"
              sx={{ width: { md: 180 }, px: 4 }}
            >
              Donate
            </Button>
          </Stack>

          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 280, p: 2, bgcolor: "background.default" },
        }}
      >
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ variant: "navLink" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2 }}>
            <Button
              component={Link}
              href="/donate"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Donate
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
