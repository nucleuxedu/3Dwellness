// @ts-nocheck
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { TODAY, fmtDay, fmtTime } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import ListPagination, { pageSlice } from "./ListPagination";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import { btnMotionSx, listPanelSx, panelSx, rowDividerSx } from "./ui";
import type { PortalShared } from "./types";

const FACILITIES = [
  { id: "sauna", label: "Sauna" },
  { id: "cold_plunge", label: "Cold plunge" },
  { id: "fitness", label: "Fitness room" },
  { id: "yoga", label: "Yoga room" },
];

type DeskBooking = {
  id: number;
  start: string;
  end: string;
  room_name: string;
  practitioner_name: string;
  client_name?: string | null;
};

type CheckIn = {
  id: number;
  client_name: string;
  facility: string;
  checked_in_at: string;
};

const CHECKINS_PAGE_SIZE = 5;
const BOOKINGS_PAGE_SIZE = 5;

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

export default function FrontDesk({ version, bump, notify }: PortalShared) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const data = useApi(api.getFrontDeskToday, [version]);
  const [clientId, setClientId] = useState("");
  const [facility, setFacility] = useState("sauna");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  if (!data) return <Loading />;

  const checkIn = () => {
    if (!clientId) {
      setError("Choose a client to check in.");
      return;
    }
    setError(null);
    api
      .createCheckIn({ client: Number(clientId), facility })
      .then((c: { client_name: string }) => {
        notify(`${c.client_name} checked in.`);
        setClientId("");
        setPage(1);
        bump();
      })
      .catch((e: { detail: string }) => setError(e.detail));
  };

  const facilityLabel = (fid: string) => FACILITIES.find((f) => f.id === fid)?.label ?? fid;

  const checkinsPaged = pageSlice(data.checkins as CheckIn[], page, CHECKINS_PAGE_SIZE);
  const bookingsPaged = pageSlice(data.bookings as DeskBooking[], bookingPage, BOOKINGS_PAGE_SIZE);

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 4, lg: 6 },
        gridTemplateColumns: { lg: "1.35fr 0.9fr" },
        alignItems: "start",
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0, width: "100%" }}>
        <PageTitle title="Front desk">Every room booking today, {fmtDay(TODAY)}.</PageTitle>

        {data.bookings.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            No room bookings today.
          </Typography>
        ) : (
          <>
            {isMobile ? (
              <Box component="ul" sx={{ ...listPanelSx, width: "100%" }}>
                {bookingsPaged.items.map((b) => (
                  <Box component="li" key={b.id} sx={{ ...rowDividerSx, px: 2, py: 1.5 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontVariantNumeric: "tabular-nums" }}>
                      {fmtTime(b.start)}–{fmtTime(b.end)}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.35 }}>
                      {b.room_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                      {b.practitioner_name}
                      {" · "}
                      {b.client_name || "Not named"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ ...panelSx, overflowX: "auto", maxWidth: "100%" }}>
                <Table size="small" sx={{ minWidth: 560 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Practitioner</TableCell>
                      <TableCell>Client</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookingsPaged.items.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell sx={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                          {fmtTime(b.start)}–{fmtTime(b.end)}
                        </TableCell>
                        <TableCell>{b.room_name}</TableCell>
                        <TableCell>{b.practitioner_name}</TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>{b.client_name || "Not named"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
            <ListPagination
              page={bookingsPaged.page}
              pageSize={BOOKINGS_PAGE_SIZE}
              total={data.bookings.length}
              onChange={setBookingPage}
              label="bookings"
            />
          </>
        )}
      </Box>

      <Box sx={{ minWidth: 0, width: "100%" }}>
        <SectionLabel>Check in a client</SectionLabel>
        <Box sx={{ ...panelSx, mt: 1.5, p: { xs: 2, sm: 2.75 }, width: "100%", boxSizing: "border-box" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="desk-client-label">Client</InputLabel>
            <Select
              labelId="desk-client-label"
              id="desk-client"
              label="Client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <MenuItem value="">Choose a client</MenuItem>
              {data.clients.map((c: { id: number; name: string }) => (
                <MenuItem key={c.id} value={String(c.id)}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" fontWeight={500} sx={{ mt: 2.25 }}>
            Facility
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={facility}
            onChange={(_, v) => v && setFacility(v)}
            sx={{
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              width: "100%",
              "& .MuiToggleButtonGroup-grouped": {
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "0 !important",
                ml: "0 !important",
                flex: { xs: "1 1 calc(50% - 8px)", sm: "0 0 auto" },
                minHeight: 44,
              },
            }}
          >
            {FACILITIES.map((f) => (
              <ToggleButton key={f.id} value={f.id}>
                {f.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {error ? (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 0 }} role="alert">
              {error}
            </Alert>
          ) : null}

          <Button
            variant="contained"
            fullWidth
            sx={{ ...btnMotionSx, mt: 2.5, display: { xs: "flex", sm: "inline-flex" }, width: { xs: "100%", sm: "auto" } }}
            onClick={checkIn}
          >
            Check in
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <SectionLabel>Checked in today</SectionLabel>
        </Box>
        {data.checkins.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            No one has checked in yet.
          </Typography>
        ) : (
          <>
            <Box component="ul" sx={{ ...listPanelSx, mt: 1.5, width: "100%" }}>
              {checkinsPaged.items.map((c) => (
                <Box
                  component="li"
                  key={c.id}
                  sx={{
                    ...rowDividerSx,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1.5,
                    py: 1.25,
                    px: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ minWidth: 0, wordBreak: "break-word" }}>
                    {c.client_name} · {facilityLabel(c.facility)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontVariantNumeric: "tabular-nums", flex: "none" }}
                  >
                    {new Date(c.checked_in_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                  </Typography>
                </Box>
              ))}
            </Box>
            <ListPagination
              page={checkinsPaged.page}
              pageSize={CHECKINS_PAGE_SIZE}
              total={data.checkins.length}
              onChange={setPage}
              label="check-ins"
            />
          </>
        )}
      </Box>
    </Box>
  );
}
