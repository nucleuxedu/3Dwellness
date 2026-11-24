import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { TODAY, fmtDay, fmtTime } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import type { PortalShared } from "./types";

const FACILITIES = [
  { id: "sauna", label: "Sauna" },
  { id: "cold_plunge", label: "Cold plunge" },
  { id: "fitness", label: "Fitness room" },
  { id: "yoga", label: "Yoga room" },
];

export default function FrontDesk({ version, bump, notify }: PortalShared) {
  const data = useApi(api.getFrontDeskToday, [version]);
  const [clientId, setClientId] = useState("");
  const [facility, setFacility] = useState("sauna");
  const [error, setError] = useState<string | null>(null);
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
        bump();
      })
      .catch((e: { detail: string }) => setError(e.detail));
  };

  const facilityLabel = (fid: string) => FACILITIES.find((f) => f.id === fid)?.label ?? fid;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: { lg: "3fr 2fr" },
      }}
    >
      <Box>
        <PageTitle title="Front desk">Every room booking today, {fmtDay(TODAY)}.</PageTitle>
        <Box
          sx={{
            overflowX: "auto",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.default",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Practitioner</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.bookings.map(
                (b: {
                  id: number;
                  start: string;
                  end: string;
                  room_name: string;
                  practitioner_name: string;
                  client_name?: string | null;
                }) => (
                  <TableRow key={b.id}>
                    <TableCell sx={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                      {fmtTime(b.start)} to {fmtTime(b.end)}
                    </TableCell>
                    <TableCell>{b.room_name}</TableCell>
                    <TableCell>{b.practitioner_name}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{b.client_name || "Not named"}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Box>
        <Typography variant="h3" component="h2" color="primary">
          Check in a client
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.default",
            p: 2.5,
          }}
        >
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

          <Typography variant="body2" fontWeight={500} sx={{ mt: 2 }}>
            Facility
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={facility}
            onChange={(_, v) => v && setFacility(v)}
            sx={{
              mt: 1,
              flexWrap: "wrap",
              gap: 1,
              "& .MuiToggleButtonGroup-grouped": {
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px !important",
                ml: "0 !important",
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
            <Alert severity="error" sx={{ mt: 2 }} role="alert">
              {error}
            </Alert>
          ) : null}

          <Button variant="contained" sx={{ mt: 2.5 }} onClick={checkIn}>
            Check in
          </Button>
        </Box>

        <Typography variant="h3" component="h2" color="primary" sx={{ mt: 4 }}>
          Checked in today
        </Typography>
        {data.checkins.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            No one has checked in yet.
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
            {data.checkins.map((c: { id: number; client_name: string; facility: string; checked_in_at: string }) => (
              <ListItem
                key={c.id}
                sx={{
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: 0 },
                }}
              >
                <Typography variant="body2">
                  {c.client_name}, {facilityLabel(c.facility)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {new Date(c.checked_in_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
