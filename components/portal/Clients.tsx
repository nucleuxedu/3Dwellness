import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { fmtDate } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
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
        gap: 4,
        gridTemplateColumns: { lg: "3fr 2fr" },
      }}
    >
      <Box>
        <PageTitle title="Clients">
          A client needs a signed waiver before using the sauna, cold plunge, or fitness room.
        </PageTitle>
        <List
          dense
          sx={{
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            py: 0,
          }}
        >
          {clients.map((c: Client) => (
            <ListItem
              key={c.id}
              sx={{
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 1,
                py: 1.5,
                px: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": { borderBottom: 0 },
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.email}
                  {c.phone ? `, ${c.phone}` : ""}
                </Typography>
              </Box>
              {c.waiver_signed_at ? (
                <Chip
                  size="small"
                  label={`Waiver signed ${fmtDate(c.waiver_signed_at)}`}
                  sx={{ bgcolor: "secondary.main", color: "secondary.contrastText" }}
                />
              ) : (
                <Chip size="small" color="warning" label="Waiver needed" />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h3" component="h2" color="primary">
          Add a client
        </Typography>
        <Stack
          gap={2}
          sx={{
            mt: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.default",
            p: 2.5,
          }}
        >
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
            <Alert severity="error" role="alert">
              {error}
            </Alert>
          ) : null}
          <Button variant="contained" onClick={save} sx={{ alignSelf: "flex-start" }}>
            Add client
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
