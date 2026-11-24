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
import Bookings from "./Bookings";
import BookRoom from "./BookRoom";
import Clients from "./Clients";
import FrontDesk from "./FrontDesk";
import Overview from "./Overview";
import PlanAndHours from "./PlanAndHours";
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
        display: { md: "flex" },
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Box
        component="aside"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          width: { md: 240 },
          flex: { md: "none" },
        }}
      >
        <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
          <Typography fontWeight={600} lineHeight={1.25}>
            Center for Wellness Technology
          </Typography>
          <Typography variant="caption" sx={{ mt: 0.5, display: "block", opacity: 0.75 }}>
            Practitioner portal
          </Typography>
        </Box>
        <Stack
          component="nav"
          aria-label="Main"
          direction={{ xs: "row", md: "column" }}
          gap={0.5}
          sx={{ px: 1.5, py: 1.5, overflowX: { xs: "auto", md: "visible" } }}
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
                  flex: "none",
                  justifyContent: "flex-start",
                  whiteSpace: "nowrap",
                  color: on ? "primary.main" : "primary.contrastText",
                  bgcolor: on ? "background.default" : "transparent",
                  fontWeight: on ? 600 : 500,
                  minHeight: 40,
                  px: 1.5,
                  mt: item.staff ? { md: 3 } : 0,
                  "&:hover": {
                    bgcolor: on ? "background.default" : "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {item.label}
                {item.staff ? (
                  <Typography component="span" variant="caption" sx={{ ml: 0.75, opacity: 0.75, fontWeight: 400 }}>
                    (staff)
                  </Typography>
                ) : null}
              </Button>
            );
          })}
        </Stack>
      </Box>

      <Box component="main" sx={{ minWidth: 0, flex: 1, px: { xs: 2.5, md: 5 }, py: 4 }}>
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
          },
        }}
      />
    </Box>
  );
}
