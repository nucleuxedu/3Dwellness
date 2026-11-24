import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { api } from "@/lib/portal/api";
import {
  OPEN_HOUR,
  CLOSE_HOUR,
  MAX_BOOKING_HOURS,
  DAYS_SHOWN,
  TODAY,
  addDays,
  at,
  dayKey,
  fmtDay,
  fmtHour,
  hrs,
  hourWord,
} from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import HourBlocks from "./HourBlocks";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import type { PortalShared } from "./types";

type Sel = { room: number; hour: number; dur: number };

export default function BookRoom({ version, bump, notify, go }: PortalShared) {
  const [date, setDate] = useState(TODAY);
  const [sel, setSel] = useState<Sel | null>(null);
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const key = dayKey(date);
  const rooms = useApi(api.getRooms, []);
  const availability = useApi(() => api.getAvailability(key), [key, version]);
  const balance = useApi(api.getBalance, [version]);
  const clients = useApi(api.getClients, [version]);
  if (!rooms || !availability || !balance || !clients) return <Loading />;

  const hours = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);
  const now = new Date();

  const slotState = (roomId: number, hour: number) => {
    const slot = at(date, hour);
    const row = availability.find((a: { room: number }) => a.room === roomId);
    const hit =
      row &&
      row.busy.find((b: { start: string; end: string }) => new Date(b.start) <= slot && slot < new Date(b.end));
    if (hit) return hit.mine ? "mine" : "taken";
    if (slot < now) return "past";
    return "free";
  };

  const maxHours = (roomId: number, hour: number) => {
    let n = 0;
    while (n < MAX_BOOKING_HOURS && hour + n < CLOSE_HOUR && slotState(roomId, hour + n) === "free") n++;
    return n;
  };

  const pick = (roomId: number, hour: number) => {
    setError(null);
    setSel({ room: roomId, hour, dur: 1 });
  };

  const changeDate = (d: Date) => {
    setDate(d);
    setSel(null);
    setError(null);
  };

  const cost = sel ? sel.dur * 60 : 0;
  const short = Boolean(sel && cost > balance.balance_minutes);
  const selRoom = sel && rooms.find((r: { id: number }) => r.id === sel.room);

  const book = () => {
    if (!sel) return;
    setSaving(true);
    setError(null);
    api
      .createBooking({
        room: sel.room,
        start: at(date, sel.hour).toISOString(),
        end: at(date, sel.hour + sel.dur).toISOString(),
        client: clientId ? Number(clientId) : null,
      })
      .then(() => {
        notify(`Room booked. ${hrs(balance.balance_minutes - cost)} hours left.`);
        setSel(null);
        setClientId("");
        bump();
      })
      .catch((e: { detail: string }) => {
        setError(e.detail);
        bump();
      })
      .finally(() => setSaving(false));
  };

  const cellBg = (state: string, chosen: boolean) => {
    if (chosen) return "warning.main";
    if (state === "mine") return "primary.main";
    if (state === "taken") return "action.disabledBackground";
    if (state === "past") return "action.hover";
    return "background.default";
  };

  return (
    <Box>
      <PageTitle title="Book a room">
        Pick a day, then a free slot. Each hour booked uses one hour from your plan.
      </PageTitle>

      <Stack direction="row" gap={1} sx={{ overflowX: "auto", pb: 1 }} role="group" aria-label="Choose a day">
        {Array.from({ length: DAYS_SHOWN }, (_, i) => addDays(TODAY, i)).map((d) => {
          const on = dayKey(d) === key;
          return (
            <Button
              key={dayKey(d)}
              onClick={() => changeDate(d)}
              aria-pressed={on}
              variant={on ? "contained" : "outlined"}
              sx={{
                flex: "none",
                minWidth: 56,
                flexDirection: "column",
                py: 1,
                px: 1.5,
                lineHeight: 1.2,
              }}
            >
              <Typography component="span" variant="caption" sx={{ opacity: on ? 0.85 : 1 }}>
                {d.toLocaleDateString(undefined, { weekday: "short" })}
              </Typography>
              <Typography component="span" fontWeight={600} sx={{ fontVariantNumeric: "tabular-nums" }}>
                {d.getDate()}
              </Typography>
            </Button>
          );
        })}
      </Stack>

      <Box
        sx={{
          mt: 2,
          overflowX: "auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.default",
          p: 1.5,
        }}
      >
        <Box
          sx={{
            display: "grid",
            minWidth: "max-content",
            alignItems: "center",
            gap: 0.5,
            gridTemplateColumns: `10rem repeat(${hours.length}, 3.25rem)`,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {fmtDay(date)}
          </Typography>
          {hours.map((h) => (
            <Typography key={h} variant="caption" color="text.secondary" textAlign="center" sx={{ fontVariantNumeric: "tabular-nums" }}>
              {fmtHour(h)}
            </Typography>
          ))}
          {rooms.map((room: { id: number; name: string }) => (
            <Fragment key={room.id}>
              <Typography variant="body2" fontWeight={500} sx={{ pr: 1 }}>
                {room.name}
              </Typography>
              {hours.map((h) => {
                const state = slotState(room.id, h);
                const chosen = Boolean(sel && sel.room === room.id && h >= sel.hour && h < sel.hour + sel.dur);
                const label = `${room.name}, ${fmtHour(h)}, ${
                  state === "free" ? "free" : state === "mine" ? "your booking" : state === "taken" ? "taken" : "past"
                }`;
                const sx = {
                  height: 36,
                  borderRadius: 1,
                  border: state === "free" ? "1px solid" : "none",
                  borderColor: "divider",
                  bgcolor: cellBg(state, chosen),
                  p: 0,
                  minWidth: 0,
                  "&:hover": state === "free" ? { bgcolor: chosen ? "warning.main" : "secondary.light" } : undefined,
                };
                return state === "free" ? (
                  <Button
                    key={h}
                    aria-label={label}
                    aria-pressed={chosen}
                    onClick={() => pick(room.id, h)}
                    sx={sx}
                  />
                ) : (
                  <Box key={h} role="img" aria-label={label} sx={sx} />
                );
              })}
            </Fragment>
          ))}
        </Box>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={{ xs: 1, sm: 2.5 }} sx={{ mt: 1.5 }}>
        {[
          { label: "Free", bgcolor: "background.default", border: "1px solid", borderColor: "divider" },
          { label: "Your booking", bgcolor: "primary.main" },
          { label: "Taken", bgcolor: "action.disabledBackground" },
          { label: "Your selection", bgcolor: "warning.main" },
        ].map((item) => (
          <Stack key={item.label} direction="row" alignItems="center" gap={1}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, ...item }} />
            <Typography variant="caption" color="text.secondary">
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {!sel ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Select a free slot to set the length and confirm.
        </Typography>
      ) : (
        <Box
          component="section"
          aria-live="polite"
          sx={{
            mt: 3,
            maxWidth: 560,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.default",
            p: 2.5,
          }}
        >
          <Typography variant="h3" component="h2" color="primary">
            {selRoom.name}, {fmtDay(date)}, {fmtHour(sel.hour)} to {fmtHour(sel.hour + sel.dur)}
          </Typography>

          <Typography variant="body2" fontWeight={500} sx={{ mt: 2 }}>
            Length
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={sel.dur}
            onChange={(_, n) => n != null && setSel({ ...sel, dur: n })}
            sx={{ mt: 1, flexWrap: "wrap", gap: 1, "& .MuiToggleButtonGroup-grouped": { border: "1px solid", borderColor: "divider", borderRadius: "8px !important", ml: "0 !important" } }}
          >
            {Array.from({ length: maxHours(sel.room, sel.hour) }, (_, i) => i + 1).map((n) => (
              <ToggleButton key={n} value={n}>
                {n} {n === 1 ? "hour" : "hours"}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel id="book-client-label">Client (optional)</InputLabel>
            <Select
              labelId="book-client-label"
              id="book-client"
              label="Client (optional)"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <MenuItem value="">No client selected</MenuItem>
              {clients.map((c: { id: number; name: string }) => (
                <MenuItem key={c.id} value={String(c.id)}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2.5 }}>
            <HourBlocks granted={balance.granted_minutes} used={balance.used_minutes} pending={short ? 0 : cost} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {short
                ? `This needs ${hrs(cost)} ${hourWord(cost)} and you have ${hrs(balance.balance_minutes)} left. Pick a shorter time or change your plan.`
                : `Uses ${hrs(cost)} ${hourWord(cost)}. ${hrs(balance.balance_minutes - cost)} left after this.`}
            </Typography>
          </Box>

          {error ? (
            <Alert severity="error" sx={{ mt: 1.5 }} role="alert">
              {error}
            </Alert>
          ) : null}

          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 2.5 }}>
            {short ? (
              <Button variant="contained" onClick={() => go("plan")}>
                See plans
              </Button>
            ) : (
              <Button variant="contained" disabled={saving} onClick={book}>
                Book room
              </Button>
            )}
            <Button variant="outlined" onClick={() => setSel(null)}>
              Clear selection
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
