import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { fmtDate } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import { btnMotionSx, listPanelSx, panelSx, rowDividerSx } from "./ui";
import type { PortalShared } from "./types";

type Client = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  waiver_signed_at?: string | null;
};

export default function Clients({ version, bump, notify }: PortalShared) {
  const clients = useApi(api.getClients, [version]);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState<string | null>(null);
  if (!clients) return <Loading />;

  const save = () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      setError("Enter a name and an email address to add a client.");
      return;
    }
    api.createClient(draft).then((c: Client) => {
      notify(`${c.name} added.`);
      setDraft({ name: "", email: "", phone: "" });
      setError(null);
      bump();
    });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 4, lg: 6 },
        gridTemplateColumns: { lg: "1.3fr 0.9fr" },
        alignItems: "start",
      }}
    >
      <Box>
        <PageTitle title="Clients">
          A client needs a signed waiver before using the sauna, cold plunge, or fitness room.
        </PageTitle>
        <Box component="ul" sx={listPanelSx}>
          {clients.map((c: Client) => (
            <Box
              component="li"
              key={c.id}
              sx={{
                ...rowDividerSx,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.25,
                py: 1.75,
                px: 2.25,
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.email}
                  {c.phone ? ` · ${c.phone}` : ""}
                </Typography>
              </Box>
              {c.waiver_signed_at ? (
                <Chip
                  size="small"
                  label={`Waiver signed ${fmtDate(c.waiver_signed_at)}`}
                  sx={{ borderRadius: 0, bgcolor: "secondary.main", color: "secondary.contrastText" }}
                />
              ) : (
                <Chip size="small" color="warning" label="Waiver needed" sx={{ borderRadius: 0 }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
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
          Add a client
        </Typography>
        <Stack gap={2} sx={{ ...panelSx, mt: 1.5, p: 2.75 }}>
          <TextField
            id="client-name"
            label="Full name"
            size="small"
            fullWidth
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <TextField
            id="client-email"
            label="Email"
            type="email"
            size="small"
            fullWidth
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
          />
          <TextField
            id="client-phone"
            label="Phone (optional)"
            type="tel"
            size="small"
            fullWidth
            value={draft.phone}
            onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
          />
          {error ? (
            <Alert severity="error" role="alert" sx={{ borderRadius: 0 }}>
              {error}
            </Alert>
          ) : null}
          <Button variant="contained" onClick={save} sx={{ ...btnMotionSx, alignSelf: "flex-start" }}>
            Add client
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
