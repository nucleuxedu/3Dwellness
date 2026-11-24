import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";
import Bookings from "./Bookings";
import BookRoom from "./BookRoom";
import Clients from "./Clients";
import FrontDesk from "./FrontDesk";
import Overview from "./Overview";
import PlanAndHours from "./PlanAndHours";
import { btnMotionSx } from "./ui";
import type { PortalView } from "./types";

const NAV: { id: PortalView; label: string; icon: typeof DashboardOutlinedIcon; staff?: boolean }[] = [
  { id: "home", label: "Overview", icon: DashboardOutlinedIcon },
  { id: "book", label: "Book a room", icon: EventAvailableOutlinedIcon },
  { id: "bookings", label: "My bookings", icon: CalendarMonthOutlinedIcon },
  { id: "clients", label: "Clients", icon: PeopleOutlineIcon },
  { id: "plan", label: "Plan and hours", icon: HourglassEmptyOutlinedIcon },
  { id: "desk", label: "Front desk", icon: FactCheckOutlinedIcon, staff: true },
];

export default function PortalShell() {
  const [view, setView] = useState<PortalView>("home");
  const [version, setVersion] = useState(0);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);

  const bump = () => setVersion((v) => v + 1);
  const notify = (message: string) => setToast({ message, key: Date.now() });

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const shared = { version, bump, notify, go: setView };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        bgcolor: "background.paper",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 100% -10%, rgba(181,201,77,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 0% 100%, rgba(28,36,75,0.06), transparent 50%)",
      }}
    >
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(247,246,241,0.92)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            maxWidth: 1180,
            mx: "auto",
            px: { xs: 2.5, md: 4 },
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.5} minWidth={0}>
            <Box sx={{ color: "primary.main", flex: "none" }}>
              <BrandMark size={32} />
            </Box>
            <Box minWidth={0}>
              <Typography
                component="p"
                sx={{
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                }}
              >
                Center for Wellness Technology
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                Practitioner portal
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          component="nav"
          aria-label="Main"
          sx={{
            maxWidth: 1180,
            mx: "auto",
            px: { xs: 2.5, md: 4 },
            pb: 1.5,
            display: "flex",
            gap: 0.75,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <Button
                key={item.id}
                onClick={() => setView(item.id)}
                aria-current={on ? "page" : undefined}
                startIcon={<Icon sx={{ fontSize: 18 }} />}
                sx={{
                  ...btnMotionSx,
                  flex: "none",
                  minHeight: 40,
                  px: 1.75,
                  borderRadius: 999,
                  color: on ? "primary.contrastText" : "text.primary",
                  bgcolor: on ? "primary.main" : "transparent",
                  border: "1px solid",
                  borderColor: on ? "primary.main" : "transparent",
                  fontWeight: on ? 600 : 500,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    bgcolor: on ? "primary.main" : "rgba(28,36,75,0.06)",
                    borderColor: on ? "primary.main" : "divider",
                  },
                }}
              >
                {item.label}
                {item.staff ? (
                  <Typography component="span" variant="caption" sx={{ ml: 0.75, opacity: 0.7, fontWeight: 400 }}>
                    staff
                  </Typography>
                ) : null}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 2.5, md: 4 },
          py: { xs: 4, md: 5.5 },
          minWidth: 0,
        }}
      >
        {view === "home" && <Overview {...shared} />}
        {view === "book" && <BookRoom {...shared} />}
        {view === "bookings" && <Bookings {...shared} />}
        {view === "clients" && <Clients {...shared} />}
        {view === "plan" && <PlanAndHours {...shared} />}
        {view === "desk" && <FrontDesk {...shared} />}
      </Box>

      <Snackbar
        key={toast?.key}
        open={Boolean(toast)}
        message={toast?.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 2,
            boxShadow: "0 12px 40px rgba(28,36,75,0.25)",
          },
        }}
      />
    </Box>
  );
}
