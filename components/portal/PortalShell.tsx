import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BrandMark from "@/components/BrandMark";
import Bookings from "./Bookings";
import BookRoom from "./BookRoom";
import Clients from "./Clients";
import FrontDesk from "./FrontDesk";
import Overview from "./Overview";
import PlanAndHours from "./PlanAndHours";
import { btnMotionSx } from "./ui";
import type { PortalView } from "./types";

const AUTH_KEY = "3dwellness.auth";

const NAV: { id: PortalView; label: string; icon: typeof DashboardOutlinedIcon; staff?: boolean }[] = [
  { id: "home", label: "Overview", icon: DashboardOutlinedIcon },
  { id: "book", label: "Book a room", icon: EventAvailableOutlinedIcon },
  { id: "bookings", label: "My bookings", icon: CalendarMonthOutlinedIcon },
  { id: "clients", label: "Clients", icon: PeopleOutlineIcon },
  { id: "plan", label: "Plan and hours", icon: HourglassEmptyOutlinedIcon },
  { id: "desk", label: "Front desk", icon: FactCheckOutlinedIcon, staff: true },
];

type AuthUser = { email: string; name: string };

function readAuth(): AuthUser {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthUser;
      if (parsed?.name && parsed?.email) return parsed;
    }
  } catch {
    /* ignore */
  }
  return { name: "Maya Lindqvist", email: "maya@example.com" };
}

export default function PortalShell() {
  const router = useRouter();
  const [view, setView] = useState<PortalView>("home");
  const [version, setVersion] = useState(0);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);
  const [user, setUser] = useState<AuthUser>({ name: "Maya Lindqvist", email: "maya@example.com" });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const bump = () => setVersion((v) => v + 1);
  const notify = (message: string) => setToast({ message, key: Date.now() });
  const menuOpen = Boolean(menuAnchor);
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  useEffect(() => {
    setUser(readAuth());
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const closeMenu = () => setMenuAnchor(null);

  const openProfile = () => {
    closeMenu();
    setProfileOpen(true);
  };

  const logout = () => {
    closeMenu();
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    router.push("/center");
  };

  const shared = { version, bump, notify, go: setView };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
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
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: 1180,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 1.5, md: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 1.5 }} minWidth={0} sx={{ flex: 1 }}>
            <Box sx={{ color: "primary.main", flex: "none" }}>
              <BrandMark size={28} />
            </Box>
            <Box minWidth={0}>
              <Typography
                component="p"
                sx={{
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  fontSize: { xs: "0.88rem", sm: "1.05rem" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: { xs: "nowrap", sm: "normal" },
                }}
              >
                Center for Wellness Technology
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                Practitioner portal
              </Typography>
            </Box>
          </Stack>

          <IconButton
            aria-label="Account menu"
            aria-controls={menuOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              flex: "none",
              p: 0.5,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              "&:hover": { bgcolor: "background.default", borderColor: "primary.main" },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {initials || "ML"}
            </Avatar>
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={menuAnchor}
            open={menuOpen}
            onClose={closeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 220,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0,
                  boxShadow: "0 12px 32px rgba(28,36,75,0.12)",
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" fontWeight={600}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={openProfile} sx={{ minHeight: 44, py: 1.25 }}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={logout} sx={{ minHeight: 44, py: 1.25 }}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>

          <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} fullWidth maxWidth="xs">
            <DialogTitle sx={{ fontWeight: 500 }}>Profile</DialogTitle>
            <DialogContent>
              <Stack direction="row" gap={2} alignItems="center" sx={{ pt: 0.5 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontWeight: 600 }}>{initials || "ML"}</Avatar>
                <Box>
                  <Typography fontWeight={600}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Massage therapist · Practitioner
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setProfileOpen(false)} variant="contained">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box
          component="nav"
          aria-label="Main"
          sx={{
            maxWidth: 1180,
            mx: "auto",
            px: { xs: 2, md: 4 },
            pb: 1.5,
            display: "flex",
            gap: 0.75,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
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
                aria-label={item.staff ? `${item.label} (staff)` : item.label}
                startIcon={<Icon sx={{ fontSize: 18 }} />}
                sx={{
                  ...btnMotionSx,
                  flex: "none",
                  minHeight: 44,
                  px: { xs: 1.25, sm: 1.75 },
                  borderRadius: 999,
                  color: on ? "primary.contrastText" : "text.primary",
                  bgcolor: on ? "primary.main" : "transparent",
                  border: "1px solid",
                  borderColor: on ? "primary.main" : "transparent",
                  fontWeight: on ? 600 : 500,
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  "& .MuiButton-startIcon": { mr: { xs: 0.5, sm: 1 } },
                  "&:hover": {
                    transform: "translateY(-2px)",
                    bgcolor: on ? "primary.main" : "rgba(28,36,75,0.06)",
                    borderColor: on ? "primary.main" : "divider",
                  },
                }}
              >
                {item.label}
                {item.staff ? (
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ ml: 0.5, opacity: 0.7, fontWeight: 400, display: { xs: "none", sm: "inline" } }}
                  >
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
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5.5 },
          minWidth: 0,
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
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
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        ContentProps={{
          sx: {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            boxShadow: "0 12px 40px rgba(28,36,75,0.25)",
            fontWeight: 500,
            width: "100%",
          },
        }}
      />
    </Box>
  );
}
