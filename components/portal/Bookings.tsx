//@ts-nocheck
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { CANCEL_REFUND_HOURS, fmtDay, fmtTime, hrs, hourWord } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import ListPagination, { pageSlice } from "./ListPagination";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import { btnMotionSx, listPanelSx, rowDividerSx } from "./ui";
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

const BOOKINGS_PAGE_SIZE = 3;

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}

export default function Bookings({ version, bump, notify, go }: PortalShared) {
  const bookings = useApi(api.getBookings, [version]);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  if (!bookings) return <Loading />;

  const now = new Date();
  const upcoming = bookings.filter((b: Booking) => b.status === "confirmed" && new Date(b.end) > now);
  const past = bookings.filter((b: Booking) => !upcoming.includes(b)).reverse();

  const upcomingPaged = pageSlice(upcoming as Booking[], upcomingPage, BOOKINGS_PAGE_SIZE);
  const pastPaged = pageSlice(past as Booking[], pastPage, BOOKINGS_PAGE_SIZE);

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
      <Box component="li" sx={{ ...rowDividerSx, px: 2.25, py: 1.75 }}>
        <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5}>
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
              {!canCancel ? ` · ${b.status === "cancelled" ? "cancelled" : "completed"}` : ""}
            </Typography>
          </Box>
          {canCancel && confirmId !== b.id ? (
            <Button variant="outlined" size="small" onClick={() => setConfirmId(b.id)} sx={{ ...btnMotionSx, borderRadius: 0 }}>
              Cancel booking
            </Button>
          ) : null}
        </Stack>
        {canCancel && confirmId === b.id ? (
          <Box sx={{ mt: 1.5, bgcolor: "background.paper", p: 1.75 }}>
            <Typography variant="body2">
              {refundable
                ? `Cancel now and get ${hrs(b.minutes)} ${hourWord(b.minutes)} back.`
                : `This starts in less than ${CANCEL_REFUND_HOURS} hours, so the ${hourWord(b.minutes)} will not come back.`}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1.5 }}>
              <Button variant="contained" size="small" onClick={() => cancel(b)} sx={btnMotionSx}>
                Cancel booking
              </Button>
              <Button variant="outlined" size="small" onClick={() => setConfirmId(null)} sx={btnMotionSx}>
                Keep booking
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 720, width: "100%", minWidth: 0 }}>
      <PageTitle title="My bookings">
        Cancel at least {CANCEL_REFUND_HOURS} hours before the start to get the hours back.
      </PageTitle>

      <SectionLabel>Upcoming</SectionLabel>
      {upcoming.length === 0 ? (
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            No upcoming bookings.
          </Typography>
          <Button variant="contained" sx={{ ...btnMotionSx, mt: 1.5 }} onClick={() => go("book")}>
            Book a room
          </Button>
        </Box>
      ) : (
        <>
          <Box component="ul" sx={{ ...listPanelSx, mt: 1.5 }}>
            {upcomingPaged.items.map((b) => (
              <Row key={b.id} b={b} canCancel />
            ))}
          </Box>
          <ListPagination
            page={upcomingPaged.page}
            pageSize={BOOKINGS_PAGE_SIZE}
            total={upcoming.length}
            onChange={setUpcomingPage}
            label="bookings"
          />
        </>
      )}

      {past.length > 0 ? (
        <>
          <Box sx={{ mt: 4 }}>
            <SectionLabel>Past and cancelled</SectionLabel>
          </Box>
          <Box component="ul" sx={{ ...listPanelSx, mt: 1.5 }}>
            {pastPaged.items.map((b) => (
              <Row key={b.id} b={b} canCancel={false} />
            ))}
          </Box>
          <ListPagination
            page={pastPaged.page}
            pageSize={BOOKINGS_PAGE_SIZE}
            total={past.length}
            onChange={setPastPage}
            label="bookings"
          />
        </>
      ) : null}
    </Box>
  );
}
