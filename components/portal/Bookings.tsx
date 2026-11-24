import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { CANCEL_REFUND_HOURS, fmtDay, fmtTime, hrs, hourWord } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import type { PortalShared } from "./types";

type Booking = {
  id: number;
  start: string;
  end: string;
  status: string;
  room_name: string;
  client_name?: string | null;
  minutes: number;
};

export default function Bookings({ version, bump, notify, go }: PortalShared) {
  const bookings = useApi(api.getBookings, [version]);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  if (!bookings) return <Loading />;

  const now = new Date();
  const upcoming = bookings.filter((b: Booking) => b.status === "confirmed" && new Date(b.end) > now);
  const past = bookings.filter((b: Booking) => !upcoming.includes(b)).reverse();

  const cancel = (b: Booking) => {
    api.cancelBooking(b.id).then((res: { refunded_minutes?: number }) => {
      notify(
        res.refunded_minutes
          ? `Booking cancelled. ${hrs(res.refunded_minutes)} ${hourWord(res.refunded_minutes)} returned.`
          : "Booking cancelled. No hours returned."
      );
      setConfirmId(null);
      bump();
    });
  };

  const Row = ({ b, canCancel }: { b: Booking; canCancel: boolean }) => {
    const refundable = (new Date(b.start).getTime() - now.getTime()) / 3600000 >= CANCEL_REFUND_HOURS;
    return (
      <ListItem
        alignItems="flex-start"
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          py: 1.5,
          px: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          "&:last-child": { borderBottom: 0 },
        }}
      >
        <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {fmtDay(b.start)},{" "}
              <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {fmtTime(b.start)} to {fmtTime(b.end)}
              </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {b.room_name}
              {b.client_name ? ` with ${b.client_name}` : ""}
              {!canCancel ? `, ${b.status === "cancelled" ? "cancelled" : "completed"}` : ""}
            </Typography>
          </Box>
          {canCancel && confirmId !== b.id ? (
            <Button variant="outlined" size="small" onClick={() => setConfirmId(b.id)}>
              Cancel booking
            </Button>
          ) : null}
        </Stack>
        {canCancel && confirmId === b.id ? (
          <Box sx={{ mt: 1.5, bgcolor: "background.paper", borderRadius: 1, p: 1.5 }}>
            <Typography variant="body2">
              {refundable
                ? `Cancel now and get ${hrs(b.minutes)} ${hourWord(b.minutes)} back.`
                : `This starts in less than ${CANCEL_REFUND_HOURS} hours, so the ${hourWord(b.minutes)} will not come back.`}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1.5 }}>
              <Button variant="contained" size="small" onClick={() => cancel(b)}>
                Cancel booking
              </Button>
              <Button variant="outlined" size="small" onClick={() => setConfirmId(null)}>
                Keep booking
              </Button>
            </Stack>
          </Box>
        ) : null}
      </ListItem>
    );
  };

  const listSx = {
    mt: 1.5,
    bgcolor: "background.default",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    py: 0,
  };

  return (
    <Box sx={{ maxWidth: 720 }}>
      <PageTitle title="My bookings">
        Cancel at least {CANCEL_REFUND_HOURS} hours before the start to get the hours back.
      </PageTitle>

      <Typography variant="h3" component="h2" color="primary">
        Upcoming
      </Typography>
      {upcoming.length === 0 ? (
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            No upcoming bookings.
          </Typography>
          <Button variant="contained" sx={{ mt: 1.5 }} onClick={() => go("book")}>
            Book a room
          </Button>
        </Box>
      ) : (
        <List dense sx={listSx}>
          {upcoming.map((b: Booking) => (
            <Row key={b.id} b={b} canCancel />
          ))}
        </List>
      )}

      {past.length > 0 ? (
        <>
          <Typography variant="h3" component="h2" color="primary" sx={{ mt: 4 }}>
            Past and cancelled
          </Typography>
          <List dense sx={listSx}>
            {past.map((b: Booking) => (
              <Row key={b.id} b={b} canCancel={false} />
            ))}
          </List>
        </>
      ) : null}
    </Box>
  );
}
