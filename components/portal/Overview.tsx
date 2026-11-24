import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/portal/api";
import { fmtDate, fmtDay, fmtTime, hrs, hourWord } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import HourBlocks from "./HourBlocks";
import Loading from "./Loading";
import { btnMotionSx, listPanelSx, rowDividerSx } from "./ui";
import type { PortalShared } from "./types";

export default function Overview({ version, go }: PortalShared) {
  const me = useApi(api.getMe, [version]);
  const balance = useApi(api.getBalance, [version]);
  const bookings = useApi(api.getBookings, [version]);
  if (!me || !balance || !bookings) return <Loading />;

  const plan = me.subscription.plan;
  const now = new Date();
  const upcoming = bookings
    .filter((b: { status: string; end: string }) => b.status === "confirmed" && new Date(b.end) > now)
    .slice(0, 4);
  const low = balance.balance_minutes <= 120;

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 5, lg: 7 },
        gridTemplateColumns: { lg: "1.35fr 0.9fr" },
        alignItems: "start",
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.14em", color: "text.secondary", fontWeight: 500 }}
        >
          {me.name} · {me.specialty}
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mt: 1,
            fontSize: { xs: "2.6rem", md: "3.5rem" },
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
            maxWidth: "11ch",
          }}
        >
          {hrs(balance.balance_minutes)} {hourWord(balance.balance_minutes)} left
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 420 }}>
          {plan.name} plan · {hrs(plan.minutes_per_month)} hours a month · renews {fmtDate(balance.period_end)}
        </Typography>

        <Box sx={{ mt: 3.5 }}>
          <HourBlocks granted={balance.granted_minutes} used={balance.used_minutes} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1.25, display: "block" }}>
            Each square is one hour. Hollow squares are used.
          </Typography>
        </Box>

        {low ? (
          <Alert
            severity="warning"
            sx={{ mt: 3, borderRadius: 0, alignItems: "center" }}
            action={
              <Button color="inherit" size="small" onClick={() => go("plan")} sx={btnMotionSx}>
                See plans
              </Button>
            }
          >
            You are down to {hrs(balance.balance_minutes)} {hourWord(balance.balance_minutes)}. Change your plan to get
            more hours now.
          </Alert>
        ) : null}

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => go("book")} sx={btnMotionSx}>
            Book a room
          </Button>
          <Button variant="outlined" onClick={() => go("plan")} sx={btnMotionSx}>
            View hour history
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography
          component="h2"
          sx={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "text.secondary" }}
        >
          Coming up
        </Typography>

        {upcoming.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No rooms booked. Book a room and it will show here.
          </Typography>
        ) : (
          <Box component="ul" sx={{ ...listPanelSx, mt: 2 }}>
            {upcoming.map(
              (b: { id: number; start: string; end: string; room_name: string; client_name?: string }, i: number) => (
                <Box
                  component="li"
                  key={b.id}
                  sx={{
                    ...rowDividerSx,
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 1.75,
                    px: 2,
                    py: 1.75,
                  }}
                >
                  <Box
                    sx={{
                      width: 3,
                      alignSelf: "stretch",
                      bgcolor: i === 0 ? "secondary.main" : "divider",
                      borderRadius: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {fmtDay(b.start)}
                      <Box component="span" sx={{ fontVariantNumeric: "tabular-nums", color: "text.secondary", fontWeight: 400 }}>
                        {" · "}
                        {fmtTime(b.start)}–{fmtTime(b.end)}
                      </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                      {b.room_name}
                      {b.client_name ? ` with ${b.client_name}` : ""}
                    </Typography>
                  </Box>
                </Box>
              )
            )}
          </Box>
        )}

        <Button variant="text" sx={{ ...btnMotionSx, mt: 1.5, px: 1 }} onClick={() => go("bookings")}>
          See all bookings
        </Button>
      </Box>
    </Box>
  );
}
