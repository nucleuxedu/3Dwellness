import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link000, Link003 } from "@/components/ui/skiper-ui/skiper40";
import { LineHoverLink } from "@/components/ui/line-hover-link";
import { site } from "@/lib/siteContent";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Our Plans", href: "/programs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Support the Hub", href: "/donate" },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "muted.main",
        pt: { xs: 8, md: 11 },
        pb: { xs: 4, md: 5 },
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="headlineSm" component="p" sx={{ mb: 1 }}>
              {site.name}
            </Typography>
            <Typography variant="labelMd" sx={{ mb: 2, display: "block" }}>
              {site.tagline}
            </Typography>
            <Typography variant="bodyLg" sx={{ maxWidth: 420, mb: 3 }}>
              A community-serving non-profit dedicated to &quot;
              {site.missionShort}&quot; — building a 3D Wellness Hub in downtown
              St. Paul.
            </Typography>
            <Box
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              <Link003
                href={`mailto:${site.email}`}
                className="font-poppins text-[16px] text-[#333333]"
              >
                {site.email}
              </Link003>
            </Box>
          </Grid>

          {/* {footerLinks.map((group) => (
            <Grid item xs={6} md={2} key={group.title}>
              <Typography variant="labelSm" sx={{ mb: 2.5, display: "block" }}>
                {group.title}
              </Typography>
              <Stack spacing={1.5}>
                {group.links.map((link) => (
                  <LineHoverLink
                    key={link.label}
                    href={link.href}
                    variant="slide"
                    className="font-poppins text-[16px] font-light text-[#333333]"
                  >
                    {link.label}
                  </LineHoverLink>
                ))}
              </Stack>
            </Grid>
          ))} */}

          <Grid item xs={12} md={3}>
            <Typography variant="labelSm" sx={{ mb: 2.5, display: "block" }}>
              Connect
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body1">{site.address}</Typography>
              <Link000
                href={`mailto:${site.email}`}
                className="font-poppins text-[16px] font-light text-[#333333]"
              >
                {site.email}
              </Link000>
              <LineHoverLink
                href={site.phoneHref}
                variant="slide"
                className="font-poppins text-[16px] font-light text-[#333333]"
              >
                {site.phone}
              </LineHoverLink>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: "divider" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2">{site.copyright}</Typography>
          <Typography variant="body2">{site.fullName}</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
