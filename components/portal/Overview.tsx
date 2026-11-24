import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/portal/api";
import { fmtDate, fmtDay, fmtTime, hrs, hourWord } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import HourBlocks from "./HourBlocks";
import Loading from "./Loading";
import type { PortalShared } from "./types";

export default function Overview({ version, go }: PortalShared) {
  const me = useApi(api.getMe, [version]);
  const balance = useApi(api.getBalance, [version]);
  const bookings = useApi(api.getBookings, [version]);
  if (!me || !balance || !bookings) return <Loading />;

  const plan = me.subscription.plan;
  const now = new Date();
  const upcoming = bookings.filter((b: { status: string; end: string }) => b.status === "confirmed" && new Date(b.end) > now).slice(0, 4);
  const low = balance.balance_minutes <= 120;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: { lg: "3fr 2fr" },
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary">
          {me.name}
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{ mt: 0.5, fontSize: { xs: "2.25rem", md: "2.75rem" }, fontWeight: 500 }}
        >
          {hrs(balance.balance_minutes)} {hourWord(balance.balance_minutes)} left this month
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {plan.name} plan, {hrs(plan.minutes_per_month)} hours a month. Renews {fmtDate(balance.period_end)}.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <HourBlocks granted={balance.granted_minutes} used={balance.used_minutes} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            Each square is one hour. Empty squares are used.
          </Typography>
        </Box>
        {low ? (
          <Alert
            severity="warning"
            sx={{ mt: 3, alignItems: "center" }}
            action={
              <Button color="inherit" size="small" onClick={() => go("plan")}>
                See plans
              </Button>
            }
          >
            You are down to {hrs(balance.balance_minutes)} {hourWord(balance.balance_minutes)}. Change your plan to get
            more hours now.
          </Alert>
        ) : null}
        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => go("book")}>
            Book a room
          </Button>
          <Button variant="outlined" onClick={() => go("plan")}>
            View hour history
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h3" component="h2" color="primary">
          Coming up
        </Typography>
        {upcoming.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            No rooms booked. Book a room and it will show here.
          </Typography>
        ) : (
          <List
            dense
            sx={{
              mt: 1.5,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              py: 0,
            }}
          >
            {upcoming.map((b: { id: number; start: string; end: string; room_name: string; client_name?: string }) => (
              <ListItem
                key={b.id}
                alignItems="flex-start"
                sx={{ flexDirection: "column", alignItems: "stretch", py: 1.5, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: 0 } }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {fmtDay(b.start)},{" "}
                  <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
                    {fmtTime(b.start)} to {fmtTime(b.end)}
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {b.room_name}
                  {b.client_name ? ` with ${b.client_name}` : ""}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => go("bookings")}>
          See all bookings
        </Button>
      </Box>
    </Box>
  );
}
